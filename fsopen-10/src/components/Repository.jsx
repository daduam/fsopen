import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { FlatList } from "react-native";
import { useParams } from "react-router-native";

import { REPOSITORY_QUERY } from "../graphql/queries";
import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";

const Repository = () => {
  let { id } = useParams();
  const variables = { id, first: 20 };
  const { data, loading, fetchMore } = useQuery(REPOSITORY_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  if (!data) {
    return null;
  }

  const onEndReach = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: REPOSITORY_QUERY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        return {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousQueryResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
      },
    });
  };

  const repository = data.repository;

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryItem item={repository} ghUrl />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Repository;
