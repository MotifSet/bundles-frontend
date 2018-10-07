import styled from 'styled-components';
import {colors} from "../shared/theme";

const Subheading = styled.h2`
  font-weight: bold;
  font-size: 1.5em;
  margin: 0;
  ${props => props.secondary ? `color: ${colors.grey};`: ''}
`;

export default Subheading;
