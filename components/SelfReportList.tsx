import { router } from 'expo-router';
import useGetSelfReports from '../hooks/useGetSelfReports';
import { Text, View, ScrollView } from 'react-native';
import SelfReportCard from './SelfReportCard';
import Button from './elements/Button';
import GeneratePDF from './GeneratePDF';
import EmptyFolder from './icons/EmptyFolder';
import { ROUTES } from '../constants';
import { deleteReport } from '../storage';
import { useCallback } from 'react';
import Loading from './Loading';
import { showToast } from '../utils';
import { ToastType } from '../types';

const Empty = () => {
  const handleRedirect = () => {
    router.navigate(ROUTES.NEW);
  };

  return (
    <View className='gap-y-2 mx-auto mt-24'>
      <View className='mx-auto'>
        <EmptyFolder width={120} height={120} />
      </View>
      <Text className='text-2xl font-bold text-center text-slate-700 dark:text-slate-300 text-pretty'>
        Tu lista de autorregistros está vacía
      </Text>
      <Text className='text-lg text-center text-slate-500 dark:text-slate-400'>
        Crea un nuevo autorregistro y aparecerá aqui
      </Text>
      <View className='mx-auto mt-6 w-1/2'>
        <Button type='primary' title='Crear autorregistro' onPress={handleRedirect} />
      </View>
    </View>
  );
};

SelfReportList.Emtpy = Empty;

export default function SelfReportList() {
  const { selfReports, error, isLoading, refreshSelfReports } = useGetSelfReports();

  const handleDelete = useCallback(
    async (id: number) => {
      let toastMessage: string = '';
      let toastOptions: ToastType = 'info';
      try {
        await deleteReport(id);

        await refreshSelfReports();

        toastMessage = 'Autorregistro borrado';
      } catch (error) {
        toastMessage =
          error instanceof Error
            ? error.message
            : 'Hubo un error al intentar borrar el autorregistro';

        toastOptions = 'error';
      } finally {
        showToast({ message: toastMessage, type: toastOptions });
      }
    },
    [refreshSelfReports]
  );

  const handleEdit = useCallback((id: number) => {
    router.navigate(`${ROUTES.REPORTS}/${id}`);
  }, []);

  if (isLoading) return <Loading />;

  if (error) return <Text>{error}</Text>;

  if (selfReports.length === 0) return <SelfReportList.Emtpy />;

  return (
    <View>
      <View className='flex-row justify-between items-start'>
        <Text className='mb-4 text-2xl font-bold text-slate-800 dark:text-slate-200'>
          Tus autorregistros
        </Text>
        <GeneratePDF selfReports={selfReports} />
      </View>

      <ScrollView>
        {selfReports.map((selfReport) => {
          return (
            <SelfReportCard
              report={selfReport}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              key={selfReport.id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
