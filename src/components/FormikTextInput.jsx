import { useField } from "formik";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
  errorInput: {
    borderColor: theme.colors.error,
    color: theme.colors.error,
  },
  textInput: {
    borderColor: theme.colors.textSecondary,
    color: theme.colors.textSecondary,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: theme.fontSizes.subheading,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={hasError}
        style={[styles.textInput, meta.error && styles.errorInput]}
        {...props}
      />
      {hasError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;
