import * as yup from "yup";

export const userSearchFormSchema = yup
  .object({
    query: yup.string().required(),
  })
  .required();
