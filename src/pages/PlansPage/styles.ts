import styled from "styled-components";
import { Container, Paper } from "@mui/material";

export const SContainer = styled(Container)`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;

    height: calc(100vh - 24px);
    max-width: 100%;
    margin: 0;
    padding: 0;
    background-color: white;
    color: black;

    padding: 30px;

    overflow-y: auto;
  }
`;

export const SGrid = styled(Container)`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    height: calc(100vh - 24px);
    max-width: 100%;
    margin: 0;
    padding: 0;
    background-color: white;
    color: black;

    padding: 30px;
  }
`;

export const SItem = styled(Paper)`
  && {
    padding: 20px;
  }
`;
