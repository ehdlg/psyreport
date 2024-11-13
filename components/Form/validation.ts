import { type NewSelfReport } from '../../types';

export const validate = (values: NewSelfReport, step: number) => {
  const errors: any = {};

  switch (step) {
    case 0:
      if (!values.date) {
        errors.date = 'La fecha no puede estar vacía';
      }
      break;
    case 1:
      if (!values.antecedent) {
        errors.antecedent = 'La situación no puede estar vacía';
      }
      break;
    case 2:
      if (!values.event.text) {
        errors.event = 'Antes de continuar, describe el evento';
      }
      break;
    case 3:
      if (!values.thoughts) {
        errors.thoughts = 'Antes de continuar, describe los pensamientos del evento';
      }
      break;
  }

  return errors;
};
