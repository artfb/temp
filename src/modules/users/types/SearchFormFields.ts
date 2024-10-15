import { InferType } from "yup";
import { userSearchFormSchema } from "../schemas/userSearchForm.schema";

export type SearchFormFields = InferType<typeof userSearchFormSchema>;
