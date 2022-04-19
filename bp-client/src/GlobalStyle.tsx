import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { normalize } from 'styled-normalize';

export const color = {
  fontBlack: '#333333',
  white: '#FFFFFF',
};

export type Palette = { [K in keyof typeof color]: K };

export const theme: DefaultTheme = {
  palette: color as Palette,
};

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    margin: 0px;
    padding: 0px; 
  }

  h1, h2, h3, h4, h5, h6, p, a, div, span, button {
    font-family: 'Noto Sans KR', sans-serif;
    color: ${(props) => props.theme.palette.fontBlack}
  }
`;

export default GlobalStyle;
