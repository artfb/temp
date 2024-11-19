import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";

import { SearchInput } from "./SearchInput";
import { UsersList } from "./UsersList";
import { useSearchingUsers } from "../hooks";

export const SearchUsers = () => {
  const { users, isLoading, isError, control, searchQuery, handleSubmit } =
    useSearchingUsers();

  return (
    <Grid container alignItems="center" direction="column" gap={4}>
      <Grid
        component="form"
        gap={2}
        container
        onSubmit={handleSubmit}
        size={{ xs: 12, sm: 10, md: 6 }}
      >
        <SearchInput control={control} placeholder="Search..." />

        <Button type="submit" fullWidth variant="contained">
          Search
        </Button>
      </Grid>

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
