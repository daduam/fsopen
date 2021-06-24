const assertNever = (value: never | unknown): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default assertNever;