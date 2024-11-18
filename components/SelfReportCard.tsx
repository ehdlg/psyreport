import { useCallback, useState } from 'react';
import AngleDown from './icons/AngleDown';
import Trash from './icons/Trash';
import Edit from './icons/Edit';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SelfReport } from '../types';
import { formatDateWithTime } from '../utils';
import { SELF_REPORT_QUESTIONS } from '../constants';
import { useColorScheme } from 'nativewind';

const QuestionAnswer = ({
  question,
  answer,
  discomfort = null,
}: {
  question: string;
  answer: string;
  discomfort?: number | null;
}) => {
  return (
    <View>
      <Text className='mb-1 font-bold text-slate-700 dark:text-slate-200'>{question}</Text>
      {discomfort && (
        <Text className='text-slate-600 dark:text-slate-300'>Malestar: {discomfort}</Text>
      )}
      <Text className='leading-normal text-slate-700 dark:text-slate-300 text-pretty'>
        {answer}
      </Text>
    </View>
  );
};

export default function SelfReportCard({
  report,
  handleDelete,
  handleEdit,
}: {
  report: SelfReport;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}) {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = useCallback(() => {
    setShow(!show);
  }, [show]);

  const reportDate = new Date(report.date);
  const { colorScheme } = useColorScheme();
  const darkMode = colorScheme === 'dark';

  return (
    <TouchableOpacity
      className='gap-x-8 items-center p-4 my-2 rounded-xl border border-slate-200 dark:bg-slate-800 dark:border-slate-700'
      onPress={handleShow}
    >
      <View className='flex-row justify-between items-center mb-2 w-full'>
        <Text className='text-lg text-slate-700 dark:text-slate-300'>
          {formatDateWithTime(reportDate)}
        </Text>
        <View className='flex-row gap-x-4 items-center'>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('¿Quieres borrar el autorregistro?', 'Los cambios son irreversibles', [
                {
                  style: 'cancel',
                  text: 'Cancelar',
                },
                {
                  style: 'destructive',
                  onPress: () => handleDelete(report.id),
                  text: 'Confirmar',
                },
              ]);
            }}
            className='p-1 rounded border border-slate-200 dark:border-slate-700'
          >
            <Trash width={16} height={16} stroke='#ef4444' />
          </TouchableOpacity>
          <TouchableOpacity
            className='items-center p-1 rounded border border-slate-200 dark:border-slate-700'
            onPress={() => handleEdit(report.id)}
          >
            <Edit width={16} height={16} stroke={darkMode ? '#e0e7ff' : '#525252'} />
          </TouchableOpacity>
          <View className={`transition ease-in duration-250 ${show ? 'rotate-0' : 'rotate-180'}`}>
            <AngleDown fill='#818cf8' height={16} width={16} />
          </View>
        </View>
      </View>
      <View
        className={`p-4 border-t border-slate-300 dark:border-slate-600 gap-y-4 w-full ${
          show ? 'block' : 'hidden'
        }`}
      >
        <QuestionAnswer question={SELF_REPORT_QUESTIONS.precedent} answer={report.precedent} />
        <QuestionAnswer
          question={SELF_REPORT_QUESTIONS.event}
          answer={report.event.text}
          discomfort={report.event.discomfort}
        />
        <QuestionAnswer question={SELF_REPORT_QUESTIONS.thoughts} answer={report.thoughts} />
        {report.reflections.text && (
          <QuestionAnswer
            question={SELF_REPORT_QUESTIONS.reflections}
            answer={report.reflections.text}
            discomfort={report.reflections.discomfort}
          />
        )}
        {report.otherActions && (
          <QuestionAnswer
            question={SELF_REPORT_QUESTIONS.otherActions}
            answer={report.otherActions}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
