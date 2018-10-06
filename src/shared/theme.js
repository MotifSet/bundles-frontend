import {injectGlobal} from 'styled-components';

export function theme(){
  injectGlobal`
  body {
    font-family: 'Rubik', -apple-system,system-ui, sans-serif;
    background-color: #E5E5E5;
    color: #333333;
  }
  `;
}
