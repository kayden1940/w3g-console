import useSWR from "swr";
import { useStoreProps } from "../hooks/store";


const useSites = () => {
  const { setSites } = useStoreProps(["setSites"]);
  // fetch site data and store them.
  const { data, error } = useSWR(
    `${process.env.REACT_APP_API_ROOT_URL}/sites`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  setSites(data);

  return {
    sitesData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useSites };
