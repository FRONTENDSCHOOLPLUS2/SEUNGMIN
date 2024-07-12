import Button from '@components/Button';
import Submit from '@components/Submit';
import useMutation from '@hooks/useMutation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SignupValues } from 'types/user';

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>();
  const { send } = useMutation('/users', '회원가입 통신');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    type: 'user', // 기본값으로 'user' 설정
    profileImage: null, // 프로필 이미지 정보를 담을 객체
  });

  const onSubmit = async (data: SignupValues) => {
    try {
      const updatedFormData = {
        ...formData,
        email: data.email,
        name: data.name,
        type: 'user',
        password: data.password,
      };
      if (data.profileImage) {
        const profile = data.profileImage[0];
        const fileData = new FormData();
        fileData.append('attach', profile);

        const response = await fetch('https://api.fesp.shop/files', {
          method: 'POST',
          body: fileData,
        });

        if (!response.ok) {
          throw new Error('Image upload failed');
        }

        const result = await response.json();
        const fileResult = result.item[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...updatedFormData,
          profileImage: fileResult,
        }));

        const sendResponse: Response = await send({
          method: 'POST',
          body: JSON.stringify({
            ...updatedFormData,
            profileImage: fileResult,
          }),
        });

        if (!sendResponse.ok) {
          toast.error('회원가입 실패', {
            autoClose: 2000,
            hideProgressBar: true,
          });
          throw new Error('회원가입 실패');
        }
      }

      toast.success('회원가입 성공', {
        autoClose: 2000,
        hideProgressBar: true,
      });

      navigate(`/user/login`);
    } catch (error) {
      console.error(error);
      toast.error('회원가입 실패', {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <main className='min-w-80 flex-grow flex items-center justify-center'>
      <div className='p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0'>
        <div className='text-center py-4'>
          <h2 className='text-2xl font-bold text-gray-700 dark:text-gray-200'>
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 dark:text-gray-200 mb-2'
              htmlFor='name'
            >
              이름
            </label>
            <input
              type='text'
              id='name'
              placeholder='이름을 입력하세요'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700'
              {...register('name', { required: true })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.name && (
              <p className='ml-2 mt-1 text-sm text-red-500 dark:text-red-400'>
                에러 메세지
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 dark:text-gray-200 mb-2'
              htmlFor='email'
            >
              이메일
            </label>
            <input
              type='email'
              id='email'
              placeholder='이메일을 입력하세요'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700'
              {...register('email', { required: true })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.email && (
              <p className='ml-2 mt-1 text-sm text-red-500 dark:text-red-400'>
                에러 메세지
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 dark:text-gray-200 mb-2'
              htmlFor='password'
            >
              비밀번호
            </label>
            <input
              type='password'
              id='password'
              placeholder='비밀번호를 입력하세요'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700'
              {...register('password', { required: true })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.password && (
              <p className='ml-2 mt-1 text-sm text-red-500 dark:text-red-400'>
                에러 메세지
              </p>
            )}
          </div>

          <div className='mb-4'>
            <label
              className='block text-gray-700 dark:text-gray-200 mb-2'
              htmlFor='profileImage'
            >
              프로필 이미지
            </label>
            <input
              type='file'
              id='profileImage'
              accept='image/*'
              placeholder='이미지를 선택하세요'
              className='w-full px-3 py-2 border rounded-lg dark:bg-gray-700'
              {...register('profileImage', { required: false })}
            />
          </div>

          <div className='mt-10 flex justify-center items-center'>
            <Submit>회원가입</Submit>
            <Button type='reset' bgColor='gray' onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
