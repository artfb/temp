import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";

import { UsersList } from "./UsersList";
import { useSearchingUsers } from "../hooks";
import { SearchForm } from "./SearchForm";

export const SearchUsersPage = () => {
  const { users, isLoading, isError, form, searchQuery, handleSubmit } =
    useSearchingUsers();

  return (
    <Grid container alignItems="center" direction="column" gap={4}>
      <SearchForm form={form} onSubmit={handleSubmit} />

      <Grid container size={{ xs: 12, sm: 10, md: 6 }}>
        {isLoading && <CircularProgress />}

        {isError && <Typography>Error fetching users</Typography>}

        {!isError && searchQuery && !isLoading && (
          <Grid size={12} justifyItems="start">
            <Typography mb={4}>Showing results for: {searchQuery}</Typography>

            <UsersList users={users} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
