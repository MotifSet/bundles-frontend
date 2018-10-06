import React from 'react';
import {Flex, Box} from '@rebass/grid'

export default class Landing extends React.Component {
  render(){
    return (
      <Flex>
        <Box width={1/2} p={2}>
          Hello
        </Box>
      </Flex>
    )
  }
}
