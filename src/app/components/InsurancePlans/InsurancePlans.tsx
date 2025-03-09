"use client";
import { useInsuranceForm } from "api/hooks/useInsuranceForm";
import { InsuranceCard } from "components";
import { InsurancePlansSkeleton } from "./InsurancePlansSkeleton";

const InsurancePlans = () => {
  const { data: plans, isLoading } = useInsuranceForm();

  return (
    <>
      <div className="mt-32 flex justify-center flex-col gap-4">
        <h3 className="m-0 text-3xl font-bold">Featured Plans</h3>
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          {isLoading ? (
            <InsurancePlansSkeleton />
          ) : (
            plans?.map(({ title, formId, fields }, index) => (
              <InsuranceCard
                key={formId}
                label={title}
                index={index + 1}
                onClick={() => {
                  console.log("fields ~> ", fields);
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export { InsurancePlans };
