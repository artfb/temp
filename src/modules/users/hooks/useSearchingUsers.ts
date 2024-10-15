import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetUsersQuery } from "../queries";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SearchFormFields } from "../types";
import { userSearchFormSchema } from "../schemas";

export const useSearchingUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SearchFormFields>({
    resolver: yupResolver(userSearchFormSchema),
    defaultValues: {
      query: "",
    },
    mode: "onSubmit",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useGetUsersQuery(
      {
        query: searchQuery,
      },
      {
        enabled: !!searchQuery,
      },
    );

  const value = useWatch({
    control,
    exact: true,
    name: "query",
  });

  const handleSearchQueryChange = useCallback(() => {
    console.log("change search query");

    handleSubmit(({ query }) => setSearchQuery(query))();
  }, [handleSubmit]);

  useEffect(() => {
    if (!value) return;

    const timeout = setTimeout(() => {
      handleSearchQueryChange();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [handleSearchQueryChange, value]);

  const users = useMemo(() => {
    return data ? data.pages.flatMap((d) => d.items) : [];
  }, [data]);

  return {
    users,
    hasNextPage,
    isLoading: isFetchingNextPage || isPending,
    handleNextPage: fetchNextPage,
    errors,
    control,
  };
};
