import { useQuery } from "@apollo/react-hooks";

import { REPOSITORIES_QUERY } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading } = useQuery(REPOSITORIES_QUERY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  return {
    repositories: data?.repositories,
    loading,
  };
};

export default useRepositories;
