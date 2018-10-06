import {injectGlobal} from 'styled-components';

export const colors = {
  white: '#ffffff',
  grey: '#e5e5e5',
  bg: '#FEFEFE',
  text: '#333333',
  primary: '#E8FDF5'
};

export function theme(){
  injectGlobal`
  body {
    font-family: 'Rubik', -apple-system,system-ui, sans-serif;
    background-color: ${colors.bg};
    color: ${colors.text};
  }
  `;
}
