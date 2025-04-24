type ValidationResultType<T> = {
  success: boolean;
  errors: T;
};

export default ValidationResultType;
