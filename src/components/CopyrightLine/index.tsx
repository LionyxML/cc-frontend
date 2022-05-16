import React from "react";
import { Typography } from "@mui/material";
import { SExtLink } from "./styles";

export const CopyrightLine: React.FC = () => {
  return (
    <Typography
      sx={{ mt: 5 }}
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {"Copyright © "}
      <SExtLink href="https://cbstech.com.br">CBS Tech</SExtLink>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};
