import { ChangeEvent, PropsWithChildren, useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFormik } from 'formik';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import Button from './elements/Button';
import { CURRENT_DATETIME, FEELING_LIMITS } from '../constants';
import { NewSelfReport } from '../types';
import { formatDateWithTime } from '../utils';

const ReportTextInput = ({
  reportValue,
  handleReportValue,
  title,
  placeholder = '',
}: {
  title: string;
  reportValue: string | null;
  handleReportValue: (e: ChangeEvent | any) => void;
  placeholder?: string;
}) => {
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
};

const ReportFeelingInput = ({
  updateFeeling,
  feelingValue,
}: {
  updateFeeling: (newValue: number) => () => void;
  feelingValue: number;
}) => {
  return (
    <View className='gap-y-2 mt-8'>
      <Text className='text-center text-neutral-500'>¿Cómo te sentiste en ese momento?</Text>
      {/* TODO: use + and - svg instead */}
      <View className='flex-row gap-x-6 justify-center'>
        <TouchableOpacity onPress={updateFeeling(feelingValue - 1)}>
          <Text className='text-xl text-neutral-700'>-</Text>
        </TouchableOpacity>
        <Text className='text-2xl text-neutral-700'>{feelingValue}</Text>
        <TouchableOpacity onPress={updateFeeling(feelingValue + 1)}>
          <Text className='text-xl text-neutral-700'>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const QuestionWrapper = ({ children }: PropsWithChildren) => {
  return <View className='gap-y-4 p-4'>{children}</View>;
};

const DateTime = ({
  formikDate,
  setFieldValue,
}: {
  formikDate: Date;
  setFieldValue: (field: string, value: any) => void;
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

const Antecedent = ({
  antecedentValue,
  handleAntecedent,
}: {
  antecedentValue: string;
  handleAntecedent: (e: ChangeEvent | any) => void;
}) => {
  return (
    <QuestionWrapper>
      <ReportTextInput
        handleReportValue={handleAntecedent}
        placeholder='Dónde estabas, con quién...'
        reportValue={antecedentValue}
        title='Antecedente'
      />
    </QuestionWrapper>
  );
};

const Event = ({
  event,
  handleEventText,
  updateFeeling,
}: {
  event: NewSelfReport['event'];
  handleEventText: (e: ChangeEvent | any) => void;
  updateReportField: (field: string, value: string | number) => void;
  updateFeeling: (newValue: number) => () => void;
}) => {
  return (
    <QuestionWrapper>
      <ReportTextInput
        handleReportValue={handleEventText}
        reportValue={event.text}
        title='Evento'
        placeholder='Detalla lo que ocurrió'
      />
      <View className='gap-y-2 mt-8'>
        <ReportFeelingInput feelingValue={event.feeling} updateFeeling={updateFeeling} />
      </View>
    </QuestionWrapper>
  );
};

const Thought = ({
  thoughtValue,
  handleThought,
}: {
  thoughtValue: string;
  handleThought: (e: ChangeEvent | any) => void;
}) => {
  return (
    <QuestionWrapper>
      <ReportTextInput
        title='Pensamiento'
        handleReportValue={handleThought}
        reportValue={thoughtValue}
        placeholder='Qué pensaste de la situación pasado un tiempo'
      />
    </QuestionWrapper>
  );
};

NewReport.DateTime = DateTime;
NewReport.Control = Control;
NewReport.Antedecent = Antecedent;
NewReport.Event = Event;
NewReport.Thought = Thought;

export default function NewReport() {
  const formik = useFormik<NewSelfReport>({
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
  const updateReportField = (field: string, value: string | number) => {
    formik.setFieldValue(field, value);
  };

  const updateFeeling = (field: 'event.feeling' | 'reflections.feeling') => {
    return function (newValue: number) {
      return function () {
        const newFeelingValue = Number(newValue);

        if (
          isNaN(newFeelingValue) ||
          newFeelingValue > FEELING_LIMITS.MAX ||
          newFeelingValue < FEELING_LIMITS.MIN
        )
          return;

        updateReportField(field, newFeelingValue);
      };
    };
  };

  const [step, setStep] = useState<number>(0);
  const formOrder = [
    <NewReport.DateTime formikDate={formik.values.date} setFieldValue={updateReportField} />,
    <NewReport.Antedecent
      antecedentValue={formik.values.antecedent}
      handleAntecedent={formik.handleChange('antecedent')}
    />,
    <NewReport.Event
      handleEventText={formik.handleChange('event.text')}
      event={formik.values.event}
      updateReportField={updateReportField}
      updateFeeling={updateFeeling('event.feeling')}
    />,
    <NewReport.Thought
      handleThought={formik.handleChange('thought')}
      thoughtValue={formik.values.thoughts}
    />,
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
