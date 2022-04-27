import React from "react";
import { Paper } from "@mui/material";
import { SContainer } from "./styles";

export const LoginPage: React.FC = () => {
  return (
    <SContainer>
      CC site comming soon...
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 300,
          width: 300,
        }}
      >
        {" "}
        ;)
      </Paper>
    </SContainer>
  );
};
