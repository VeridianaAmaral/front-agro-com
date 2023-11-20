import * as Yup from "yup";

export const validacaoYup = (err) => {
  if (err instanceof Yup.ValidationError) {
    const errorMessages = {};
    err.inner.forEach((error) => {
      errorMessages[error.path] = error.message;
    });
    return errorMessages;
  }
  return err;
};
