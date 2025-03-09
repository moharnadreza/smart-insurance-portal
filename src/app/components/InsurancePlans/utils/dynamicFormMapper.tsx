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
  values: { [x: string]: string | number };
};

type GeneratorParams = {
  field: FormField;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<{ [x: string]: string }>;
  values: { [x: string]: string | number };
};

const singleFieldGenerator = ({
  field,
  register,
  errors,
  values,
}: GeneratorParams) => {
  const { type, id, label, options, required, visibility, validation } = field;
  const isVisible = visibility?.dependsOn
    ? values[visibility.dependsOn] === visibility.value
    : true;
  const isRequired = isVisible && required;

  const commonInputProps = {
    ...register(id, {
      ...(isRequired && { required: "Required" }),
      ...(validation?.pattern && { pattern: new RegExp(validation.pattern) }),
    }),
    ...{
      id,
      label,
      isRequired,
      error: errors[id]?.message,
      isHidden: !isVisible,
    },
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
          label={
            validation?.min && validation?.max
              ? `${label} (${validation.min} - ${validation.max})`
              : label
          }
          {...register(id, {
            valueAsNumber: true,
            min: validation?.min,
            max: validation?.max,
          })}
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
    case "checkbox":
      return (
        <SelectInput
          key={id}
          {...commonInputProps}
          options={["Yes", "No"].map((option) => ({
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
  values,
}: GeneratorParams) => (
  <div
    key={id}
    className="relative col-span-full flex flex-col gap-4 overflow-hidden"
  >
    <h5 className="w-full absolute font-black group-hover:text-gray-200 text-[8rem] left-0 -top-14 bg-gradient-to-r from-gray-50 to-transparent inline-block text-transparent bg-clip-text truncate select-none z-0">
      {label}
    </h5>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields?.map((innerField) =>
        singleFieldGenerator({ field: innerField, register, errors, values })
      )}
    </div>
  </div>
);

const dynamicFormMapper = ({
  form: { fields },
  register,
  errors,
  values,
}: Params) =>
  fields.map((field) =>
    (field.type === "group" ? groupFieldGenerator : singleFieldGenerator)({
      field,
      register,
      errors,
      values,
    })
  );

export { dynamicFormMapper };
