import React from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import Subheading from "./subheading";
import {SYMBOL_DESCRIPTION_MAP} from "../shared/constants";
import {colors} from "../shared/theme";
import Text from "./text";
import Link from './link';
import {BuyButton, DefaultButton, SellButton} from "./button";
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

    return (
      <Container>
        {loading.baskets ? (
          <FullScreenLoading>
            <h3>Loading...</h3>
          </FullScreenLoading>
        ) : (
          <FullFlex w={1} flexDirection={'column'} mx={'auto'} flexWrap={'wrap'} p={1}>
            <Card width={[1, 1/2]} m={1} p={2} css={{textAlign: 'center'}} mt={3}>
              <Subheading fontSize={'18px'} secondary>{basket.symbol}</Subheading>
              <Heading>{basket.name}</Heading>
              <Text>{SYMBOL_DESCRIPTION_MAP[basket.symbol]}</Text>
              <Box width={1} mt={3}>
                <BuyButton>Buy Now</BuyButton>
                <DefaultButton>Back to Listings</DefaultButton>
              </Box>
            </Card>
            <Card width={[1, 1/2]} m={1} p={2} mt={3}>
              
            </Card>
            {/*<Box w={1} flex={1} css={{*/}
              {/*marginLeft: 'auto',*/}
              {/*marginRight: 'auto',*/}
              {/*height: '30%',*/}
              {/*width: '100%',*/}
              {/*position: 'absolute',*/}
              {/*bottom: 0,*/}
              {/*top: '2.5em',*/}
              {/*left: 0,*/}
              {/*right: 0,*/}
              {/*maxWidth: '1024px'*/}
            {/*}}>*/}
              {/*<Sparklines showAxis={true} data={prices} id={basket.symbol} onOffsetReceived={({height}) => this.setState({graphOffset: height})}/>*/}
            {/*</Box>*/}
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
  height: 100vh;
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
