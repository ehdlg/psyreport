import { useEffect, useState } from 'react';
import { SelfReport } from '../types';
import { getReportById } from '../storage';

export default function useGetSelfReport(id: number) {
  const [report, setReport] = useState<SelfReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getReport = async (id: number) => {
    try {
      const data = await getReportById(id);

      setReport(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);

        return;
      }

      setError('Hubo un error al recuperar el autorregistro');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReport(id);
  }, [id]);

  return { report, error, isLoading };
}
