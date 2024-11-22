import { type NewSelfReport } from '../../types';

export const validate = (values: NewSelfReport, step: number) => {
  const errors: any = {};

  switch (step) {
    case 0:
      if (!values.date) {
        errors.date = 'Antes de continuar, establece la fecha y hora del evento';
      }
      break;

    case 1:
      if (!values.precedent.text && !values.precedent.audio) {
        errors.precedent = 'Antes de continuar, describe la situación precedente';
      }
      break;

    case 2:
      if (!values.event.text && !values.event.audio) {
        errors.event = 'Antes de continuar, describe el evento';
      }
      break;
  }

  return errors;
};
