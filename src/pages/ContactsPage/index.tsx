import { Container, Grid, Typography } from "@mui/material";

import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { BreadPath, CopyrightLine } from "../../components";
import { SContainer, SGrid } from "./styles";

export const ContactsPage: React.FC = () => {
  return (
    <SContainer>
      <BreadPath path={["CC", "Institucional", "Contatos"]} />
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
            Contatos
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            Estamos à disposição para melhor atender às suas necessidades:
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid>
            <Grid item xs={12} md={6} pb={2}>
              <Typography variant="h4" align="center" color="text.secondary">
                CC Systems
              </Typography>
            </Grid>
            <Typography variant="h6" align="center" color="text.secondary">
              <EmailIcon /> cc@cbstech.com.br
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary">
              <WhatsAppIcon /> +55 (11) 9 9999-9999
            </Typography>
          </Grid>
        </Container>

        <CopyrightLine />
      </SGrid>
    </SContainer>
  );
};
