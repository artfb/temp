import { useCallback, useState } from "react";
import { useGetUsersQuery } from "../queries";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SearchFormFields } from "../types";
import { userSearchFormSchema } from "../schemas";

export const useSearchingUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const form = useForm<SearchFormFields>({
    resolver: yupResolver(userSearchFormSchema),
    defaultValues: {
      query: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const { data, isFetching, isError } = useGetUsersQuery(
    {
      query: searchQuery,
    },
    {
      enabled: !!searchQuery,
    },
  );

  const handleSubmitFn = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSubmit(({ query }) => setSearchQuery(query))();
    },
    [handleSubmit],
  );

  return {
    users: data?.items || [],
    isLoading: isFetching,
    isError,
    errors,
    form,
    searchQuery,
    handleSubmit: handleSubmitFn,
  };
};
