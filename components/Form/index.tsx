import { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import Toast from 'react-native-root-toast';
import { View } from 'react-native';
import ReportTextInput from './ReportTextInput';
import ReportDiscomfortInput from './ReportDiscomfortInput';
import QuestionWrapper from './QuestionWrapper';
import DateTime from './DateTime';
import Control from './Control';
import ProgressBar from './ProgressBar';
import { validate } from './validation';
import { DEFAULT_DISCOMFORT_VALUE, DISCOMFORT_LIMITS, FORM_QUESTIONS } from '../../constants';
import { FormValues } from '../../types';

const Precedent = ({
  precedentValue,
  handlePrecedent,
}: {
  precedentValue: FormValues['precedent'];
  handlePrecedent: (e: ChangeEvent | any) => void;
}) => {
  const { title, placeholder } = FORM_QUESTIONS.precedent;
  return (
    <QuestionWrapper>
      <ReportTextInput
        handleReportValue={handlePrecedent}
        placeholder={placeholder}
        reportValue={precedentValue}
        title={title}
      />
    </QuestionWrapper>
  );
};

const Event = ({
  event,
  handleEventText,
  updateDiscomfort,
}: {
  event: FormValues['event'];
  handleEventText: (e: ChangeEvent | any) => void;
  updateReportField: (field: string, value: string | number) => void;
  updateDiscomfort: (newValue: number) => () => void;
}) => {
  const { title, placeholder } = FORM_QUESTIONS.event;

  return (
    <QuestionWrapper>
      <ReportTextInput
        handleReportValue={handleEventText}
        reportValue={event.text}
        title={title}
        placeholder={placeholder}
      />
      <View className='gap-y-2'>
        <ReportDiscomfortInput
          discomfortValue={event.discomfort}
          updateDiscomfort={updateDiscomfort}
        />
      </View>
    </QuestionWrapper>
  );
};

const Thought = ({
  thoughtValue,
  handleThought,
}: {
  thoughtValue: FormValues['thoughts'];
  handleThought: (e: ChangeEvent | any) => void;
}) => {
  const { title, placeholder } = FORM_QUESTIONS.thoughts;

  return (
    <QuestionWrapper>
      <ReportTextInput
        title={title}
        handleReportValue={handleThought}
        reportValue={thoughtValue}
        placeholder={placeholder}
      />
    </QuestionWrapper>
  );
};

const Reflection = ({
  handleReflectionText,
  reflection,
  updateDiscomfort,
}: {
  handleReflectionText: (e: ChangeEvent | any) => void;
  reflection: FormValues['reflections'];
  updateDiscomfort: (newValue: number) => () => void;
}) => {
  const { title, placeholder } = FORM_QUESTIONS.reflections;
  return (
    <QuestionWrapper>
      <ReportTextInput
        title={title}
        handleReportValue={handleReflectionText}
        reportValue={reflection.text}
        placeholder={placeholder}
      />

      <ReportDiscomfortInput
        discomfortValue={reflection.discomfort || DEFAULT_DISCOMFORT_VALUE}
        updateDiscomfort={updateDiscomfort}
      />
    </QuestionWrapper>
  );
};

const OtherPeopleActions = ({
  handleOtherPeopleActions,
  otherPeopleActions,
}: {
  handleOtherPeopleActions: (e: ChangeEvent | any) => void;
  otherPeopleActions: FormValues['otherActions'];
}) => {
  const { title, placeholder } = FORM_QUESTIONS.otherActions;

  return (
    <QuestionWrapper>
      <ReportTextInput
        title={title}
        handleReportValue={handleOtherPeopleActions}
        reportValue={otherPeopleActions}
        placeholder={placeholder}
      />
    </QuestionWrapper>
  );
};

Form.ProgressBar = ProgressBar;
Form.DateTime = DateTime;
Form.Control = Control;
Form.Antedecent = Precedent;
Form.Event = Event;
Form.Thought = Thought;
Form.Reflection = Reflection;
Form.OtherPeopleActions = OtherPeopleActions;

export default function Form({
  onSubmit,
  formValues,
}: {
  onSubmit: (values: FormValues) => Promise<void>;
  formValues: FormValues;
}) {
  const [step, setStep] = useState<number>(0);

  const formik = useFormik<FormValues>({
    initialValues: formValues,
    onSubmit,
    validate: (values) => validate(values, step),
    validateOnChange: false,
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
    MAX: 5,
  };
  const updateReportField = (field: string, value: string | number) => {
    formik.setFieldValue(field, value);
  };

  const updateDiscomfort = (field: 'event.discomfort' | 'reflections.discomfort') => {
    return function (newValue: number) {
      return function () {
        const newDiscomfortValue = Number(newValue);

        if (
          isNaN(newDiscomfortValue) ||
          newDiscomfortValue > DISCOMFORT_LIMITS.MAX ||
          newDiscomfortValue < DISCOMFORT_LIMITS.MIN
        )
          return;

        updateReportField(field, newDiscomfortValue);
      };
    };
  };

  const formOrder = [
    <Form.DateTime formikDate={new Date(formik.values.date)} setFieldValue={updateReportField} />,
    <Form.Antedecent
      precedentValue={formik.values.precedent}
      handlePrecedent={formik.handleChange('precedent')}
    />,
    <Form.Event
      handleEventText={formik.handleChange('event.text')}
      event={formik.values.event}
      updateReportField={updateReportField}
      updateDiscomfort={updateDiscomfort('event.discomfort')}
    />,
    <Form.Thought
      handleThought={formik.handleChange('thoughts')}
      thoughtValue={formik.values.thoughts}
    />,
    <Form.Reflection
      handleReflectionText={formik.handleChange('reflections.text')}
      reflection={formik.values.reflections}
      updateDiscomfort={updateDiscomfort('reflections.discomfort')}
    />,
    <Form.OtherPeopleActions
      handleOtherPeopleActions={formik.handleChange('otherActions')}
      otherPeopleActions={formik.values.otherActions}
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
