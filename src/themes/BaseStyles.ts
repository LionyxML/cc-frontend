import { createGlobalStyle } from "styled-components";

export const BaseStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    .ReactModal__Overlay{
      z-index: 1000;
    }
  }

  body, html{
    min-height: 100%;
    overflow-y: hidden;
  }

  .MuiGrid-root {
      z-index: 1000 !important;
    }
  
`;
