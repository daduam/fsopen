import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { View } from "react-native";
import { useParams } from "react-router-native";

import { REPOSITORY_QUERY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";

const Repository = () => {
  let { id } = useParams();
  const { data } = useQuery(REPOSITORY_QUERY, { variables: { id } });

  if (!data) {
    return null;
  }

  return (
    <View>
      <RepositoryItem item={data.repository} ghUrl />
    </View>
  );
};

export default Repository;
