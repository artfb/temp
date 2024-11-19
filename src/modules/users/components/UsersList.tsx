import { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { User } from "../types";
import { UserRepos } from "./UserRepos";

type UsersListProps = {
  users: User[];
};

export const UsersList = memo((props: UsersListProps) => {
  const { users } = props;

  if (!users.length) return <Typography>No results</Typography>;

  return (
    <Box sx={{ width: "100%" }}>
      {users.map((user) => (
        <UserRepos username={user.login} key={user.login} />
      ))}
    </Box>
  );
});
