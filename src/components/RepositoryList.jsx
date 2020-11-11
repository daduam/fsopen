import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import PickerSelect from "react-native-picker-select";
import { useHistory } from "react-router-native";

import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";

const Dropdown = ({ handleSelect, selectValue }) => {
  return (
    <PickerSelect
      onValueChange={(value) => handleSelect(value)}
      value={selectValue}
      style={{ viewContainer: { paddingHorizontal: 8 } }}
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
  );
};

const RepositoryList = () => {
  const history = useHistory();
  const [variables, setVariables] = React.useState(null);
  const [selectValue, setSelectValue] = React.useState(null);
  const { repositories } = useRepositories(variables);

  const onPress = (id) => {
    history.push(`/repository/${id}`);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => onPress(item.id)}>
          <RepositoryItem key={index} item={item} />
        </TouchableOpacity>
      )}
      ListHeaderComponent={() => (
        <Dropdown
          handleSelect={(values) => {
            setVariables({ ...variables, ...values });
            setSelectValue(values);
          }}
          selectValue={selectValue}
        />
      )}
    />
  );
};

export default RepositoryList;
