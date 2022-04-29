/* eslint-disable react/jsx-props-no-spreading */
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
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CopyrightLine } from "../../components";
import {
  SContainer,
  SGridLeftPanel,
  SGridRightPanel,
  SGridOutter,
  SLink,
  SBox,
} from "./styles";

const RegisterSchema = yup.object().shape({
  userName: yup
    .string()
    .required("Obrigatório")
    .min(5, "Mínimo 5 Letras")
    .test("without-space", "Não pode ter espaço", (value) =>
      Boolean(!value?.includes(" "))
    ),
  firstName: yup.string().required("Obrigatório").min(2, "Mínimo 2 letras"),
  lastName: yup.string().required("Obrigatório").min(2, "Mínimo 2 letras"),
  email: yup.string().required("Obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Obrigatório")
    .min(6, "Maior do que 6 caracteres")
    .matches(
      /^[0-9A-Za-z]*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?][0-9a-zA-Z]*$/,
      "Necessário 1 caractere especial"
    ),
  passwordConfirmation: yup
    .string()
    .required("A confirmação é necessária")
    .oneOf([yup.ref("password"), null], "As senhas são diferentes!"),
});

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<FieldValues> = (data): void => {
    console.info(">>>", data);
  };

  const onError: SubmitErrorHandler<FieldValues> = (errorData): void => {
    console.error(">>>", errorData);
  };

  // TODO: UserName

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
              Registrar
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit, onError)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("firstName")}
                    error={Boolean(errors.firstName)}
                    helperText={errors?.firstName?.message}
                    fullWidth
                    id="firstName"
                    label="Nome"
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("lastName")}
                    error={Boolean(errors.lastName)}
                    helperText={errors?.lastName?.message}
                    fullWidth
                    id="lastName"
                    label="Sobrenome"
                    autoComplete="family-name"
                  />
                </Grid>
              </Grid>
              <TextField
                margin="normal"
                fullWidth
                id="userName"
                label="Nome de usuário"
                {...register("userName")}
                error={Boolean(errors.userName)}
                helperText={errors?.userName?.message}
                autoComplete="username"
              />

              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Endereço de e-mail"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors?.email?.message}
                autoComplete="email"
              />
              <TextField
                margin="normal"
                fullWidth
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={errors?.password?.message}
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                fullWidth
                {...register("passwordConfirmation")}
                error={Boolean(errors.passwordConfirmation)}
                helperText={errors?.passwordConfirmation?.message}
                label="Confirmação da senha"
                type="password"
                id="passwordConfirmation"
                autoComplete="none"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Quero receber notícias e novidades por e-mail"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrar
              </Button>
              <Grid container>
                <Grid item xs />
                <Grid item>
                  <SLink to="/">Já tem uma conta? Faça Login.</SLink>
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
