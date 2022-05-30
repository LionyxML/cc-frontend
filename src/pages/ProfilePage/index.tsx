import {
  Avatar,
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
      <Typography variant="h4" component="h1" marginTop={3}>
        Perfil
      </Typography>
      <Typography variant="body1" margin={3}>
        Esse é o seu perfil de usuário presente em nosso sistema.
      </Typography>
      <SGrid>
        <TableContainer component={Paper} sx={{ maxWidth: "sm", mt: "20px" }}>
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
