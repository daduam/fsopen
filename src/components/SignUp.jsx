import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useHistory } from "react-router-native";
import * as yup from "yup";
import { CREATE_USER_MUTATION } from "../graphql/mutations";
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
  username: yup.string().min(1).max(30).required("username is required"),
  password: yup.string().min(5).max(30).required("password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "passwords do not match")
    .required("password confirmation is required"),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values, { setErrors }) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: { input: { username, password } },
      });
      await signIn({ username, password });
      history.push("/");
    } catch (err) {
      if (err.message.includes("Choose another username")) {
        setErrors({ username: "username already taken" });
      }
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordConfirmation: "",
      }}
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

          <FormikTextInput
            name="passwordConfirmation"
            placeholder="Confirm Password"
            secureTextEntry
          />

          <TouchableWithoutFeedback onPress={handleSubmit}>
            <View style={styles.btn}>
              <Text
                fontSize="subheading"
                fontWeight="bold"
                style={styles.btnTitle}
              >
                Sign up
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
