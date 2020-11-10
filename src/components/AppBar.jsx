import { useApolloClient, useQuery } from "@apollo/react-hooks";
import Constants from "expo-constants";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Link, useHistory } from "react-router-native";

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
  const history = useHistory();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab>Repositories</AppBarTab>
        </Link>

        {data?.authorizedUser ? (
          <>
            <Link to="/create-review">
              <AppBarTab>Create a review</AppBarTab>
            </Link>
            <AppBarTab onPress={signOut}>Sign out</AppBarTab>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <AppBarTab>Sign in</AppBarTab>
            </Link>
            <Link to="/sign-up">
              <AppBarTab>Sign up</AppBarTab>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
