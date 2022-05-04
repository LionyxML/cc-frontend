/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { CopyrightLine } from "../../components";
import {
  SContainer,
  SGridLeftPanel,
  SGridRightPanel,
  SGridOutter,
  SLink,
  SBox,
} from "./styles";
import { useRegisterUser, UserRegisterDataType } from "../../api";
import { convertFileToBase64, miliSecondsDelay } from "../../utils";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

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
  profilePic: yup
    .mixed()
    .nullable()
    .required("Um arquivo é necessário")
    .test(
      "file-size",
      "O arquivo é muito grande, 6MB no máximo",
      (value) => !value[0] || (value[0] && value[0].size <= 1024 * 1024 * 6)
    )
    .test(
      "file-format",
      "Esse formato não é suportato. Apenas JPG, JPEG ou PNG.",
      (value) =>
        !value[0] || (value[0] && SUPPORTED_FORMATS.includes(value[0].type))
    ),
});

export const RegisterPage: React.FC = () => {
  const { loading: isLoading, send: sendUserRegistration } = useRegisterUser();
  const [registrationDone, setRegistrationDone] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<void> => {
    const base64Img =
      data.profilePic[0] !== null && data.profilePic[0] !== undefined
        ? await convertFileToBase64(data.profilePic[0])
        : "";

    const post = await sendUserRegistration({
      ...data,
      profilePic: base64Img,
    } as UserRegisterDataType);

    if (post.status === "success") {
      setRegistrationError(false);
      setRegistrationDone(true);
      await miliSecondsDelay(2000);
      navigate("../", { replace: true });
    }

    if (post.status === "error") {
      setRegistrationError(true);
      setServerErrorMessage(post.msg);
    }
  };

  const onError: SubmitErrorHandler<FieldValues> = (errorData): void => {
    console.error(">>>", errorData);
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
              py: 8,
              px: 4,
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

            {registrationDone ? (
              <Alert severity="success" sx={{ mt: 12, p: 5, width: 410 }}>
                <AlertTitle>Sucesso!</AlertTitle>
                Redirecionando para a tela de <strong>login!</strong>
                <LinearProgress color="success" sx={{ mt: 4 }} />
              </Alert>
            ) : null}

            {registrationError ? (
              <Alert severity="error" sx={{ m: 2, p: 2, minWidth: 410 }}>
                <AlertTitle>Erro!</AlertTitle>
                O servidor retornou o seguinte erro:
                <br /> <br />
                {serverErrorMessage}
                <br /> <br />
                <strong>Tente novamente!</strong>
              </Alert>
            ) : null}

            {!isLoading && !registrationDone ? (
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
                  sx={{ m: 0, p: 0, marginTop: "0.5rem" }}
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
                  sx={{ m: 0, p: 0, marginTop: "0.5rem" }}
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
                  sx={{ m: 0, p: 0, marginTop: "0.5rem" }}
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
                  sx={{ m: 0, p: 0, marginTop: "0.5rem" }}
                />

                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ m: 0, p: 0, marginTop: "0.5rem", height: "2rem" }}
                  startIcon={<FileUploadIcon />}
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="profilePic"
                    {...register("profilePic")}
                  />
                </Button>
                <InputLabel error={Boolean(errors.profilePic)}>
                  {errors?.profilePic?.message}
                </InputLabel>

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
            ) : (
              !registrationDone && (
                <Box
                  sx={{
                    mt: 3,
                    height: "500px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              )
            )}
          </SBox>
        </SGridRightPanel>
      </SGridOutter>
    </SContainer>
  );
};
