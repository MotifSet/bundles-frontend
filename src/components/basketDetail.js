import React from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import Subheading from "./subheading";
import {SYMBOL_DESCRIPTION_MAP} from "../shared/constants";
import {colors} from "../shared/theme";
import Text from "./text";
import Link from './link';
import {BuyButton} from "./button";

export default class BasketDetail extends React.Component{
  componentDidMount(){
    this.props.onMount();
  }

  handleBackButtonClick(){
    this.props.onBack();
  }

  render(){
    const {basket, loading} = this.props;

    return (
      <React.Fragment>
        {loading.baskets ? (
          <FullScreenLoading>
            <h3>Loading...</h3>
          </FullScreenLoading>
        ) : (
          <FullFlex width={1} flexDirection={'column'}>
            <Box pt={[3,4]} mx={'auto'}>
              <Subheading>{basket.name}</Subheading>
            </Box>
            <Box>
              price chart
            </Box>

            <Box mx={[2, 'auto']}
                 my={2}
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
