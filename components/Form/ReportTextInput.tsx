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
      <Text className='text-xl text-center text-neutral-600'>{title}</Text>
      <TextInput
        defaultValue={reportValue || ''}
        className='overflow-y-auto p-2 h-auto rounded border border-neutral-200 text-neutral-800'
        placeholder={placeholder}
        onChangeText={handleReportValue}
        multiline
      />
    </>
  );
}
