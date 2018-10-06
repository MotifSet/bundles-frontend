import React from 'react';
import {Flex, Box} from "@rebass/grid";

import { colors } from '../shared/theme';
import Sparklines from "./sparklines";

export default class BasketCard extends React.Component {
  render(){
    const {prices, basket} = this.props;

    return (
      <CardContainer  width={[1, 1/3]} my={1}>
        <Card p={1} m={[2]} w={1}>
          <Flex flexWrap={'wrap'}  css={{height: '100%', position: 'relative'}} w={1} >
            <Box>
              Hello!
            </Box>
            <Box w={1} flex={1} css={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              top: '2em',
              left: 0,
              right: 0
            }}>
              <Sparklines data={this.props.prices} colors={basket.colors} id={basket.id}/>
            </Box>
          </Flex>
        </Card>
      </CardContainer>
    )
  }
}

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
  height: 10em;
`;
