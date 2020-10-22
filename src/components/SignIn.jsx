import { Formik } from "formik";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import * as yup from "yup";

import useSignIn from "../hooks/useSignIn";
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

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
