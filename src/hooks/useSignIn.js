import { useMutation } from "@apollo/react-hooks";

import { AUTHORIZE_MUTATION } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE_MUTATION);

  const signIn = async ({ username, password }) => {
    return await mutate({ variables: { username, password } });
  };

  return [signIn, result];
};

export default useSignIn;
