import styled from 'styled-components';
import {colors} from "../shared/theme";

const Link = styled.a`
  text-decoration: underline dotted;
  color: ${colors.blue1};
  
  &:active, &:hover, &:visited {
    color: ${colors.blue1};
    outline: none;
  }
`;

export default Link;
