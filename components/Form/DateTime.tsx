import { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../elements/Button';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { formatDateWithTime } from '../../utils';
import { CURRENT_DATETIME } from '../../constants';

export default function DateTime({
  formikDate,
  setFieldValue,
}: {
  formikDate: Date;
  setFieldValue: (field: string, value: any) => void;
}) {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const showMode = (mode: 'date' | 'time') => {
    setShowDate(true);
    setMode(mode);
  };
  const onDateChange = (_event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (null == selectedDate) return;

    const currentDate = formikDate;

    if (mode === 'time') {
      currentDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
    } else {
      currentDate.setFullYear(selectedDate.getFullYear());
      currentDate.setMonth(selectedDate.getMonth());
      currentDate.setDate(selectedDate.getDate());
    }

    setShowDate(false);
    setFieldValue('date', currentDate);
  };
  return (
    <>
      <Text className='text-xl text-center text-neutral-500'>¿Cuándo ocurrió?</Text>
      <View className='flex flew-row'>
        <View className='flex-row justify-around'>
          <Button type='tertiary' title='Establecer el día' onPress={() => showMode('date')} />
          <Button type='tertiary' title='Establecer la hora' onPress={() => showMode('time')} />
        </View>
        {showDate && (
          <DateTimePicker
            value={formikDate}
            mode={mode}
            onChange={onDateChange}
            maximumDate={CURRENT_DATETIME}
          />
        )}
        <Text className='my-4 text-lg text-center text-neutral-500'>
          {formatDateWithTime(formikDate)}
        </Text>
      </View>
    </>
  );
}