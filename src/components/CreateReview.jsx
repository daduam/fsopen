import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useHistory } from "react-router-native";
import * as yup from "yup";

import { CREATE_REVIEW_MUTATION } from "../graphql/mutations";
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
  ownerName: yup.string().required("repository owner name is required"),
  repositoryName: yup.string().required("repository name is required"),
  rating: yup
    .number()
    .typeError("rating must be an integer")
    .integer()
    .required()
    .min(0)
    .max(100),
  text: yup.string(),
});

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW_MUTATION);
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: {
          input: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      history.push(`/repository/${data.createReview.repositoryId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner name"
          />

          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
          />

          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
          />

          <FormikTextInput
            name="text"
            placeholder="Review"
            multiline
            numberOfLines={3}
            style={{ textAlignVertical: "top" }}
          />

          <TouchableWithoutFeedback onPress={handleSubmit}>
            <View style={styles.btn}>
              <Text
                fontSize="subheading"
                fontWeight="bold"
                style={styles.btnTitle}
              >
                Submit review
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;
