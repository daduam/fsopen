import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Constants from "expo-constants";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  tab: {
    margin: 16,
    marginTop: 20
  },
  text: {
    color: "white"
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <TouchableWithoutFeedback >
          <Text
            fontSize="subheading"
            fontWeight="bold"
            style={styles.text}
          >
            Repositories
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default AppBar;