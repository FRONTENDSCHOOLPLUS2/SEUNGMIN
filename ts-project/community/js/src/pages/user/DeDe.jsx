import Button from '@components/Button';
import Submit from '@components/Submit';
import { useState } from 'react';
// import { useForm } from 'react-hook-form';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    type: 'user', // 기본값으로 'user' 설정
    profileImage: null, // 프로필 이미지 정보를 담을 객체
  });

  // value값 변화를 감지하여 formData 상태 업데이트
  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === 'file' ? e.target.files[0] : e.target.value;

    if (type === 'file') {
      fileUpload(e);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(name, value);
    console.log(formData);
  };

  // 파일 업로드 함수
  const fileUpload = async (e) => {
    const fileUrl = 'https://api.fesp.shop/files';

    // FormData 객체 생성
    // const formDataObj = new FormData();
    let formData = new FormData();
    console.log(e.target.value);
    formData.append('attach', e.target.files[0]);
    console.log(formData);

    try {
      const response = await fetch(fileUrl, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result.item);
      setFormData((prevFormData) => ({
        // 기존 formData 상태를 복사하여 업데이트
        ...prevFormData,
        profileImage: result, // 파일 업로드 응답 결과를 profileImage 필드에 저장
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // 폼 데이터 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.fesp.shop/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // 성공 응답 처리
    } catch (error) {
      console.error('Error:', error); // 에러 처리
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

        <form onSubmit={handleSubmit}>
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
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
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
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            {/* <p className='ml-2 mt-1 text-sm text-red-500 dark:text-red-400'>에러 메세지</p> */}
            {/* 입력값 검증 에러 출력 */}
            {/* <p className='ml-2 mt-1 text-sm text-red-500 dark:text-red-400'>에러 메세지</p> */}
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
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
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
              name='profileImage'
              onChange={handleChange}
              required
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
