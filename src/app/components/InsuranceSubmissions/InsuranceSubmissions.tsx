import { useInsuranceSubmissions } from "api";
import { Table } from "components";
import { InsurancePlansSkeleton } from "./InsuranceSubmissionsSkeleton";

const InsuranceSubmissions = () => {
  const { data: submissions, isLoading } = useInsuranceSubmissions();

  return (
    <>
      <div className="mt-6 md:mt-16 flex justify-center flex-col gap-4">
        <h3 className="m-0 text-lg md:text-3xl font-bold">Submissions</h3>
        {isLoading ? (
          <InsurancePlansSkeleton />
        ) : (
          <Table data={submissions?.data} columns={submissions?.columns} />
        )}
      </div>
    </>
  );
};

export { InsuranceSubmissions };
