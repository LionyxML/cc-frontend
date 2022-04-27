import styled from "styled-components";
import { Container } from "@mui/material";

export const SContainer = styled(Container)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 100vh;
    max-width: 100%;
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;
