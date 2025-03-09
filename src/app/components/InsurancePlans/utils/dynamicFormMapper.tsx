import type { Form, FormField } from "api";
import { CurrencyInput, DateInput, SelectInput, TextInput } from "components";
import type { FieldValues, UseFormRegister } from "react-hook-form";

type Params = {
  form: Form;
  register: UseFormRegister<FieldValues>;
};

type GeneratorParams = {
  field: FormField;
  register: UseFormRegister<FieldValues>;
};

const singleFieldGenerator = ({ field, register }: GeneratorParams) => {
  const { type, id, label, options, required } = field;
  const commonInputProps = {
    ...register(id),
    ...{ id, label, isRequired: required },
  };

  switch (type) {
    case "text":
      return <TextInput {...commonInputProps} />;
    case "date":
      return <DateInput {...commonInputProps} />;
    case "number":
      return <CurrencyInput {...commonInputProps} />;
    case "select":
    case "radio":
      return (
        <SelectInput
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
  field: { fields, label },
  register,
}: GeneratorParams) => (
  <div className="p-4 bg-gray-50 rounded-lg col-span-2 flex flex-col gap-4">
    <h5 className="font-bold text-xs">{label}</h5>
    <div className="grid grid-cols-2 gap-4">
      {fields?.map((innerFields) =>
        singleFieldGenerator({ field: innerFields, register })
      )}
    </div>
  </div>
);

const dynamicFormMapper = ({ form: { fields }, register }: Params) =>
  fields.map((field) =>
    (field.type === "group" ? groupFieldGenerator : singleFieldGenerator)({
      field,
      register,
    })
  );

export { dynamicFormMapper };
