import { useField } from "formik";
import React from "react";
import { StyleSheet, TextInput } from "react-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  error: {
    marginTop: 5,
  },
  textInput: {
    borderColor: theme.colors.textSecondary,
    color: theme.colors.textSecondary,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: theme.fontSizes.subheading,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={hasError}
        style={styles.textInput}
        {...props}
      />
      {hasError && <Text style={styles.error}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
