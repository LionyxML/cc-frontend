/// <reference types="react-scripts" />

// styled.d.ts -- Expande tipo default Theme do StyledComponents com o type do tema default
import "styled-components";
import { ThemeType } from "./themes/default";

// styled.d.ts -- Expande tipo default Theme do StyledComponents com o type do tema default
// Necessário para utilizar o {themes} fora do styles.ts
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {
    __foo?: "bar";
  }
}
