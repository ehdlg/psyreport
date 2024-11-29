import { useCallback } from 'react';
import { router, useLocalSearchParams, Redirect } from 'expo-router';
import { Text } from 'react-native';
import Form from './Form';
import Loading from './Loading';
import useGetSelfReport from '../hooks/useGetSelfReport';
import { ROUTES } from '../constants';
import { editReport } from '../storage';
import { FormValues } from '../types';
import { getEditStep, showToast } from '../utils';

export default function EditSelfReport() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { report, isLoading, error } = useGetSelfReport(+id);
  const onSubmit = useCallback(
    async (values: FormValues) => {
      await editReport(+id, values);

      showToast({ message: 'Autorregistro editado correctamente', type: 'success' });

      router.navigate(ROUTES.REPORTS);
    },
    [id]
  );

  if (isLoading) return <Loading />;

  if (error) return <Text>{error}</Text>;

  if (null == report) return <Redirect href={ROUTES.HOME} />;

  const initialStep = getEditStep(report);

  return <Form formValues={report} onSubmit={onSubmit} initialStep={initialStep} />;
}
