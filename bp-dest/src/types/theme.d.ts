import 'styled-components';
import type { Palette } from './GlobalStyle';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: Palette;
  }
}
