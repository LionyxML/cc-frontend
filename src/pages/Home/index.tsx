/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { propOr, reverse } from "ramda";
import { BreadPath, CopyrightLine } from "../../components";
import { useUser } from "../../domain";
import { SContainer, SGrid } from "./styles";
import { useCertificates, useSendCertificate } from "../../api/certHooks";
import { convertFileToBase64, miliSecondsDelay } from "../../utils";

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
  const { loading: loadingCertificate, send: sendCertificate } =
    useSendCertificate();
  const [uploadingCertificateError, setUploadingCertificateError] =
    useState(false);
  const [uploadingCertificateDone, setUploadingCertificateDone] =
    useState(false);
  const [uploadingServerErrorMessage, setUploadingServerErrorMessage] =
    useState("");
  const [openUploadModal, setOpenUploadModal] = React.useState(false);
  const handleOpenUploadModal = (): void => {
    setOpenUploadModal(true);
  };
  const handleCloseUploadModal = (): void => {
    setOpenUploadModal(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetFormData,
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

  const fetchCertificatesList = async (): Promise<void> => {
    const { certificates: serverCertificates } = await getUserCertificates();
    setCertificates(serverCertificates);
  };

  useEffect(() => {
    fetchCertificatesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<void> => {
    const base64Cert =
      data.newCertificate[0] !== null && data.newCertificate[0] !== undefined
        ? await convertFileToBase64(data.newCertificate[0])
        : "";

    const post = await sendCertificate(data.fileName, String(base64Cert));

    if (post.status === "success") {
      setUploadingCertificateError(false);
      setUploadingCertificateDone(true);
      await miliSecondsDelay(2000);
      handleCloseUploadModal();
      fetchCertificatesList();

      await miliSecondsDelay(1000);
      resetFormData();
      setUploadingCertificateDone(false);
    }

    if (post.status === "error") {
      setUploadingCertificateError(true);
      setUploadingServerErrorMessage(post.msg);
    }
  };

  const onError: SubmitErrorHandler<FieldValues> = (): void => {
    // eslint-disable
  };

  return (
    <SContainer>
      <BreadPath path={["CC", "Sistema", "Certificados"]} />
      <SGrid>
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{
            pt: 0,
            pb: 1,
            px: 6,
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Certificados
          </Typography>
          {/* <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            Bem vindo ao sistema CC!
          </Typography> */}
        </Container>

        <Grid sx={{ p: 0, m: 0 }}>
          <Container
            component="main"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              m: 0,
              p: 0,
            }}
          >
            Meus certificados:
            <Button onClick={handleOpenUploadModal}>
              + Adicionar Certificado
            </Button>
          </Container>

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
              {reverse(certificates).map((certificate, j) => (
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
      <Dialog open={openUploadModal} onClose={handleCloseUploadModal}>
        <DialogTitle sx={{ mb: 0, pb: 0 }}>
          Adicionar Novo Certificado
        </DialogTitle>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit, onError)}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: 0,
            padding: 0,
          }}
        >
          <DialogContent>
            <DialogContentText sx={{ mt: 0, mb: 2 }}>
              Preencha o nome do seu certificado e escolha o arquivo a ser
              enviado. Clique em enviar e aguarde o carregamento.
            </DialogContentText>

            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {uploadingCertificateDone ? (
                <Alert
                  severity="success"
                  sx={{ m: 2, p: 2, width: "80%", display: "flex" }}
                >
                  <Grid sx={{ width: "100%" }}>
                    <AlertTitle>Sucesso!</AlertTitle>
                    Fechando essa janela...
                  </Grid>
                </Alert>
              ) : null}

              {uploadingCertificateError ? (
                <Alert severity="error" sx={{ m: 2, p: 2, width: "80%" }}>
                  <AlertTitle>Erro!</AlertTitle>
                  O servidor retornou o seguinte erro:
                  <br /> <br />
                  {uploadingServerErrorMessage}
                  <br /> <br />
                  <strong>Tente novamente!</strong>
                </Alert>
              ) : null}

              {loadingCertificate ? <CircularProgress /> : null}
              {!loadingCertificate && !uploadingCertificateDone ? (
                <>
                  <TextField
                    {...register("fileName")}
                    error={Boolean(errors.fileName)}
                    helperText={errors?.fileName?.message}
                    fullWidth
                    id="fileName"
                    label="Nome do certificado"
                    autoComplete="file-name"
                    sx={{ height: "2rem", fontSize: "10px", mb: 2 }}
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
                  >
                    <input
                      id="files"
                      type="file"
                      accept="application/*"
                      style={{ width: "100%" }}
                      {...register("newCertificate")}
                    />
                  </Button>
                </>
              ) : null}
            </Grid>
          </DialogContent>
          {!loadingCertificate ? (
            <DialogActions sx={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={handleCloseUploadModal}>Cancelar</Button>
              {!uploadingCertificateDone ? (
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
              ) : null}
            </DialogActions>
          ) : null}
        </Box>
      </Dialog>
    </SContainer>
  );
};
