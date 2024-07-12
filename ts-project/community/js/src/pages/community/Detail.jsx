import Button from '@components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import CommentList from './CommentList';
import { useEffect, useState } from 'react';
import useLoginfetch from '@hooks/useLoginfetch';
import { toast } from 'react-toastify';
import Spinner from '@components/Spinner';

function Detail() {
  const navigate = useNavigate();
  const param = useParams()._id;
  const [data, setData] = useState(null);
  const { fetchData } = useLoginfetch(`/posts/${param}`, '게시물 삭제 요청');

  const handleDelete = async () => {
    try {
      const result = confirm('게시물을 삭제하시겠습니까?');

      if (result) {
        await fetchData({ method: 'DELETE' });

        navigate(-1);

        toast.success('게시물이 삭제되었습니다.', {
          autoclose: 2000,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`https://api.fesp.shop/posts/${param}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(result.item);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetail();
  }, [param]);

  return (
    <main className='container mx-auto mt-4 px-4'>
      {data ? (
        <section className='mb-8 p-4'>
          <div className='font-semibold text-xl'>제목 : {data.title}</div>
          <div className='text-right text-gray-400'>
            작성자 : {data.user.name}
          </div>
          <div className='mb-4'>
            <div>
              <pre className='font-roboto w-full p-2 whitespace-pre-wrap'>
                {data.content}
              </pre>
            </div>
            <hr />
          </div>
          <div className='flex justify-end my-4'>
            <Button onClick={() => history.back()}>목록</Button>
            {data.user._id === +sessionStorage.getItem('user_id') && (
              <div>
                <Button
                  bgColor='gray'
                  onClick={() =>
                    navigate(`/info/${param}/edit`, { state: data })
                  }
                >
                  수정
                </Button>
                <Button bgColor='red' onClick={handleDelete}>
                  삭제
                </Button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <Spinner />
      )}

      {/* 댓글 목록 */}
      <CommentList />
    </main>
  );
}

export default Detail;
