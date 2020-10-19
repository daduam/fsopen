import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Constants from "expo-constants";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  tab: {
    margin: 24,
  },
  text: {
    color: "white",
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
      <TouchableWithoutFeedback >
        <Text style={styles.text}>Repositories</Text>
      </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default AppBar;