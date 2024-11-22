import { ChangeEvent } from 'react';
import { TextInput } from 'react-native';

export default function ReportTextInput({
  reportValue,
  handleReportValue,
  placeholder = '',
}: {
  reportValue: string | null;
  handleReportValue: (e: ChangeEvent | any) => void;
  placeholder?: string;
}) {
  return (
    <>
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
