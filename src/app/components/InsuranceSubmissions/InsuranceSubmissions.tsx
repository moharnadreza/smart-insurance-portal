import { useInsuranceSubmissions } from "api/hooks/useInsuranceSubmissions";
import { Table } from "components";

const InsuranceSubmissions = () => {
  const { data: submissions, isLoading } = useInsuranceSubmissions();

  if (isLoading) return "loading...";

  return (
    <>
      <div className="mt-16 flex justify-center flex-col gap-4">
        <h3 className="m-0 text-3xl font-bold">Submissions</h3>
        <Table data={submissions?.data} columns={submissions?.columns} />
      </div>
    </>
  );
};

export { InsuranceSubmissions };
