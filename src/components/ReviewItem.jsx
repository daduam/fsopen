import { format } from "date-fns";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useHistory } from "react-router-native";

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
  btnGroup: {
    justifyContent: "space-between",
    marginTop: 16,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    width: "48%",
  },
  btnTitle: {
    color: "white",
    textAlign: "center",
    margin: 16,
  },
  redBtn: {
    backgroundColor: theme.colors.error,
  },
});

const ReviewItem = ({ review, forUser, handleDelete }) => {
  const history = useHistory();
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
              {forUser ? review.repository.fullName : review.user.username}
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

      {forUser && (
        <View style={[styles.flexRow, styles.btnGroup]}>
          <TouchableWithoutFeedback
            onPress={() => history.push(`repository/${review.repository.id}`)}
          >
            <View style={styles.btn}>
              <Text
                fontSize="subheading"
                fontWeight="bold"
                style={styles.btnTitle}
              >
                View repository
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => handleDelete(review.id)}>
            <View style={[styles.btn, styles.redBtn]}>
              <Text
                fontSize="subheading"
                fontWeight="bold"
                style={styles.btnTitle}
              >
                Delete review
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
