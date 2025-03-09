import { useInsuranceForm } from "api";
import { InsuranceCard } from "components";
import { useModal } from "models";
import { InsurancePlansSkeleton } from "./InsurancePlansSkeleton";
import { InsurancePlansModal } from "./InsurancePlansModal";

const InsurancePlans = () => {
  const { data: plans, isLoading } = useInsuranceForm();
  const { open } = useModal();

  return (
    <>
      <div className="mt-32 flex justify-center flex-col gap-4">
        <h3 className="m-0 text-3xl font-bold">Featured Plans</h3>
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          {isLoading ? (
            <InsurancePlansSkeleton />
          ) : (
            plans?.map(({ title, formId }, index) => (
              <InsuranceCard
                key={formId}
                label={title}
                index={index + 1}
                onClick={() => {
                  open({ id: formId });
                }}
              />
            ))
          )}
        </div>
      </div>

      <InsurancePlansModal />
    </>
  );
};

export { InsurancePlans };
