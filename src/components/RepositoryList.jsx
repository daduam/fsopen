import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { useHistory } from "react-router-native";
import { useDebounce } from "use-debounce/lib";

import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
});

const RepositoryListHeader = ({ handleSelect, handleSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedValue] = useDebounce(searchKeyword, 500);

  useEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={styles.header}>
      <Searchbar
        placeholder="Search"
        value={searchKeyword}
        onChangeText={(query) => setSearchKeyword(query)}
      />
      <RNPickerSelect
        onValueChange={(value) => handleSelect(value)}
        items={[
          {
            label: "Latest repositories",
            value: {
              orderBy: "CREATED_AT",
              orderDirection: undefined,
            },
          },
          {
            label: "Highest rated repositories",
            value: {
              orderBy: "RATING_AVERAGE",
              orderDirection: "DESC",
            },
          },
          {
            label: "Lowest rated repositories",
            value: {
              orderBy: "RATING_AVERAGE",
              orderDirection: "ASC",
            },
          },
        ]}
      />
    </View>
  );
};

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader
        handleSelect={props.handleSelect}
        handleSearch={props.handleSearch}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => this.props.handlePress(item.id)}>
            <RepositoryItem key={index} item={item} />
          </TouchableOpacity>
        )}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const history = useHistory();
  const [variables, setVariables] = React.useState(null);
  const { repositories } = useRepositories(variables);

  const onPress = (id) => {
    history.push(`repository/${id}`);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <RepositoryListContainer
      handlePress={onPress}
      repositories={repositoryNodes}
      handleSelect={(values) => setVariables({ ...variables, ...values })}
      handleSearch={(searchKeyword) => setVariables({ searchKeyword })}
    />
  );
};

export default RepositoryList;
