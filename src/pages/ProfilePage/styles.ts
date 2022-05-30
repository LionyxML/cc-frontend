import styled from "styled-components";
import { Container } from "@mui/material";

export const SContainer = styled(Container)`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;

    height: 100vh;
    max-width: 100%;
    margin: 0;
    padding: 0;
    background-color: white;
    color: black;

    padding: 30px;
  }
`;

export const SGrid = styled(Container)`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    height: 100vh;
    max-width: 100%;
    margin: 0;
    padding: 0;
    background-color: white;
    color: black;

    padding: 30px;
  }
`;
