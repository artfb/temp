import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Repository } from "../types";
import Star from "@mui/icons-material/StarOutline";
import { Box, Stack } from "@mui/material";

type RepoDetailsProps = {
  repository: Repository;
};

export const RepoDetails = (props: RepoDetailsProps) => {
  const { repository } = props;

  return (
    <Card variant="outlined" sx={{ marginBottom: 1 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
            justifyContent: "start",
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h5" component="div">
              {repository.name}
            </Typography>

            <Stack direction="row" alignItems="center">
              <Star />
              <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                {repository.stargazers_count}
              </Typography>
            </Stack>
          </Stack>
          <Typography sx={{ color: "text.secondary", textAlign: "left" }}>
            {repository.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
