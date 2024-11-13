import Form from './Form';
import { saveReport } from '../storage';
import Toast from 'react-native-root-toast';
import { type NewSelfReport } from '../types';
import { router } from 'expo-router';
import { DEFAULT_SELF_REPORT_VALUES, ROUTES } from '../constants';

export default function CreateSelfReport() {
  const onSubmit = async (values: NewSelfReport) => {
    try {
      await saveReport(values);

      Toast.show('¡Autorregistro completado!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    } catch (_error) {
      Toast.show('Hubo un error al intentar guardar el autorregistro ', {
        duration: Toast.durations.LONG,
      });
    } finally {
      setTimeout(router.navigate, 50, ROUTES.HOME);
    }
  };
  return <Form onSubmit={onSubmit} formValues={DEFAULT_SELF_REPORT_VALUES} />;
}
