import React from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import Subheading from "./subheading";
import {SYMBOL_DESCRIPTION_MAP} from "../shared/constants";
import {colors} from "../shared/theme";
import Text from "./text";
import Link from './link';
import {BuyButton} from "./button";
import Sparklines from "./sparklines";

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
      <React.Fragment>
        {loading.baskets ? (
          <FullScreenLoading>
            <h3>Loading...</h3>
          </FullScreenLoading>
        ) : (
          <FullFlex w={1} flexDirection={'column'} css={{position: 'relative'}} flexWrap={'wrap'}>
            <Box pt={[3,4]} mx={'auto'}>
              <Subheading>{basket.name}</Subheading>
            </Box>
            <Box w={1} flex={1} css={{
              marginLeft: 'auto',
              marginRight: 'auto',
              height: '30%',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              top: '2.5em',
              left: 0,
              right: 0,
              maxWidth: '1024px'
            }}>
              <Sparklines showAxis={true} data={prices} id={basket.symbol} onOffsetReceived={({height}) => this.setState({graphOffset: height})}/>
            </Box>

            <Box mx={[2, 'auto']}
                 mt={this.state.graphOffset}
                 mb={2}
              css={{
                maxWidth: '1024px',
                border: `2px solid ${colors.cardBorder}`,
                borderRadius: '4px'
              }}
              bg={colors.cardBG}
              p={3}
            >
              <Box css={{textAlign: 'center'}} mb={2}>
                <Text fontSize={'18px'}>{SYMBOL_DESCRIPTION_MAP[basket.symbol]}</Text>
              </Box>
              <BuyButton>Buy Now</BuyButton>
              <Box css={{textAlign: 'right'}} mt={2}>
                <Text>Or, <Link href={'#'} onClick={this.handleBackButtonClick.bind(this)}>Go Back</Link></Text>
              </Box>
            </Box>
          </FullFlex>
        )}
      </React.Fragment>
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
`;
