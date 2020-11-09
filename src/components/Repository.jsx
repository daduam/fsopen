import { useQuery } from "@apollo/react-hooks";
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
              {
                // use date-fns instead
                new Date(review.createdAt)
                  .toLocaleDateString()
                  .split("/")
                  .join(".")
              }
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
  const { data } = useQuery(REPOSITORY_QUERY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  if (!data) {
    return null;
  }

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
    />
  );
};

export default Repository;
