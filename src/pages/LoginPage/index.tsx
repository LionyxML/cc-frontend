import React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CopyrightLine } from "../../components";
import {
  SContainer,
  SGridLeftPanel,
  SGridRightPanel,
  SGridOutter,
  SLink,
  SBox,
} from "./styles";

export const LoginPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <SContainer>
      <SGridOutter container>
        <SGridLeftPanel
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
          }}
        />
        <SGridRightPanel item xs={12} sm={8} md={5}>
          <SBox
            sx={{
              my: 8,
              mx: 4,
            }}
          >
            <Typography variant="h2" sx={{ m: 4 }}>
              CC System
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de e-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar meus dados"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <SLink to="/register">Esqueceu sua senha?</SLink>
                </Grid>
                <Grid item>
                  <SLink to="/register">
                    Ainda não tem sua conta? Registre-se.
                  </SLink>
                </Grid>
              </Grid>
              <CopyrightLine />
            </Box>
          </SBox>
        </SGridRightPanel>
      </SGridOutter>
    </SContainer>
  );
};
