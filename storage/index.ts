import AsyncStorage from '@react-native-async-storage/async-storage';
import { moveAsync } from 'expo-file-system';
import { INITIAL_ID, STORAGE_KEY, AUDIO_DIR, AUDIO_EXTENSION } from '../constants';
import { FormValues, NewSelfReport, SelfReport } from '../types';

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

export const saveReport = async (newReport: NewSelfReport) => {
  try {
    const reports = await getReports();

    if (null == reports) return;

    const reportId = generateId(reports);
    const report: SelfReport = { ...newReport, id: reportId };
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

    savedReports[reportIndex] = { ...savedReports[reportIndex], ...newValues };

    await setReports(savedReports);
  } catch (error) {
    throw error;
  }
};

export const saveAudio = async ({ from, fileName }: { from: string; fileName: string }) => {
  try {
    const to = `${AUDIO_DIR}/${fileName}${AUDIO_EXTENSION}`;

    await moveAsync({ from, to });
  } catch (_error) {
    throw new Error('No se pudo guardar el archivo');
  }
};
