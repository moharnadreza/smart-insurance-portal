import useSWR from "swr";
import { fetcher } from "utils";

type Schema = {
  country: string;
  states: Array<string>;
};

const useDynamicOptions = ({
  key,
  path,
  country,
}: {
  key: string | null;
  path: string | null;
  country: string;
}) => {
  const shouldFireEvent = path && country && country !== "";

  return useSWR<Schema>(
    shouldFireEvent ? key : null,
    () => fetcher.get(path!, { country }),
    {}
  );
};

export { useDynamicOptions };
