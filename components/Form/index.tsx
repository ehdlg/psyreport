import { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';
import { saveReport } from '../../storage/index';
import { View } from 'react-native';
import ReportTextInput from './ReportTextInput';
import ReportFeelingInput from './ReportFeelingInput';
import QuestionWrapper from './QuestionWrapper';
import DateTime from './DateTime';
import Control from './Control';
import ProgressBar from './ProgressBar';
import { DEFAULT_FEELING_VALUE, DEFAULT_REPORT_VALUES, FEELING_LIMITS } from '../../constants';
import { NewSelfReport } from '../../types';

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

Form.ProgressBar = ProgressBar;
Form.DateTime = DateTime;
Form.Control = Control;
Form.Antedecent = Antecedent;
Form.Event = Event;
Form.Thought = Thought;
Form.Reflection = Reflection;

export default function Form() {
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
    end: () => formik.handleSubmit(),
  };
  const invalidForm = Object.keys(formik.errors).length !== 0;
  const showErrors = () => {
    Object.values(formik.errors).map((error) => {
      const errorMessage = typeof error === 'string' ? error : String(error);

      Toast.show(errorMessage, {
        duration: Toast.durations.SHORT,
        backgroundColor: '#fecaca',
        textColor: '#ef4444',
        animation: true,
      });

      formik.setErrors({});
    });
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
    <Form.DateTime formikDate={formik.values.date} setFieldValue={updateReportField} />,
    <Form.Antedecent
      antecedentValue={formik.values.antecedent}
      handleAntecedent={formik.handleChange('antecedent')}
    />,
    <Form.Event
      handleEventText={formik.handleChange('event.text')}
      event={formik.values.event}
      updateReportField={updateReportField}
      updateFeeling={updateFeeling('event.feeling')}
    />,
    <Form.Thought
      handleThought={formik.handleChange('thoughts')}
      thoughtValue={formik.values.thoughts}
    />,
    <Form.Reflection
      handleReflectionText={formik.handleChange('reflections.text')}
      reflection={formik.values.reflections}
      updateFeeling={updateFeeling('reflections.feeling')}
    />,
  ];

  const updateStep = (newStep: number) => {
    if (newStep > stepLimits.MAX || newStep < stepLimits.MIN) return;

    setStep(newStep);
  };

  if (invalidForm) showErrors();

  return (
    <View className='gap-y-4 pt-6 w-full rounded-xl border drop-shadow-xl justify-betweeen border-neutral-200'>
      <Form.ProgressBar currentStep={step} numberOfSteps={formOrder.length} />
      {formOrder[step]}
      <Form.Control formControl={formControl} step={step} stepLimits={stepLimits} />
    </View>
  );
}
