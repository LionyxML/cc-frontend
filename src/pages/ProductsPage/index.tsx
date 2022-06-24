import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import React from "react";
import { BreadPath, CopyrightLine } from "../../components";
import { SContainer, SGrid } from "./styles";

export const ProductsPage: React.FC = () => {
  return (
    <SContainer>
      <BreadPath path={["CC", "Institucional", "Produtos"]} />
      <SGrid>
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 0, pb: 6 }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Nossos Produtos
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            Oferecemos soluções Drop-In para várias necessidades de auditorias
            no mercado brasileiro:
          </Typography>
        </Container>

        <Grid container spacing={2}>
          <Grid item sm={8}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Produto 1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Produto 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Blanditiis quisquam excepturi fugit aliquam similique omnis
                  nihil et veniam nemo, maiores a impedit maxime voluptates iure
                  officiis amet ab dolorem eveniet.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Compartilhe</Button>
                <Button size="small">Saiba Mais</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Produto 2"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Produto 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Blanditiis quisquam excepturi fugit aliquam similique omnis
                  nihil et veniam nemo, maiores a impedit maxime voluptates iure
                  officiis amet ab dolorem eveniet.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Compartilhe</Button>
                <Button size="small">Saiba Mais</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/70911/pexels-photo-70911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Produto 3"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Produto 3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Blanditiis quisquam excepturi fugit aliquam similique omnis
                  nihil et veniam nemo, maiores a impedit maxime voluptates iure
                  officiis amet ab dolorem eveniet.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Compartilhe</Button>
                <Button size="small">Saiba Mais</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sm={8}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Produto 4"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Produto 4
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Blanditiis quisquam excepturi fugit aliquam similique omnis
                  nihil et veniam nemo, maiores a impedit maxime voluptates iure
                  officiis amet ab dolorem eveniet.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Compartilhe</Button>
                <Button size="small">Saiba Mais</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <CopyrightLine />
      </SGrid>
    </SContainer>
  );
};
