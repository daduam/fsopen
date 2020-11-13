import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Alert, FlatList } from "react-native";
import { DELETE_REVIEW_MUTATION } from "../graphql/mutations";

import { AUTHORIZED_USER_QUERY } from "../graphql/queries";
import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";

const MyReviews = () => {
  const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION);
  const variables = {
    includeReviews: true,
    first: 20,
  };
  const { data, loading, fetchMore, refetch } = useQuery(
    AUTHORIZED_USER_QUERY,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  if (!data) {
    return null;
  }

  const handleDelete = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id } });
              await refetch(variables);
            } catch (err) {
              console.log(err);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

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
      renderItem={({ item }) => (
        <ReviewItem review={item} handleDelete={handleDelete} forUser />
      )}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviews;
