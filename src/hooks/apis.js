import useSWR from "swr";
import { useStoreProps } from "../hooks/store";

const useSites = () => {
  const { setSites } = useStoreProps(["setSites"]);
  // fetch site data and store them.
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_API_ROOT_URL}/api/v1/sites`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  setSites(data?.data?.data);

  return {
    data: data?.data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

const useStats = () => {
  const { setStats } = useStoreProps(["setStats"]);
  // fetch site data and store them.
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_API_ROOT_URL}/api/v1/stats`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  setStats(data?.data);

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export { useSites, useStats };
