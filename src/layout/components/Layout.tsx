import Grid from "@mui/material/Grid2";
import { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren) => {
  return (
    <Grid justifyContent="start" container spacing={2}>
      <Grid size={12}>{props.children}</Grid>
    </Grid>
  );
};
