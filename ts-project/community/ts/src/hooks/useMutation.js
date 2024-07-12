const API_SERVER = 'https://api.fesp.shop';

const useMutation = (url, message = '', options = {}) => {
	const send = async (addOptions = {}) => {
		if(!url.startsWith('http')) {
			url = API_SERVER + url;
		}

		options = {
			headers: {
				'Content-Type': 'application/json'
			},
			...options,
			...addOptions
		};

		console.log(addOptions);

		try {
			const response = await fetch(url, options);
			if(!response.ok) {
				throw new Error(`2xx 이외의 응답: ${response.status}`);
			}
			const result = await response.json();
			console.log(message);
			return result;
		} catch(err) {
			console.error(err);
			throw err;
		}
	};
	return { send };
};

export default useMutation;