import { Grid, Typography } from "@mui/material";
import React from "react";
import { CopyrightLine } from "../../components";

export const NotFoundPage: React.FC = () => {
  return (
    <Grid sx={{ mt: 5 }}>
      <Typography
        sx={{ mt: 10 }}
        variant="h2"
        color="text.secondary"
        align="center"
      >
        Ooops!
      </Typography>
      <Typography
        sx={{ mt: 5 }}
        variant="h4"
        color="text.secondary"
        align="center"
      >
        Página não encontrada.
      </Typography>
      <Typography
        sx={{ mt: 10 }}
        variant="h5"
        color="text.secondary"
        align="center"
      >
        Desculpe-nos pelo transtorno :(
      </Typography>
      <CopyrightLine />
    </Grid>
  );
};
