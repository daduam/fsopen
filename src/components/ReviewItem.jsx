import { format } from "date-fns";
import React from "react";
import { StyleSheet, View } from "react-native";

import theme from "../theme";
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

export default ReviewItem;
