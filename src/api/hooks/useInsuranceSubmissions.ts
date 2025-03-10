import useSWR from "swr";
import { fetcher } from "utils";

type Schema = {
  columns: Array<string>;
  data: Array<Record<string, string>>;
};

const useInsuranceSubmissions = () =>
  useSWR<Schema>("/api/insurance/forms/submissions", fetcher.get);

export { useInsuranceSubmissions };
