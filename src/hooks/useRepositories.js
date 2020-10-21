import { useQuery } from "@apollo/react-hooks";

import { REPOSITORIES_QUERY } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading } = useQuery(REPOSITORIES_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: data?.repositories,
    loading,
  };
};

export default useRepositories;
