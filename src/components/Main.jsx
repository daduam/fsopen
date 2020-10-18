import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Rate Repository</Text>
    </View>
  );
};

export default Main;