import { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import { View } from 'react-native';
import Button from '../elements/Button';
import ReportTextInput from './ReportTextInput';
import ReportDiscomfortInput from './ReportDiscomfortInput';
import QuestionWrapper from './QuestionWrapper';
import DateTime from './DateTime';
import Control from './Control';
import ProgressBar from './ProgressBar';
import ReportAudioInput from './ReportAudioInput';
import { validate } from './validation';
import {
  DEFAULT_DISCOMFORT_VALUE,
  DISCOMFORT_LIMITS,
  FORM_QUESTIONS,
  INITAL_FORM_STEP,
} from '../../constants';
import { AudioUri, FormValues } from '../../types';
import { showToast } from '../../utils';

const Precedent = ({
  precedentValue,
  handlePrecedent,
  isRecord = false,
  audioUri,
  handleAudioUri,
}: {
  precedentValue: FormValues['precedent'];
  handlePrecedent: (e: ChangeEvent | any) => void;
  isRecord: boolean;
  audioUri: AudioUri;
  handleAudioUri: (newUri: AudioUri) => void;
}) => {
  const { title, placeholder } = FORM_QUESTIONS.precedent;

  return (
    <QuestionWrapper question={title}>
      {isRecord ? (
        <ReportAudioInput handleAudioUri={handleAudioUri} audioUri={audioUri} />
      ) : (
        <ReportTextInput
          handleReportValue={handlePrecedent}
          placeholder={placeholder}
          reportValue={precedentValue.text}
        />
      )}
    </QuestionWrapper>
  );
};

const Event = ({
  event,
  handleEventText,
  updateDiscomfort,
  isRecord = false,
  audioUri,
  handleAudioUri,
}: {
  event: FormValues['event'];
  handleEventText: (e: ChangeEvent | any) => void;
  updateReportField: (field: string, value: string | number) => void;
  updateDiscomfort: (newValue: number) => () => void;
  isRecord: boolean;
  audioUri: AudioUri;
  handleAudioUri: (newUri: AudioUri) => void;
}) => {
  const { title, placeholder } = FORM_QUESTIONS.event;

  return (
    <QuestionWrapper question={title}>
      {isRecord ? (
        <ReportAudioInput audioUri={audioUri} handleAudioUri={handleAudioUri} />
      ) : (
        <ReportTextInput
          handleReportValue={handleEventText}
          reportValue={event.text}
          placeholder={placeholder}
        />
      )}

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
  isRecord = false,
  audioUri,
  handleAudioUri,
}: {
  thoughtValue: FormValues['thoughts'];
  handleThought: (e: ChangeEvent | any) => void;
  isRecord: boolean;
  audioUri: AudioUri;
  handleAudioUri: (newUri: AudioUri) => void;
}) => {
  const { title, placeholder } = FORM_QUESTIONS.thoughts;

  return (
    <QuestionWrapper question={title}>
      {isRecord ? (
        <ReportAudioInput audioUri={audioUri} handleAudioUri={handleAudioUri} />
      ) : (
        <ReportTextInput
          handleReportValue={handleThought}
          reportValue={thoughtValue.text}
          placeholder={placeholder}
        />
      )}
    </QuestionWrapper>
  );
};

const Reflection = ({
  handleReflectionText,
  reflection,
  updateDiscomfort,
  isRecord,
  audioUri,
  handleAudioUri,
}: {
  handleReflectionText: (e: ChangeEvent | any) => void;
  reflection: FormValues['reflections'];
  updateDiscomfort: (newValue: number) => () => void;
  isRecord: boolean;
  audioUri: AudioUri;
  handleAudioUri: (newUri: AudioUri) => void;
}) => {
  const { title, placeholder } = FORM_QUESTIONS.reflections;
  return (
    <QuestionWrapper question={title}>
      {isRecord ? (
        <ReportAudioInput audioUri={audioUri} handleAudioUri={handleAudioUri} />
      ) : (
        <ReportTextInput
          handleReportValue={handleReflectionText}
          reportValue={reflection.text}
          placeholder={placeholder}
        />
      )}
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
  isRecord,
  audioUri,
  handleAudioUri,
}: {
  handleOtherPeopleActions: (e: ChangeEvent | any) => void;
  otherPeopleActions: FormValues['otherActions'];
  isRecord: boolean;
  audioUri: AudioUri;
  handleAudioUri: (newUri: AudioUri) => void;
}) => {
  const { title, placeholder } = FORM_QUESTIONS.otherActions;

  return (
    <QuestionWrapper question={title}>
      {isRecord ? (
        <ReportAudioInput audioUri={audioUri} handleAudioUri={handleAudioUri} />
      ) : (
        <ReportTextInput
          handleReportValue={handleOtherPeopleActions}
          reportValue={otherPeopleActions.text}
          placeholder={placeholder}
        />
      )}
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
  initialStep = INITAL_FORM_STEP,
}: {
  onSubmit: (values: FormValues) => Promise<void>;
  formValues: FormValues;
  initialStep?: number;
}) {
  const [step, setStep] = useState<number>(initialStep);
  const [isRecord, setIsRecord] = useState<boolean>(false);

  const handleReportInput = () => {
    setIsRecord(!isRecord);
  };

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

      showToast({ message: errorMessage, type: 'error' });

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

  const updateAudioUri = (field: string) => {
    return function (newUri: string | null) {
      formik.setFieldValue(field, newUri);
    };
  };

  const formOrder = [
    <Form.DateTime formikDate={new Date(formik.values.date)} setFieldValue={updateReportField} />,
    <Form.Antedecent
      precedentValue={formik.values.precedent}
      handlePrecedent={formik.handleChange('precedent.text')}
      isRecord={isRecord}
      audioUri={formik.values.precedent.audio}
      handleAudioUri={updateAudioUri('precedent.audio')}
    />,
    <Form.Event
      handleEventText={formik.handleChange('event.text')}
      event={formik.values.event}
      updateReportField={updateReportField}
      updateDiscomfort={updateDiscomfort('event.discomfort')}
      isRecord={isRecord}
      handleAudioUri={updateAudioUri('event.audio')}
      audioUri={formik.values.event.audio}
    />,
    <Form.Thought
      handleThought={formik.handleChange('thoughts.text')}
      thoughtValue={formik.values.thoughts}
      isRecord={isRecord}
      audioUri={formik.values.thoughts.audio}
      handleAudioUri={updateAudioUri('thoughts.audio')}
    />,
    <Form.Reflection
      handleReflectionText={formik.handleChange('reflections.text')}
      reflection={formik.values.reflections}
      updateDiscomfort={updateDiscomfort('reflections.discomfort')}
      isRecord={isRecord}
      audioUri={formik.values.reflections.audio}
      handleAudioUri={updateAudioUri('reflections.audio')}
    />,
    <Form.OtherPeopleActions
      handleOtherPeopleActions={formik.handleChange('otherActions.text')}
      otherPeopleActions={formik.values.otherActions}
      isRecord={isRecord}
      audioUri={formik.values.otherActions.audio}
      handleAudioUri={updateAudioUri('otherActions.audio')}
    />,
  ];

  const updateStep = (newStep: number) => {
    if (newStep > stepLimits.MAX || newStep < stepLimits.MIN) return;

    setStep(newStep);
  };

  if (invalidForm) showErrors();

  return (
    <View className='relative gap-y-4 pt-6 w-full rounded-xl border drop-shadow-xl justify-betweeen border-slate-200 dark:border-slate-700'>
      {step > 0 && (
        <View className='absolute right-4 top-8 w-1/4 h-full'>
          <Button
            title={isRecord ? 'Texto' : 'Audio'}
            type='tertiary'
            onPress={handleReportInput}
          />
        </View>
      )}

      <Form.ProgressBar currentStep={step} numberOfSteps={formOrder.length} />
      {formOrder[step]}
      <Form.Control formControl={formControl} step={step} stepLimits={stepLimits} />
    </View>
  );
}
