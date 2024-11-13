import { useEffect, useState } from 'react';
import { getReports } from '../storage';
import { SelfReport } from '../types';

export default function useGetSelfReports() {
  const [selfReports, setSelfReports] = useState<SelfReport[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getSelfReports = async () => {
    try {
      setIsLoading(true);

      const data = await getReports();

      setSelfReports(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);

        return;
      }

      setError('Ocurrió un error al recuperar los autorregistros');
    } finally {
      setIsLoading(false);
    }
    const data = await getReports();

    setSelfReports(data);
  };

  const refreshSelfReports = async () => {
    await getSelfReports();
  };

  useEffect(() => {
    getSelfReports();
  }, []);

  return { selfReports, error, isLoading, refreshSelfReports };
}
