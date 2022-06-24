/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
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
import { useLoginUser, UserRegisterDataType } from "../../api";
import { useUser } from "../../domain";

const LoginSchema = yup.object().shape({
  email: yup.string().required("Obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Obrigatório")
    .min(6, "Maior do que 6 caracteres")
    .matches(
      /^[0-9A-Za-z]*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*[0-9a-zA-Z]*$/,
      "Necessário 1 caractere especial"
    ),
});

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const { loading: isLoading, send: sendUserRegistration } = useLoginUser();
  const [loginDone, setLoginDone] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();
  const [passRecoveryOpen, setPassRecoveryOpen] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<void> => {
    const post = await sendUserRegistration({
      ...data,
    } as UserRegisterDataType);

    if (post.status === "success") {
      setLoginError(false);
      setLoginDone(true);
      setCurrentUser(post);
      navigate("../", { replace: true });
    }

    if (post.status === "error") {
      setLoginError(true);
      setServerErrorMessage(post.msg);
    }
  };

  const onError: SubmitErrorHandler<FieldValues> = (): void => {
    // eslint-disable
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
              pt: 1,
              pb: 8,
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
              Log in
            </Typography>

            {loginDone ? (
              <Alert severity="success" sx={{ mt: 12, p: 5, minWidth: 410 }}>
                <AlertTitle>Sucesso!</AlertTitle>
                Redirecionando para seu ambiente de usuário!
                <LinearProgress color="success" sx={{ mt: 4 }} />
              </Alert>
            ) : null}

            {loginError ? (
              <Alert severity="error" sx={{ mt: 2, p: 2, minWidth: 410 }}>
                <AlertTitle>Erro!</AlertTitle>
                O servidor retornou um erro:
                <br /> <br />
                {serverErrorMessage}
                <br /> <br />
                <strong>Tente novamente!</strong>
              </Alert>
            ) : null}

            {!isLoading && !loginDone ? (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit, onError)}
                sx={{ mt: 3 }}
              >
                <TextField
                  {...register("email")}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Endereço de e-mail"
                  name="email"
                  autoComplete="email"
                  error={Boolean(errors.email)}
                  helperText={errors?.email?.message}
                />
                <TextField
                  {...register("password")}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={Boolean(errors.password)}
                  helperText={errors?.password?.message}
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
                    <SLink to="#" onClick={() => setPassRecoveryOpen(true)}>
                      Esqueceu sua senha?
                    </SLink>
                  </Grid>
                  <Grid item>
                    <SLink to="/register">
                      Ainda não tem sua conta? Registre-se.
                    </SLink>
                  </Grid>
                </Grid>
                <CopyrightLine />
              </Box>
            ) : (
              !loginDone && (
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
        <Dialog open={passRecoveryOpen}>
          <DialogTitle>
            Recuperação de senha
            <IconButton
              aria-label="close"
              onClick={() => setPassRecoveryOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 5 }}>
            <DialogContentText>
              <Typography>
                Para aumentar sua segurança, não realizamos recuperação
                automatizada de senhas.
              </Typography>
              <br />
              <Typography>
                Entre em contato com nosso suporte através dos{" "}
                <SLink to="/contacts" style={{ fontSize: "1rem" }}>
                  contatos
                </SLink>
                .
              </Typography>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </SGridOutter>
    </SContainer>
  );
};
