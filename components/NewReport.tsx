import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { FormikErrors, useFormik } from 'formik';
import { Text, View } from 'react-native';
import Button from './elements/Button';
import { CURRENT_DATETIME } from '../constants';
import { SelfReport } from '../types';
import { formatDateWithTime } from '../utils';

const DateTime = ({
  formikDate,
  setFieldValue,
}: {
  formikDate: Date;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<SelfReport>>;
}) => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const showMode = (mode: 'date' | 'time') => {
    setShowDate(true);
    setMode(mode);
  };
  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
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
};

const Control = ({
  step,
  formControl,
  stepLimits,
}: {
  step: number;
  formControl: { next: () => void; back: () => void };
  stepLimits: { MIN: number; MAX: number };
}) => {
  return (
    <View className='flex-row justify-around p-4 rounded-b-xl bg-neutral-50'>
      {step > stepLimits.MIN && (
        <Button type='secondary' title='Anterior' onPress={formControl.back} />
      )}
      {step === stepLimits.MAX ? (
        <Button type='primary' title='Fin' onPress={() => alert('fin')} />
      ) : (
        <Button type='secondary' title='Siguiente' onPress={formControl.next} />
      )}
    </View>
  );
};

NewReport.DateTime = DateTime;
NewReport.Control = Control;

export default function NewReport() {
  const formik = useFormik<SelfReport>({
    initialValues: {
      date: CURRENT_DATETIME,
      antecedent: '',
      event: {
        feeling: 5,
        text: '',
      },
      reflections: {
        feeling: 5,
        text: '',
      },
      thoughts: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
  const formControl = {
    next: () => updateStep(step + 1),
    back: () => updateStep(step - 1),
    end: () => alert(formik.values),
  };
  // TODO: Modify these values so they are not 'magic numbers' using formOrder length
  const stepLimits = {
    MIN: 0,
    MAX: 3,
  };

  const [step, setStep] = useState<number>(0);
  const formOrder = [
    <NewReport.DateTime formikDate={formik.values.date} setFieldValue={formik.setFieldValue} />,
  ];

  const updateStep = (newStep: number) => {
    if (newStep > stepLimits.MAX || newStep < stepLimits.MIN) return;

    setStep(newStep);
  };

  return (
    <>
      <View className='gap-y-6 pt-6 w-full rounded-xl border drop-shadow-xl border-neutral-200'>
        {/* TODO: add progress bar */}
        {formOrder[step]}
        <NewReport.Control formControl={formControl} step={step} stepLimits={stepLimits} />
      </View>
    </>
  );
}
