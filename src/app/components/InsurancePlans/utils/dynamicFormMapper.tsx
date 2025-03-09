import type { Form, FormField } from "api";
import { CurrencyInput, DateInput, SelectInput, TextInput } from "components";
import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type Params = {
  form: Form;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<{ [x: string]: string }>;
};

type GeneratorParams = {
  field: FormField;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<{ [x: string]: string }>;
};

const singleFieldGenerator = ({ field, register, errors }: GeneratorParams) => {
  const { type, id, label, options, required } = field;
  const commonInputProps = {
    ...register(id),
    ...{ id, label, isRequired: required, error: errors[id]?.message },
  };

  switch (type) {
    case "text":
      return <TextInput key={id} {...commonInputProps} />;
    case "date":
      return <DateInput key={id} {...commonInputProps} />;
    case "number":
      return (
        <CurrencyInput
          key={id}
          {...commonInputProps}
          {...register(id, { valueAsNumber: true })}
        />
      );
    case "select":
    case "radio":
      return (
        <SelectInput
          key={id}
          {...commonInputProps}
          options={options?.map((option) => ({
            label: option,
            value: option,
          }))}
        />
      );
  }
};

const groupFieldGenerator = ({
  field: { fields, label, id },
  register,
  errors,
}: GeneratorParams) => (
  <div
    key={id}
    className="p-4 bg-gray-50 rounded-lg col-span-2 flex flex-col gap-4"
  >
    <h5 className="font-bold text-xs">{label}</h5>
    <div className="grid grid-cols-2 gap-4">
      {fields?.map((innerField) =>
        singleFieldGenerator({ field: innerField, register, errors })
      )}
    </div>
  </div>
);

const dynamicFormMapper = ({ form: { fields }, register, errors }: Params) =>
  fields.map((field) =>
    (field.type === "group" ? groupFieldGenerator : singleFieldGenerator)({
      field,
      register,
      errors,
    })
  );

export { dynamicFormMapper };
