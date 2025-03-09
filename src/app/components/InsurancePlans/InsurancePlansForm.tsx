import { CloudArrowUpIcon } from "@heroicons/react/16/solid";
import { Form } from "api";
import { Button } from "components";
import { useModal } from "models";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { fetcher, toast } from "utils";
import { dynamicFormMapper } from "./utils";

type Props = {
  form: Form;
};

const InsurancePlansForm = ({ form }: Props) => {
  const { close } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });
  const fields = dynamicFormMapper({ form, register, errors, values: watch() });

  const { trigger, isMutating } = useSWRMutation(
    "/api/insurance/forms/submit",
    fetcher.post
  );

  const onSubmit = async (values: unknown) => {
    try {
      await trigger(values);
      toast.success("Updated successfully!");
      close();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {fields}

      <div className="col-span-full mt-2 flex justify-end">
        <Button
          type="submit"
          label="Submit"
          icon={<CloudArrowUpIcon />}
          isLoading={isMutating}
        />
      </div>
    </form>
  );
};

export { InsurancePlansForm };
