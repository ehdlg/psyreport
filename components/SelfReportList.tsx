import { router } from 'expo-router';
import useGetSelfReports from '../hooks/useGetSelfReports';
import { Text, View, FlatList } from 'react-native';
import SelfReportCard from './SelfReportCard';
import Button from './elements/Button';
import EmptyFolder from './icons/EmptyFolder';
import { ROUTES } from '../constants';
import { deleteReport } from '../storage';
import { useCallback } from 'react';
import Toast, { ToastOptions } from 'react-native-root-toast';

const Empty = () => {
  const handleRedirect = () => {
    router.navigate(ROUTES.NEW);
  };

  return (
    <View className='gap-y-2 mx-auto mt-24'>
      <View className='mx-auto'>
        <EmptyFolder width={120} height={120} />
      </View>
      <Text className='text-2xl font-bold text-center text-neutral-700 text-pretty'>
        Tu lista de autorregistros está vacía
      </Text>
      <Text className='text-lg text-center text-neutral-500'>
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
      let toastOptions: ToastOptions = {
        duration: Toast.durations.SHORT,
        animation: true,
        position: Toast.positions.BOTTOM,
      };
      try {
        await deleteReport(id);

        await refreshSelfReports();

        toastMessage = 'Autorregistro borrado';
      } catch (error) {
        toastMessage =
          error instanceof Error
            ? error.message
            : 'Hubo un error al intentar borrar el autorregistro';

        toastOptions = {
          ...toastOptions,
          duration: Toast.durations.SHORT,
          backgroundColor: '#fecaca',
          textColor: '#ef4444',
          animation: true,
        };
      } finally {
        Toast.show(toastMessage, toastOptions);
      }
    },
    [refreshSelfReports]
  );

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>{error}</Text>;

  if (selfReports.length === 0) return <SelfReportList.Emtpy />;

  return (
    <View>
      <Text className='mb-4 text-2xl font-bold text-neutral-600'>Tus autorregistros</Text>
      <FlatList
        data={selfReports}
        renderItem={({ item }) => (
          <SelfReportCard report={item} key={item.id} handleDelete={handleDelete} />
        )}
      />
    </View>
  );
}
