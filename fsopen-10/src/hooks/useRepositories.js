import { useQuery } from "@apollo/react-hooks";

import { REPOSITORIES_QUERY } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(
    REPOSITORIES_QUERY,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: REPOSITORIES_QUERY,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousQueryResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
