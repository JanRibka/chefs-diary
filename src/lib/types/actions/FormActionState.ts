type FormActionState<State, Form extends object, Errors extends object> = {
  generalState?: State;
  form?: Form;
  errors?: Errors;
};

export default FormActionState;
