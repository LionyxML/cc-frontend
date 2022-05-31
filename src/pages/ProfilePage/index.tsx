import {
  Avatar,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Buffer } from "buffer";
import { pathOr } from "ramda";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { BreadPath, CopyrightLine } from "../../components";
import { useUser } from "../../domain";
import { SContainer, SGrid } from "./styles";

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isTokenExpired, user, loadUser } = useUser();

  useEffect(() => {
    loadUser();

    if (isTokenExpired()) {
      navigate("../login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SContainer>
      <BreadPath path={["CC", "Usuário", "Perfil"]} />
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
            Perfil
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            Essas são as informações do usuário presentes em nosso sistema:
          </Typography>
        </Container>
        {/* End hero unit */}
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "sm", overflowY: "hidden" }}
        >
          <Table aria-label="a dense table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <b>Nome:</b>
                </TableCell>
                <TableCell align="right">{user?.firstName}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <b>Sobrenome:</b>
                </TableCell>
                <TableCell align="right">{user?.lastName}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <b>E-mail:</b>
                </TableCell>
                <TableCell align="right">{user?.email}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <b>Usuário:</b>
                </TableCell>
                <TableCell align="right">{user?.userName}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <b>Avatar:</b>
                </TableCell>
                <TableCell align="right">
                  <Avatar
                    variant="rounded"
                    src={String(
                      Buffer.from(
                        pathOr("", ["profilePic", "data"], user),
                        "base64"
                      )
                    )}
                    sx={{ width: 150, height: 150 }}
                    alt={user?.firstName}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <CopyrightLine />
      </SGrid>
    </SContainer>
  );
};
