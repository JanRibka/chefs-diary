type FormActionState<Form extends object, Errors extends object> = {
  form?: Form;
  errors?: Errors;
};

export default FormActionState;
