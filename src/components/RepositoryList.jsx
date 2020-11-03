import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useHistory } from "react-router-native";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onPress = (id) => {
    history.push(`/repository/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => onPress(item.id)}>
          <RepositoryItem key={index} item={item} />
        </TouchableOpacity>
      )}
    />
  );
};

export default RepositoryList;
