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
      <CardContainer  width={[1, 1/3]} my={1}>
        <Card p={2} m={[2]} w={1}>
          <Flex flexWrap={'wrap'}  css={{height: '100%', position: 'relative'}} w={1} >
            <Box w={1/2} mt={'0.25em'} ml={'0.25em'}>
              <Subheading>{basket.name}</Subheading>
            </Box>
            <Box w={1} flex={1} css={{
              height: '6.5em',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              top: '3em',
              left: 0,
              right: 0
            }}>
              <Sparklines data={this.props.prices} colors={basket.colors} id={basket.id}/>
            </Box>
            <Box mt={'8em'} w={1} p={2} css={{textAlign: 'center'}} mb={3}>
              {basket.description}
            </Box>
            <Box w={1/5} ml={'auto'} mt={2} css={{
              position: 'absolute',
              bottom: '0.5em',
              right: '0.25em'
            }}>
              <Delta value={basket.weekly_percent_change}>% {basket.weekly_percent_change}</Delta>
            </Box>
          </Flex>
        </Card>
      </CardContainer>
    )
  }
}

const Delta = styled(Text)`
  color: white
  padding: 0.5em;
  border-radius: 3px;
  background-color: ${props => props.value >= 0 ? 'green' : 'red'}
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
