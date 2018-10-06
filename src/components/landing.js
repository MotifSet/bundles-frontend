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
                <Heading>Buy and sell predictions</Heading>
                <Text>Auguries introduce the ability to trade baskets of Augur predictions</Text>
              </Box>
            </Flex>
          </ColorBlock>
          <Box px={3} mt={[0, -5]}>
            <Flex mx={'auto'} css={{maxWidth: '1024px'}} flexWrap={'wrap'}>
              {baskets.map((b) => (
                <BasketCard key={b.id} prices={prices[b.id]} basket={b}/>
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
  height: 40%;
  background-color: ${colors.primary};
`;
