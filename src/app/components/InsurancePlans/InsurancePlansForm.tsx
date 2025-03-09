import { CloudArrowUpIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "api";
import { Button } from "components";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { dynamicFormMapper } from "./utils";

type Props = {
  form: Form;
};

const getSchema = (fields: Array<FormField>) =>
  z.object(
    Object.fromEntries(fields.map((field) => [field.id, createSchema(field)]))
  );

const createSchema = (field: FormField) => {
  let schema = (field.type === "number" ? z.number : z.string)().min(1, {
    message: "Required",
  });
  if (!field.validation) return schema;

  const { min, max, pattern } = field.validation;
  if (min !== undefined) schema = z.number().min(min);
  if (max !== undefined) schema = z.number().max(max);
  if (pattern) schema = z.string().regex(new RegExp(pattern), "Invalid format");

  return schema;
};

type Schema = z.infer<ReturnType<typeof getSchema>>;

const InsurancePlansForm = ({ form }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(
      getSchema(
        form.fields.flatMap((field) => (field?.fields ? field.fields : field))
      )
    ),
  });
  const fields = dynamicFormMapper({ form, register, errors });

  const onSubmit = (values: Schema) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      {fields}

      <div className="col-span-2 mt-2 flex justify-end">
        <Button type="submit" label="Submit" icon={<CloudArrowUpIcon />} />
      </div>
    </form>
  );
};

export { InsurancePlansForm };
