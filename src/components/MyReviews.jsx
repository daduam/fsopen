import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { FlatList } from "react-native";

import { AUTHORIZED_USER_QUERY } from "../graphql/queries";
import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";

const MyReviews = () => {
  const variables = {
    includeReviews: true,
    first: 20,
  };
  const { data, loading, fetchMore } = useQuery(AUTHORIZED_USER_QUERY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  if (!data) {
    return null;
  }

  const onEndReach = () => {
    const canFetchMore =
      !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: AUTHORIZED_USER_QUERY,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        return {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousQueryResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],
            },
          },
        };
      },
    });
  };

  const reviews = data.authorizedUser
    ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
    />
  );
};

export default MyReviews;
