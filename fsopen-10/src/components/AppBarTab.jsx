import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: "white",
  },
});

const AppBarTab = ({ children, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Text fontSize="subheading" fontWeight="bold" style={styles.text}>
          {children}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AppBarTab;
