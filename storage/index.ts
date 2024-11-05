import AsyncStorage from '@react-native-async-storage/async-storage';
import { INITIAL_ID, STORAGE_KEY } from '../constants';
import { NewSelfReport, SelfReport } from '../types';

// TODO better error handling
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

export const generateId = (reports: SelfReport[] | undefined) => {
  if (null == reports || reports.length === 0) return INITIAL_ID;

  return reports[reports.length - 1].id + 1;
};

export const setReport = async (newReport: NewSelfReport) => {
  try {
    const reports = await getReports();

    if (null == reports) return;

    const reportId = generateId(reports);
    const report: SelfReport = { ...newReport, id: reportId };
    const newReports = [...reports, report];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newReports));
  } catch (e) {
    console.error(e);
  }
};
