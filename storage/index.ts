import AsyncStorage from '@react-native-async-storage/async-storage';
import { moveAsync, deleteAsync } from 'expo-file-system';
import { INITIAL_ID, STORAGE_KEY, AUDIO_DIR, AUDIO_EXTENSION } from '../constants';
import {
  FormValues,
  NewSelfReport,
  SelfReport,
  TextAndAudioField,
  isTextAndAudioField,
} from '../types';

// TODO: better error handling

const setReports = async (reports: SelfReport[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error(error);
  }
};
export const getReports = async () => {
  try {
    const reports = await AsyncStorage.getItem(STORAGE_KEY);

    if (null == reports) return [];

    return JSON.parse(reports) as SelfReport[];
  } catch (e) {
    console.error(e);
    throw new Error('Hubo un error al intentar obtener los autoregistros guardados.');
  }
};

export const getReportById = async (id: number) => {
  try {
    const reports = await getReports();

    const report = reports.find((savedReport) => savedReport.id === id);

    if (null == report) throw new Error('Autorregistro no encontrado');

    return report;
  } catch (error) {
    throw error;
  }
};

export const generateId = (reports: SelfReport[] | undefined) => {
  if (null == reports || reports.length === 0) return INITIAL_ID;

  return reports[reports.length - 1].id + 1;
};

export const processAudioFiles = async (values: SelfReport): Promise<SelfReport> => {
  const { id } = values;
  const processedValues = { ...values };

  for (const [key, value] of Object.entries(values)) {
    if (!isTextAndAudioField(value) || null == value.audio || value.audio.includes(AUDIO_DIR))
      continue;

    const fileName = `${key}-${id}`;
    const from = value.audio;

    const to = await saveAudio({ from, fileName });

    (processedValues[key as keyof SelfReport] as TextAndAudioField).audio = to;
  }

  return processedValues;
};

export const saveReport = async (newReport: NewSelfReport) => {
  try {
    const reports = await getReports();
    const reportId = generateId(reports);
    const rawReport: SelfReport = { ...newReport, id: reportId };

    const report = await processAudioFiles(rawReport);

    const newReports = [...reports, report];

    await setReports(newReports);
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al guardar el autorregistro');
  }
};

export const deleteReport = async (id: number) => {
  try {
    const storedReports = await getReports();

    const newReports = storedReports.filter((report) => report.id !== id);

    await setReports(newReports);
  } catch (_error) {
    throw new Error('No se pudo borrar el autorregistro');
  }
};

export const editReport = async (id: number, newValues: FormValues) => {
  try {
    const savedReports = await getReports();

    const reportIndex = savedReports.findIndex((savedReport) => savedReport.id === id);

    if (reportIndex === -1) throw new Error('Autorregistro no encontrado');

    const rawReport = { ...savedReports[reportIndex], ...newValues };

    const editedReport = await processAudioFiles(rawReport);

    savedReports[reportIndex] = editedReport;

    await setReports(savedReports);
  } catch (error) {
    throw error;
  }
};

export const saveAudio = async ({ from, fileName }: { from: string; fileName: string }) => {
  try {
    const to = `${AUDIO_DIR}/${fileName}${AUDIO_EXTENSION}`;

    await moveAsync({ from, to });

    return to;
  } catch (_error) {
    throw new Error('No se pudo guardar el archivo');
  }
};

export const deleteAudio = async (fileUri: string) => {
  try {
    await deleteAsync(fileUri);
  } catch (_error) {
    throw new Error('No se pudo borrar el audio');
  }
};
