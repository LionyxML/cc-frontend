import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { BreadPath, CopyrightLine } from "../../components";
import { useUser } from "../../domain";
import { SContainer, SGrid } from "./styles";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isTokenExpired, loadUser } = useUser();

  useEffect(() => {
    loadUser();

    if (isTokenExpired()) {
      navigate("../login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <CopyrightLine />
      </SGrid>
    </SContainer>
  );
};
