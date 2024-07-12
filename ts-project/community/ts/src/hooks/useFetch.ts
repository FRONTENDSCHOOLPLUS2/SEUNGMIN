import { useEffect, useState } from 'react';

const API_SERVER = 'https://api.fesp.shop';

const useFetch = <T>(
  url: string,
  message: string = '통신 완',
  options: RequestInit = {},
) => {
  const [data, setData] = useState<T | null>(null); // API 응답 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<Error | null>(null); // 에러 상태

  const fetchData = async (addOptions = {}) => {
    setData(null);
    setLoading(true);
    setError(null);

    options = {
      ...options,
      ...addOptions,
    };

    try {
      if (!url.startsWith('http')) {
        url = API_SERVER + url;
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`2xx 이외의 응답: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      console.log(message, result);
    } catch (error) {
      //@ 타입 가드
      if (error instanceof TypeError) {
        console.log('네트워크 에러');
        setError(error);
      } else if (error instanceof Error) {
        console.log('서버의 에러 응답');
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
