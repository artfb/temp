import { useSearchingUsers } from "../hooks/useSearchingUsers";
import { SearchInput } from "./SearchInput";
import { UsersList } from "./UsersList";

export const SearchUsers = () => {
  const { hasNextPage, users, handleNextPage, isLoading, control } =
    useSearchingUsers();

  return (
    <>
      <SearchInput control={control} placeholder="Search..." />

      <UsersList
        users={users}
        hasNextPage={hasNextPage}
        onLoadMore={handleNextPage}
        isLoading={isLoading}
      />
    </>
  );
};
