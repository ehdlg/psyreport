export type AudioUri = string | null;

export type TextAndAudioField = {
  text: string | null;
  audio: AudioUri;
};

export type SelfReport = {
  id: number;
  date: string;
  precedent: TextAndAudioField;
  event: {
    discomfort: number;
    text: string | null;
    audio: AudioUri;
  };
  thoughts: TextAndAudioField;
  reflections: {
    audio: AudioUri;
    discomfort: number | null;
    text: string | null;
  };
  otherActions: TextAndAudioField;
};

export type NewSelfReport = Omit<SelfReport, 'id'>;

export type ButtonType = 'primary' | 'secondary' | 'tertiary';

export type StepIndicatorStatus = 'current' | 'done' | 'todo';

export type FormValues = Omit<SelfReport, 'id'> & Partial<Pick<SelfReport, 'id'>>;

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export const isTextAndAudioField = (value: any): value is TextAndAudioField => {
  return (
    value &&
    typeof value === 'object' &&
    'audio' in value &&
    typeof value.audio === 'string' &&
    'text' in value
  );
};
