import { useQuery } from "@apollo/react-hooks";
import { format } from "date-fns";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";

import { REPOSITORY_QUERY } from "../graphql/queries";
import theme from "../theme";
import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    flex: 1,
  },
  rating: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 25,
    borderColor: theme.colors.primary,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    color: theme.colors.primary,
  },
  usernameDate: {
    marginBottom: 4,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.rating}>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            style={styles.ratingText}
          >
            {review.rating}
          </Text>
        </View>

        <View style={styles.flexColumn}>
          <View style={styles.usernameDate}>
            <Text fontSize="subheading" fontWeight="bold">
              {review.user.username}
            </Text>
            <Text color="textSecondary" style={styles.colMargin}>
              {format(new Date(review.createdAt), "dd.MM.yyyy")}
            </Text>
          </View>

          <View>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

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
