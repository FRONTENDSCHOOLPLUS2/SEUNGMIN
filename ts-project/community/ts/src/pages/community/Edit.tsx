import Button from '@components/Button';
import Submit from '@components/Submit';
import useLoginfetch from '@hooks/useLoginfetch';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { board } from 'types/board';

function Edit() {
  const param = useParams(); // fetch 통신을 위한 URL 파라미터
  const data = useLocation().state; // Detail.jsx에서 전달받은 게시물 데이터
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<board>(); // useForm() 훅을 사용하여 폼 데이터 관리
  const { fetchData } = useLoginfetch(
    `/posts/${param._id}`,
    '게시물 수정 통신',
  );

  const onSubmit = async (data: board) => {
    console.log(data);
    try {
      await fetchData({
        method: 'PATCH',
        body: JSON.stringify({
          title: data.title,
          content: data.content,
        }),
      });

      toast.success('게시물을 수정했습니다.', {
        autoClose: 2000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.log(error);
    }

    history.back();
  };

  return (
    <main className='min-w-[320px] p-4'>
      <div className='text-center py-4'>
        <h2 className='text-2xl font-bold text-gray-700 dark:text-gray-200'>
          게시글 수정
        </h2>
      </div>
      <section className='mb-8 p-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-4'>
            <label className='block text-lg content-center' htmlFor='title'>
              제목
            </label>
            <input
              type='text'
              placeholder='제목을 입력하세요.'
              className='w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              defaultValue={data.title}
              {...register('title', { required: true })}
            />

            {/* 입력값 검증 에러 출력 */}
            {errors.title && (
              <p className='ml-2 mt-1 text-sm text-red-500 dark:text-red-400'>
                에러 메세지
              </p>
            )}
          </div>
          <div className='my-4'>
            <label className='block text-lg content-center' htmlFor='content'>
              내용
            </label>
            <textarea
              placeholder='내용을 입력하세요.'
              className='w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              defaultValue={data.content}
              {...register('content', { required: true })}
            />

            {/* 입력값 검증 에러 출력 */}
            {errors.content && (
              <p className='ml-2 mt-1 text-sm text-red-500 dark:text-red-400'>
                에러 메세지
              </p>
            )}
          </div>
          <hr />
          <div className='flex justify-end my-6'>
            <Submit>수정</Submit>
            <Button type='reset' bgColor='gray' onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Edit;
