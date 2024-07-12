import Button from '@components/Button';
import Submit from '@components/Submit';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    history.back();

    const login = async () => {
      try {
        const response = await fetch('https://api.fesp.shop/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        console.log('response : ', response);
        if (response.ok) {
          const result = await response.json();
          console.log(`결과값 : `, result);

          // 세션 스토리지에 accessToken 저장
          const { accessToken } = result.item.token;
          sessionStorage.setItem('accessToken', accessToken);

          // 세션 스토리지에 _id 정보 저장
          sessionStorage.setItem('user_id', JSON.stringify(result.item._id));

          // 페이지 새로고침
          // window.location.reload();
          navigate('/');
          toast.success('로그인 성공', {
            autoClose: 2000,
            hideProgressBar: true,
          });
        } else {
          setError('로그인 실패');
          toast.error('로그인 실패', {
            autoClose: 2000,
            hideProgressBar: true,
          });
          navigate('/user/login');
        }
      } catch (err) {
        console.log(err);
        setError('로그인 실패');
      }
    };
    login();
  };

  return (
    <main className='min-w-80 flex-grow flex items-center justify-center'>
      <div className='p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0'>
        <div className='text-center py-4'>
          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            로그인
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 dark:text-gray-200 mb-2'
              htmlFor='email'
            >
              이메일
            </label>
            <input
              id='email'
              type='email'
              placeholder='이메일을 입력하세요'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700'
              value={email}
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 dark:text-gray-200 mb-2'
              htmlFor='password'
            >
              비밀번호
            </label>
            <input
              id='password'
              type='password'
              placeholder='비밀번호를 입력하세요'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {error && (
              <p className='ml-2 mt-1 text-sm text-red-500 dark:text-red-400'>
                에러 메세지
              </p>
            )}
            <Link
              to='#'
              className='block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline'
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className='mt-10 flex justify-center items-center'>
            <Submit>로그인</Submit>
            <Link to='/user/signup'>
              <Button bgColor='gray'>회원가입</Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
