import TextField from "@mui/material/TextField";
import { SearchFormFields } from "../types";
import { Controller, useFormContext } from "react-hook-form";

export const SearchInput = ({
  placeholder = "Search...",
}: {
  placeholder?: string;
}) => {
  const form = useFormContext<SearchFormFields>();

  return (
    <Controller
      name="query"
      control={form.control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            placeholder={placeholder}
          />
        );
      }}
    />
  );
};
