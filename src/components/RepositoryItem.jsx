import React from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 16,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 4,
  },
  statsItem: {
    display: "flex",
    alignItems: "center",
  },
  blueTag: {
    color: "#fff",
    backgroundColor: theme.colors.primary,
    padding: 4,
    borderRadius: 4,
  },
  colMargin: {
    marginVertical: 4,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginTop: 8,
  },
  btnTitle: {
    color: "white",
    textAlign: "center",
    margin: 16,
  },
});

const RepositoryItem = ({ item, ghUrl }) => {
  const prettyCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />

        <View style={styles.flexColumn}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            style={styles.colMargin}
          >
            {item.fullName}
          </Text>
          <Text style={styles.colMargin}>{item.description}</Text>
          <View style={[styles.flexRow, styles.colMargin]}>
            <Text style={styles.blueTag}>{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text fontWeight="bold">{prettyCount(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>

        <View style={styles.statsItem}>
          <Text fontWeight="bold">{prettyCount(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>

        <View style={styles.statsItem}>
          <Text fontWeight="bold">{prettyCount(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>

        <View style={styles.statsItem}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>

      {ghUrl && (
        <TouchableWithoutFeedback
          onPress={
            item.url ? () => WebBrowser.openBrowserAsync(item.url) : undefined
          }
        >
          <View style={styles.btn}>
            <Text
              fontSize="subheading"
              fontWeight="bold"
              style={styles.btnTitle}
            >
              Open in Github
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default RepositoryItem;
