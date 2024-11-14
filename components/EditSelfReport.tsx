import { useCallback } from 'react';
import { router, useLocalSearchParams, Redirect } from 'expo-router';
import { Text } from 'react-native';
import Form from './Form';
import Toast from 'react-native-root-toast';
import useGetSelfReport from '../hooks/useGetSelfReport';
import { ROUTES } from '../constants';
import { editReport } from '../storage';
import { FormValues } from '../types';
import Loading from './Loading';

export default function EditSelfReport() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { report, isLoading, error } = useGetSelfReport(+id);
  const onSubmit = useCallback(
    async (values: FormValues) => {
      await editReport(+id, values);

      Toast.show('Autorregistro editado correctamente', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });

      router.navigate(ROUTES.REPORTS);
    },
    [id]
  );

  if (isLoading) return <Loading />;

  if (error) return <Text>{error}</Text>;

  if (null == report) return <Redirect href={ROUTES.HOME} />;

  return <Form formValues={report} onSubmit={onSubmit} />;
}
