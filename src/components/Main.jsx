import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Route, Redirect } from "react-router-native";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import theme from "../theme";
import SignIn from "./SignIn";
import Repository from "./Repository";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBg,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/sign-in" exact>
          <SignIn />
        </Route>
        <Route path="/repository/:id">
          <Repository />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
