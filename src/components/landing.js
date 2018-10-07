import React from 'react';
import {Flex, Box} from '@rebass/grid'
import {colors} from "../shared/theme";
import Heading from "./heading";
import Text from "./text";
import BasketCard from "./basketCard";

export default class Landing extends React.Component {
  componentDidMount(){
    this.props.onMount();
  }

  render(){
    const {prices, baskets} = this.props;

    return (
      <React.Fragment>
        <FullFlex width={1} flexDirection={'column'}>
          <ColorBlock width={1} p={2}>
            <Flex>
              <Box pt={[4,5]} mx={'auto'} css={{textAlign: 'center'}}>
                <Heading>Buy and Sell Digital Subjects</Heading>
                <Text>Primotif allows you to buy shares in (or short) anything </Text>
              </Box>
            </Flex>
          </ColorBlock>
          <Box px={3} css={{backgroundColor: colors.bg}}>
            <Flex mx={'auto'} css={{maxWidth: '1024px'}} flexWrap={'wrap'} mt={[0, -5]}>
              {Object.keys(baskets).map((b) => (
                <BasketCard key={b} prices={prices[baskets[b].symbol]} basket={baskets[b]} onClick={this.props.onBasketClick(b)}/>
              ))}
            </Flex>
          </Box>
        </FullFlex>
      </React.Fragment>
    )
  }
}

const FullFlex = Flex.extend`
  height: 100vh;
  width: 100%;
`;

const ColorBlock = Box.extend`
  height: 45%;
  color: white;
  background: linear-gradient(180deg, #a73737 0%, rgba(255, 255, 255, 0) 100%), #7a2828;
`;
