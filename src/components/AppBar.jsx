import { useApolloClient, useQuery } from "@apollo/react-hooks";
import Constants from "expo-constants";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Link } from "react-router-native";

import { AUTHORIZED_USER_QUERY } from "../graphql/queries";
import AuthStorageContext from "../contexts/AuthStorageContext";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
});

const AppBar = () => {
  const { data } = useQuery(AUTHORIZED_USER_QUERY);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab>Repositories</AppBarTab>
        </Link>

        {data?.authorizedUser ? (
          <AppBarTab onPress={signOut}>Sign out</AppBarTab>
        ) : (
          <Link to="/sign-in">
            <AppBarTab>Sign in</AppBarTab>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
