import TextField from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";
import { SearchFormFields } from "../types";

export const SearchInput = ({
  placeholder = "Search...",
  control,
}: {
  control: Control<SearchFormFields>;
  placeholder?: string;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  return (
    <Controller
      name="query"
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            fullWidth
            error={!!error}
            id="outlined-error-helper-text"
            helperText={error?.message}
            placeholder={placeholder}
          />
        );
      }}
    />
  );
};
