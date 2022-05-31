import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import React from "react";
import StarIcon from "@mui/icons-material/StarBorder";
import { BreadPath, CopyrightLine } from "../../components";
import { SContainer, SGrid } from "./styles";

export const PlansPage: React.FC = () => {
  const tiers = [
    {
      title: "Grátis",
      price: "0",
      description: [
        "10 usuários",
        "100 consultas",
        "Acesso ao help-desk",
        "Suporte por e-mail",
      ],
      buttonText: "Registre-se agora!",
      buttonVariant: "outlined",
    },
    {
      title: "Pro",
      subheader: "Mais popular",
      price: "15",
      description: [
        "20 usuários",
        "10.000 consultas",
        "Acesso ao help-desk",
        "Suporte prioritário por e-mail",
      ],
      buttonText: "Inicie agora!",
      buttonVariant: "contained",
    },
    {
      title: "Enterprise",
      price: "30",
      description: [
        "50 usuários",
        "Consultas ilimitadas",
        "Acesso ao help-desk",
        "Suporte por telefone e e-mail",
      ],
      buttonText: "Entre em contato",
      buttonVariant: "outlined",
    },
  ];

  return (
    <SContainer>
      <BreadPath path={["CC", "Institucional", "Planos"]} />
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
            Nossos planos
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            Temos diversos planos de assinatura para as mais variadas
            necessidades:
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === "Enterprise" ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    action={tier.title === "Pro" ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        R${tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mês
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant as "outlined" | "contained"}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <CopyrightLine />
      </SGrid>
    </SContainer>
  );
};
