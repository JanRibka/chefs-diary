type ValidationResultType<T> = {
  success: boolean;
  error: T;
};

export default ValidationResultType;
