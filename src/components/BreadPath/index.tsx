import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

interface PropTypes {
  path: string[];
}

export const BreadPath: React.FC<PropTypes> = ({ path }) => {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        {path[0]}
      </Link>
      <Link underline="hover" color="inherit" href="/">
        {path[1]}
      </Link>
      <Typography color="text.primary">{path[2]}</Typography>
    </Breadcrumbs>
  );
};
