import {injectGlobal} from 'styled-components';

export const colors = {
  white: '#ffffff',
  grey: '#e5e5e5',
  bg: '#070f15',
  text: '#333333',
  primary: '#E8FDF5',
  brand1: '#0c1b30',
  brand2: '#081e39',
  cardBG: '#131d27',
  cardBorder: '#222931',
  lightGreen: '#2eae35',
  darkGreen: '#124210',
  lightRed: 'rgb(223, 72, 87)',
  darkRed: 'rgb(219, 50, 67)',
  blue1: '#227ef7',
  blue2: '#226EF7'
};

export function theme(){
  injectGlobal`
  body {
    font-family: 'Rubik', -apple-system,system-ui, sans-serif;
    background-color: ${colors.bg};
    color: ${colors.white};
  }
  `;
}
