import React from 'react';
import styled from 'styled-components';
import {Box} from "@rebass/grid";

import { colors } from '../shared/theme';

export default class BasketCard extends React.Component {
  render(){
    return (
      <CardContainer  width={[1, 1/3]} my={1}>
        <Card p={1} m={[2]}>
          Hello!
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
