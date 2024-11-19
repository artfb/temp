import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useGetUserReposQuery } from "../queries/useGetUserRepos.query";
import { RepoDetails } from "./RepoDetails";

type UserReposProps = {
  username: string;
};

export const UserRepos = (props: UserReposProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { username } = props;

  const { data, isError, isPending } = useGetUserReposQuery(
    { username },
    { enabled: expanded },
  );

  const handleExpanded = () => {
    setExpanded((state) => !state);
  };

  return (
    <Accordion expanded={expanded} onChange={handleExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {username}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          maxHeight: 400,
          overflow: "auto",
        }}
      >
        {isError && <Typography>Error getting repos list</Typography>}

        {isPending && <CircularProgress />}

        {data?.map((repository) => (
          <RepoDetails key={repository.name} repository={repository} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
