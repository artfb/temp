import { FormProvider, UseFormReturn } from "react-hook-form";
import { SearchFormFields } from "../types";
import Grid from "@mui/material/Grid2";
import { SearchInput } from "./SearchInput";
import { Button } from "@mui/material";

type SearchFormProps = {
  form: UseFormReturn<SearchFormFields>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const SearchForm = (props: SearchFormProps) => {
  const { form, onSubmit } = props;

  return (
    <FormProvider {...form}>
      <Grid
        component="form"
        gap={2}
        container
        onSubmit={onSubmit}
        size={{ xs: 12, sm: 10, md: 6 }}
      >
        <SearchInput placeholder="Search..." />

        <Button type="submit" fullWidth variant="contained">
          Search
        </Button>
      </Grid>
    </FormProvider>
  );
};
