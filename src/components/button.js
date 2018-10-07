import styled from 'styled-components';
import {colors} from "../shared/theme";

export const BaseButton = styled.button`
  font-weight: bold;
  font-size: 12px;
  padding: 12px 16px;
  border: none;
  border-radius: 2px;
  
  color: black;
  background-color: white;
  border: 1px solid black;
`;

export const BuyButton = styled(BaseButton)`
  background: linear-gradient(${colors.blue1}, ${colors.blue2});
  color: white;
  width: auto;
  line-height: 1.4em;
  padding: 20px 30px;
  border-radius: 3px;
  backround-position: 0 0;
  transition: box-shadow .15s ease, background .15s ease;
  
  &:hover {
    box-shadow: 0 4.5px 20px rgba(0,0,0,.15);
    cursor: pointer;
    background: linear-gradient(${colors.blue2}, ${colors.blue2});
  }
  
  &:focus {
    outline: none;
  }
  
  &:active {
    background: linear-gradient(${colors.blue2}, ${colors.blue1});
  }
`;

export const SellButton = styled(BuyButton)`
  background: linear-gradient(${colors.green1}, ${colors.green2});
  
  &:hover {
    background: linear-gradient(${colors.green2}, ${colors.green2});
  }
  
  &:active {
    background: linear-gradient(${colors.green2}, ${colors.green1});
  }
`;

export const DefaultButton = styled(BuyButton)`
  background: linear-gradient(${colors.brand1}, ${colors.brand2});
  
  &:hover {
    background: linear-gradient(${colors.brand2}, ${colors.brand2});
  }
  
  &:active {
    background: linear-gradient(${colors.brand2}, ${colors.brand1});
  }
`;
