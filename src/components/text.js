import styled from 'styled-components';

const Text = styled.span`
   ${props => props.fontSize ? `font-size: ${props.fontSize};` : ''}
   ${props => props.fontWeight ? `font-weight: ${props.fontWeight};` : ''}
`;

export default Text;
