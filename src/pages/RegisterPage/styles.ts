import styled from "styled-components";
import { Box, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

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

export const SLink = styled(Link)`
  && {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.successBlue};
  }
`;

export const SGridOutter = styled(Grid)`
  && {
    height: 100vh;
  }
`;

export const SGridLeftPanel = styled(Grid)`
  && {
    background-image: url(https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`;

export const SGridRightPanel = styled(Grid)`
  && {
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    color: ${({ theme }) => theme.colors.textDefault};
  }
`;

export const SBox = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow-y: auto;
  }
`;
