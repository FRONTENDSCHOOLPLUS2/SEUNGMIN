import { useEffect, useState } from 'react';

const API_SERVER = 'https://api.fesp.shop';

const useLoginfetch = (url, message = '', options = {},) => {
	const [data, setData] = useState(null); // API 응답 데이터 상태
	const [loading, setLoading] = useState(true); // 로딩 상태
	const [error, setError] = useState(null); // 에러 상태

	const fetchData = async (addOptions = {}) => {
		setData(null);
		setLoading(true);
		setError(null);

		options = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
			},
			...options,
			...addOptions,
		};

		try {
			if(!url.startsWith('http')) {
				url = API_SERVER + url;
			}

			const response = await fetch(url, options);

			if(!response.ok) {
				throw new Error(`2xx 이외의 응답: ${response.status}`);
			}

			const result = await response.json();
			console.log(result);
			setData(result);
			console.log(message);
		} catch(error) {
			console.error('에러 발생', error);
			setError(error.meg);
		} finally {
			setLoading(false);
		}

	};

	useEffect(() => {
		fetchData();
	}, []);

	return { data, loading, error, fetchData };
};

export default useLoginfetch;

//@ fetchData 따로 사용할 경우
// function Test() {
// 	const { data, loading, error, fetchData } = useLoginfetch('/todos');
// 	const aa = () => {
// 		fetchData('/todos', '통신 완료', { method: 'POST' });
// 	};
// 	// useLoginfetch('sdfdsf', sdfdsf, { method: 'POST' })
// }