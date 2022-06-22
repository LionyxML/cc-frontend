/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { propOr } from "ramda";
import { BreadPath, CopyrightLine } from "../../components";
import { useUser } from "../../domain";
import { SContainer, SGrid } from "./styles";
import { useCertificates, useSendCertificate } from "../../api/certHooks";
import { convertFileToBase64 } from "../../utils";

const SUPPORTED_FORMATS = [
  "application/x-x509-user-cert", // crt
  "application/pkix-cert", // cer
  "application/x-pem-file", // pem
  "application/x-x509-ca-cert", // ca-cert.crt
];

const CertificateSchema = yup.object().shape({
  fileName: yup.string().required("Obrigatório").min(2, "Mínimo 2 letras"),
  newCertificate: yup
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
      "Esse formato não é suportato. Apenas CRT, CER ou PEM.",
      (value) =>
        !value[0] || (value[0] && SUPPORTED_FORMATS.includes(value[0].type))
    ),
});

const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString();

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isTokenExpired, loadUser } = useUser();
  const { fetch: getUserCertificates } = useCertificates();
  const [certificates, setCertificates] = useState([]);
  const { send: sendCertificate } = useSendCertificate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CertificateSchema),
  });

  useEffect(() => {
    loadUser();

    if (isTokenExpired()) {
      navigate("../login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetch(): Promise<void> {
      const { certificates: serverCertificates } = await getUserCertificates();
      setCertificates(serverCertificates);
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<void> => {
    const base64Cert =
      data.newCertificate[0] !== null && data.newCertificate[0] !== undefined
        ? await convertFileToBase64(data.newCertificate[0])
        : "";

    const post = await sendCertificate(data.fileName, String(base64Cert));

    if (post.status === "success") {
      // TODO: implement success / error messages and spinner on this form
      // setRegistrationError(false);
      // setRegistrationDone(true);
      // await miliSecondsDelay(2000);
      // navigate("../", { replace: true });
    }

    if (post.status === "error") {
      // setRegistrationError(true);
      // setServerErrorMessage(post.msg);
    }
  };

  const onError: SubmitErrorHandler<FieldValues> = (): void => {
    // eslint-disable
  };

  return (
    <SContainer>
      <BreadPath path={["CC", "Home", "Principal"]} />
      <SGrid>
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 2, pb: 6 }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            CC System
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            Bem vindo ao sistema CC!
          </Typography>
        </Container>

        <Container
          maxWidth="md"
          component="main"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          Escolha um certificado na lista abaixo para continuar ou adicione um
          novo:
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit, onError)}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <TextField
                {...register("fileName")}
                error={Boolean(errors.fileName)}
                helperText={errors?.fileName?.message}
                fullWidth
                id="fileName"
                label="Nome do certificado"
                autoComplete="file-name"
                sx={{ height: "2rem", fontSize: "10px" }}
              />
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  mt: 2,
                  p: 2,
                  height: "2rem",
                }}
                startIcon={<FileUploadIcon />}
              >
                <input
                  id="files"
                  type="file"
                  accept="application/*"
                  {...register("newCertificate")}
                />
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  m: 1,
                  p: 2,
                  height: "2rem",
                }}
                startIcon={<FileUploadIcon />}
              >
                Enviar
              </Button>
            </Grid>
          </Box>
        </Container>
        <Grid>
          Meus certificados:
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome do Certificado</TableCell>
                <TableCell>Criado em</TableCell>
                <TableCell>Nome do Arquivo</TableCell>
                <TableCell>Baixar Certificado</TableCell>
                <TableCell>Iniciar Processamento</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Fazer Comparação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificates.map((certificate, j) => (
                <TableRow key={`certs-row-${j}`}>
                  <TableCell>{propOr("-", "fileName")(certificate)}</TableCell>
                  <TableCell>
                    {formatDate(propOr("-", "createdAt")(certificate))}
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <CopyrightLine />
      </SGrid>
    </SContainer>
  );
};
