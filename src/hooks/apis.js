import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useSites = (id) => {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_API_ROOT_URL}/sites`,
    fetcher
  );

  return {
    sitesData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useSites };
