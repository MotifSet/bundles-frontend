import {Box, Flex} from "@rebass/grid";
import {colors} from "../shared/theme";
import styled from "styled-components";

export const Delta = styled(Flex)`
  border-radius: 4px;
  justify-content: center;
  color: white;
  background-color: ${props => props.value >= 0 ? `${colors.darkGreen}` : `${colors.darkRed}`};
`;

export const DeltaPill = styled(Box)`
  background-color: ${props => props.value >= 0 ? `${colors.lightGreen}` : `${colors.lightRed}`};
  margin-left: 1em; 
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  border-radius: 2px;
`;
