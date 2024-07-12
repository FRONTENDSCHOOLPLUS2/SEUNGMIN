import Button from '@components/Button';
import Submit from '@components/Submit';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function New() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const param = useParams().type;

  const handleSubmit = async (event) => {
    event.preventDefault();
    history.back();

    const sendPost = async () => {
      try {
        // Get the authorization token from the sessionStorage
        const token = sessionStorage.getItem('accessToken');

        const response = await fetch('https://api.fesp.shop/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type: param, title, content }),
        });
        if (response.ok) {
          toast.success('게시물이 등록되었습니다.', {
            autoClose: 2000,
            hideProgressBar: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    sendPost();
  };

  return (
    <main className='min-w-[320px] p-4'>
      <div className='text-center py-4'>
        <h2 className='text-2xl font-bold text-gray-700 dark:text-gray-200'>
          게시글 등록
        </h2>
      </div>
      <section className='mb-8 p-4'>
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label className='block text-lg content-center' htmlFor='title'>
              제목
            </label>
            <input
              id='title'
              type='text'
              placeholder='제목을 입력하세요.'
              className='w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className='my-4'>
            <label className='block text-lg content-center' htmlFor='content'>
              내용
            </label>
            <textarea
              id='content'
              rows='15'
              placeholder='내용을 입력하세요.'
              className='w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              name='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <hr />
          <div className='flex justify-end my-6'>
            <Submit>등록</Submit>
            <Button type='reset' bgColor='gray' onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default New;
