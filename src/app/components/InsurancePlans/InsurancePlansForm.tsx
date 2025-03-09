import { Form } from "api";
import { useForm } from "react-hook-form";
import { dynamicFormMapper } from "./utils";
import { Button } from "components";
import { CloudArrowUpIcon } from "@heroicons/react/16/solid";

type Props = {
  form: Form;
};

const InsurancePlansForm = ({ form }: Props) => {
  const { register, handleSubmit } = useForm();
  const fields = dynamicFormMapper({ form, register });

  const onSubmit = (event: unknown) => {
    console.log(event);
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
