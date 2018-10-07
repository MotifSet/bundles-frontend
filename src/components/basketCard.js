import React from 'react';
import {Flex, Box} from "@rebass/grid";

import { colors } from '../shared/theme';
import Sparklines from "./sparklines";
import Subheading from "./subheading";
import styled from "styled-components";
import Text from "./text";

export default class BasketCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      graphOffset: '10em'
    };
  }

  handleClick(){
    this.props.onClick()
  }

  render(){
    const {basket, prices} = this.props;

    let monthly_percent_change;
    if(prices){
      monthly_percent_change = (prices[prices.length-1].price - prices[0].price)/prices[0].price;
      monthly_percent_change = monthly_percent_change.toFixed(2);
    }

    return (
      <CardContainer  width={[1, 1/3]} my={1} mt={[3, 0]}>
        <Card p={2} m={[2]} w={1} onClick={this.handleClick.bind(this)}>
          <Flex flexWrap={'wrap'}  css={{height: '100%', position: 'relative'}} w={1} >
            <Box w={1/2} mt={'0.25em'} ml={'0.25em'} px={'auto'}>
              <Subheading>{basket.name}</Subheading>
            </Box>
            <Box w={1} flex={1} css={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              top: '2.5em',
              left: 0,
              right: 0
            }}>
              <Sparklines data={prices} id={basket.symbol} onOffsetReceived={({height}) => this.setState({graphOffset: height})}/>
            </Box>
            <Box width={1} css={{textAlign: 'center'}} mt={this.state.graphOffset}>
              {basket.description}
            </Box>
            <Box w={1/6} my={'auto'}>
              <Text fontSize={'24px'} fontWeight={'bold'}>${basket.price.toFixed(2)}</Text>
            </Box>
            <Box w={1/6} ml={'auto'}>
              <Delta pl={'1em'} value={basket.weekly_percent_change}>
                <span style={{marginTop: '0.4em'}}>30d</span>
                <DeltaPill value={monthly_percent_change} p={2}>% {monthly_percent_change}</DeltaPill>
              </Delta>
            </Box>
          </Flex>
        </Card>
      </CardContainer>
    )
  }
}

const Delta = styled(Flex)`
  border-radius: 4px;
  justify-content: center;
  color: white;
  background-color: ${props => props.value > 0 ? `${colors.darkGreen}` : `${colors.darkRed}`};
`;

const DeltaPill = styled(Box)`
  background-color: ${props => props.value > 0 ? `${colors.lightGreen}` : `${colors.lightRed}`};
  margin-left: 1em; 
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  border-radius: 2px;
`;

const Card = Box.extend`
  height: 100%;
  background-color: ${colors.cardBG};
  border: 1px solid ${colors.cardBorder};
  border-radius: 4px;
  z-index: 2;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  
  transition: box-shadow .15s ease, transform.1s ease;
  
  &:hover {
    box-shadow: 0 4.5px 20px rgba(0,0,0,.15);
    transform: translate3d(0,-1.5px,0);
    cursor: pointer;
  }
`;

const CardContainer = Box.extend`
  height: auto;
`;
