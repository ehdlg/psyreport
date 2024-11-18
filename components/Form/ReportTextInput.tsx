import { ChangeEvent } from 'react';
import { Text, TextInput } from 'react-native';

export default function ReportTextInput({
  reportValue,
  handleReportValue,
  title,
  placeholder = '',
}: {
  title: string;
  reportValue: string | null;
  handleReportValue: (e: ChangeEvent | any) => void;
  placeholder?: string;
}) {
  return (
    <>
      <Text className='text-xl text-center text-slate-700 dark:text-slate-300'>{title}</Text>
      <TextInput
        defaultValue={reportValue || ''}
        className='overflow-y-auto p-2 h-auto rounded border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 dark:placeholder:text-slate-400'
        placeholder={placeholder}
        onChangeText={handleReportValue}
        multiline
      />
    </>
  );
}
