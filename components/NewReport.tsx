import { ChangeEvent, PropsWithChildren, useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFormik } from 'formik';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';
import { saveReport } from '../storage/index';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import Button from './elements/Button';
import {
  CURRENT_DATETIME,
  DEFAULT_FEELING_VALUE,
  DEFAULT_REPORT_VALUES,
  FEELING_LIMITS,
} from '../constants';
import { NewSelfReport, StepIndicatorStatus } from '../types';
import { formatDateWithTime } from '../utils';
import StepIndicator from './elements/StepIndicator';

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
};

const ProgressBar = ({
  currentStep,
  numberOfSteps: stepNumber,
}: {
  currentStep: number;
  numberOfSteps: number;
}) => {
  const steps = Array.from({ length: stepNumber }, (_, index) => index);
  return (
    <View className='flex-row gap-x-4 mx-auto w-10/12'>
      {steps.map((step) => {
        const status: StepIndicatorStatus =
          step === currentStep ? 'current' : step > currentStep ? 'todo' : 'done';

        return <StepIndicator key={step} status={status} />;
      })}
    </View>
  );
};

const Control = ({
  step,
  formControl,
  stepLimits,
  onSubmit,
}: {
  step: number;
  formControl: { next: () => Promise<void>; prev: () => void };
  stepLimits: { MIN: number; MAX: number };
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <View className='flex-row justify-around p-4 rounded-b-xl bg-neutral-50'>
      {step > stepLimits.MIN && (
        <Button type='secondary' title='Anterior' onPress={formControl.prev} />
      )}
      {step === stepLimits.MAX ? (
        <Button type='primary' title='Enviar' onPress={onSubmit} />
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
        placeholder='Dónde estabas, qué hacías, con quién...'
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
      <View className='gap-y-2'>
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

const Reflection = ({
  handleReflectionText,
  reflection,
  updateFeeling,
}: {
  handleReflectionText: (e: ChangeEvent | any) => void;
  reflection: NewSelfReport['reflections'];
  updateFeeling: (newValue: number) => () => void;
}) => {
  return (
    <QuestionWrapper>
      <ReportTextInput
        title='Reflexiones'
        handleReportValue={handleReflectionText}
        reportValue={reflection.text}
        placeholder='Qué pensaste, cómo viste la situación al cabo de un tiempo'
      />

      <ReportFeelingInput
        feelingValue={reflection.feeling || DEFAULT_FEELING_VALUE}
        updateFeeling={updateFeeling}
      />
    </QuestionWrapper>
  );
};

NewReport.ProgressBar = ProgressBar;
NewReport.DateTime = DateTime;
NewReport.Control = Control;
NewReport.Antedecent = Antecedent;
NewReport.Event = Event;
NewReport.Thought = Thought;
NewReport.Reflection = Reflection;

export default function NewReport() {
  const [step, setStep] = useState<number>(0);
  const onSubmit = async (values: NewSelfReport) => {
    try {
      await saveReport(values);

      Toast.show('¡Autorregistro completado!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    } catch (_error) {
      Toast.show('Hubo un error al intentar guardar el autorregistro ', {
        duration: Toast.durations.LONG,
      });
    } finally {
      setTimeout(router.navigate, 50, '/');
    }
  };

  const validate = (values: NewSelfReport) => {
    const errors: any = {};

    switch (step) {
      case 0:
        if (!values.date) {
          errors.date = 'La fecha no puede estar vacía';
        }
        break;
      case 1:
        if (!values.antecedent) {
          errors.antecedent = 'La situación no puede estar vacía';
        }
        break;
      case 2:
        if (!values.event.text) {
          errors.event = 'Antes de continuar, describe el evento';
        }
        break;
      case 3:
        if (!values.thoughts) {
          errors.thoughts = 'Antes de continuar, describe los pensamientos del evento';
        }
        break;
    }

    return errors;
  };

  const formik = useFormik<NewSelfReport>({
    initialValues: DEFAULT_REPORT_VALUES,
    onSubmit,
    validate,
  });
  const formControl = {
    next: async () => {
      const errors = await formik.validateForm();

      if (Object.keys(errors).length !== 0) return;

      updateStep(step + 1);
    },
    prev: () => {
      formik.setErrors({});
      
      updateStep(step - 1);
    },
    end: () => alert(formik.values),
  };

  // TODO: Modify these values so they are not 'magic numbers' using formOrder length
  const stepLimits = {
    MIN: 0,
    MAX: 4,
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
      handleThought={formik.handleChange('thoughts')}
      thoughtValue={formik.values.thoughts}
    />,
    <NewReport.Reflection
      handleReflectionText={formik.handleChange('reflections.text')}
      reflection={formik.values.reflections}
      updateFeeling={updateFeeling('reflections.feeling')}
    />,
  ];

  const updateStep = (newStep: number) => {
    if (newStep > stepLimits.MAX || newStep < stepLimits.MIN) return;

    setStep(newStep);
  };

  const invalidForm = Object.keys(formik.errors).length !== 0;

  return (
    <View className='gap-y-4 pt-6 w-full rounded-xl border drop-shadow-xl justify-betweeen border-neutral-200'>
      <NewReport.ProgressBar currentStep={step} numberOfSteps={formOrder.length} />
      {formOrder[step]}
      {/* Create and implement errors component to display errors */}
      {invalidForm && <Text>Hay errorres</Text>}
      <NewReport.Control
        formControl={formControl}
        step={step}
        stepLimits={stepLimits}
        onSubmit={formik.handleSubmit}
      />
    </View>
  );
}
