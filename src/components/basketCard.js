import React from 'react';
import {Flex, Box} from "@rebass/grid";

import { colors } from '../shared/theme';
import Sparklines from "./sparklines";
import Subheading from "./subheading";
import Text from './text';
import styled from "styled-components";

export default class BasketCard extends React.Component {
  render(){
    const {prices, basket} = this.props;

    return (
      <CardContainer  width={[1, 1/3]} my={1} mt={[3, 0]}>
        <Card p={2} m={[2]} w={1}>
          <Flex flexWrap={'wrap'}  css={{height: '100%', position: 'relative'}} w={1} >
            <Box w={1/2} mt={'0.25em'} ml={'0.25em'} px={'auto'}>
              <Subheading>{basket.name}</Subheading>
            </Box>
            <Box w={1} flex={1} css={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              top: '3em',
              left: 0,
              right: 0
            }}>
              <Sparklines data={this.props.prices} colors={basket.colors} id={basket.id}/>
            </Box>
            <Box width={1} css={{textAlign: 'center'}} mt={'10.5em'}>
              {basket.description}
            </Box>
            <Box w={1/6} ml={'auto'}>
              <Delta pl={'1em'} value={basket.weekly_percent_change}>
                <span style={{marginTop: '0.4em'}}>1m</span>
                <DeltaPill value={basket.weekly_percent_change} p={2}>% {basket.weekly_percent_change}</DeltaPill>
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
  background-color: ${props => props.value > 0 ? 'rgb(38, 156, 85)' : 'rgb(219, 50, 67)'};
`;

const DeltaPill = styled(Box)`
  background-color: ${props => props.value > 0 ? 'rgb(43, 177, 96)' : 'rgb(223, 72, 87)'};
  margin-left: 1em;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  border-radius: 2px;
`;

const Card = Box.extend`
  height: 100%;
  background-color: ${colors.white};
  z-index: 2;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  
  transition: box-shadow .15s ease, transform.1s ease;
  
  &:hover {
    box-shadow: 0 4.5px 20px rgba(0,0,0,.15);
    transform: translate3d(0,-1.5px,0);
  }
`;

const CardContainer = Box.extend`
  height: auto;
`;
