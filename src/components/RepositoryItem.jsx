import React from "react";
import { Image, StyleSheet, View } from "react-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 16 
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 4
  },
  statsItem: {
    display: "flex",
    alignItems: "center"
  },
  blueTag: {
    color: "#fff",
    backgroundColor: theme.colors.primary,
    padding: 4,
    borderRadius: 4,
  },
  colMargin: {
    marginVertical: 4,
  }
});

const RepositoryItem = ({ item }) => {
  const prettyCount = (count) => {
    if (count >= 1000) {
      return `${(count/1000).toFixed(1)}k`;
    }
    return count;
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Image
          style={styles.avatar}
          source={{uri: item.ownerAvatarUrl}}
        />

        <View style={styles.flexColumn}>
          <Text fontWeight="bold" style={styles.colMargin}>{item.fullName}</Text>
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
    </View>
  );
};

export default RepositoryItem;