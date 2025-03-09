import useSWR from "swr";
import { fetcher } from "utils";

type Form = {
  formId: string;
  title: string;
  fields: FormField[];
};

type FormField = {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: Array<string>;
  fields?: Array<FormField>;
  dynamicOptions?: DynamicOptions;
  visibility?: VisibilityCondition;
  validation?: FieldValidation;
};

type FieldType =
  | "text"
  | "number"
  | "date"
  | "radio"
  | "select"
  | "checkbox"
  | "group";

type DynamicOptions = {
  dependsOn: string;
  endpoint: string;
  method: "GET";
};

type VisibilityCondition = {
  dependsOn: string;
  condition: "equals";
  value: string;
};

type FieldValidation = {
  min?: number;
  max?: number;
  pattern?: string;
};

type FormSchema = Array<Form>;

const useInsuranceForm = () =>
  useSWR<FormSchema>("/api/insurance/forms", fetcher.get);

export { useInsuranceForm };
