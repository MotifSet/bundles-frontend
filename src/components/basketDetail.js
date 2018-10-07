import React from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import Subheading from "./subheading";
import {SYMBOL_DESCRIPTION_MAP} from "../shared/constants";
import {colors} from "../shared/theme";
import Text from "./text";
import Link from './link';
import {BuyButton, DefaultButton, SellButton} from "./button";
import {Delta, DeltaPill} from "./delta";
import Sparklines from "./sparklines";
import Heading from "./heading";

export default class BasketDetail extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      graphOffset: '10em' // until we know the true offset, let's guess
    }
  }

  componentDidMount(){
    this.props.onMount();
  }

  handleBackButtonClick(){
    this.props.onBack();
  }

  render(){
    const {basket, loading, prices} = this.props;

    let monthly_percent_change;
    if(prices){
      monthly_percent_change = (prices[prices.length-1].price - prices[0].price)/prices[0].price;
      monthly_percent_change = monthly_percent_change.toFixed(2);
    }

    return (
      <Container>
        {loading.baskets ? (
          <FullScreenLoading>
            <h3>Loading...</h3>
          </FullScreenLoading>
        ) : (
          <FullFlex w={1} mx={'auto'} flexWrap={'wrap'} p={1}>
            <Box width={[1, 1/2]} p={1}>
              <Card width={1} p={2} css={{textAlign: 'center'}} mt={3}>
                <Subheading fontSize={'18px'} secondary>{basket.symbol}</Subheading>
                <Heading>{basket.name}</Heading>
                <Text>{SYMBOL_DESCRIPTION_MAP[basket.symbol]}</Text>
                <Box width={1} mt={3}>
                  <BuyButton>Buy Now</BuyButton>
                  <DefaultButton onClick={this.handleBackButtonClick.bind(this)}>Back to Listings</DefaultButton>
                </Box>
              </Card>
            </Box>
            <Box width={[1, 1/2]} p={1}>
              <Card width={1} p={2} mt={3}>
                Check
              </Card>
            </Box>
            <Box width={1} p={1}>
              <Card width={1} p={2}>
                <Flex flexWrap={'wrap'}>
                  <Box width={1/6}>
                    <Text fontSize={'24px'} fontWeight={'bold'}>${basket.price.toFixed(2)}</Text>
                  </Box>
                  <Box ml={'auto'}>
                    <Delta pl={'1em'} value={monthly_percent_change}>
                      <span style={{marginTop: '0.4em'}}>30d</span>
                      <DeltaPill value={monthly_percent_change} p={2}>% {monthly_percent_change}</DeltaPill>
                    </Delta>
                  </Box>
                  <Box width={1} css={{height: '30vh'}}>
                    <Sparklines showAxis={true} data={prices} id={basket.symbol} onOffsetReceived={({height}) => this.setState({graphOffset: height})}/>
                  </Box>
                </Flex>
              </Card>
            </Box>
          </FullFlex>
        )}
      </Container>
    )
  }
}

const FullScreenLoading = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FullFlex = Flex.extend`
  width: 100%;
  max-width: 1024px;
  position: relative;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: linear-gradient(${colors.brand1}, ${colors.brand2});
`;

const Card = Box.extend`
  background-color: ${colors.cardBG};
  border: 2px solid ${colors.cardBorder};
  border-radius: 4px;
 
`;
