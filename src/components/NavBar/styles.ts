import { AppBar } from "@mui/material";
import styled from "styled-components";

export const SAppBar = styled(AppBar)`
  && {
    background-color: ${({ theme }) => theme.colors.bgNavbar};
  }
`;
