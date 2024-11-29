import Form from './Form';
import { saveReport } from '../storage';
import { type NewSelfReport } from '../types';
import { router } from 'expo-router';
import { DEFAULT_SELF_REPORT_VALUES, ROUTES } from '../constants';
import { showToast } from '../utils';

export default function CreateSelfReport() {
  const onSubmit = async (values: NewSelfReport) => {
    try {
      await saveReport(values);

      showToast({ message: '¡Autorregistro completado!', type: 'success' });
    } catch (_error) {
      showToast({ message: 'Hubo un error al intentar guardr el autorregisto', type: 'error' });
    } finally {
      setTimeout(router.navigate, 50, ROUTES.HOME);
    }
  };
  return <Form onSubmit={onSubmit} formValues={DEFAULT_SELF_REPORT_VALUES} />;
}
