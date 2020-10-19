import { Formik } from "formik";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  btnTitle: {
    color: "white",
    textAlign: "center",
    margin: 16,
  },
});

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />

          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />

          <TouchableWithoutFeedback onPress={handleSubmit}>
            <View style={styles.btn}>
              <Text
                fontSize="subheading"
                fontWeight="bold"
                style={styles.btnTitle}
              >
                Sign in
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
