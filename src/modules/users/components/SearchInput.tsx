import { Box, TextField } from "@mui/material";
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
  // const value = useWatch({
  //   control,
  //   exact: true,
  //   name: "query",
  // });

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     onChange(value);
  //   }, debounce);

  //   return () => clearTimeout(timeout);
  // }, [debounce, onChange, value]);

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <Controller
        name="query"
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              {...field}
              error={!!error}
              id="outlined-error-helper-text"
              helperText={error?.message}
              placeholder={placeholder}
            />
          );
        }}
      />
    </Box>
  );
};
