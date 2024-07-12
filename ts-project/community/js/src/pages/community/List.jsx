import Button from '@components/Button';
import Pagination from '@components/Pagination';
import Search from '@components/Search';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ListItem from './ListItem';
import Spinner from '@components/Spinner';

function List() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const param = useParams().type;

  useEffect(() => {
    const fetchUrl = async () => {
      const url = `https://api.fesp.shop/posts?type=${param}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`2xx 이외의 응답: ${response.status}`);
      }

      const result = await response.json();
      setData(result.item);
    };
    fetchUrl();
  }, [param]);

  return (
    <main className='min-w-80 p-10'>
      <div className='text-center py-4'>
        <h2 className='pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200'>
          정보 공유
        </h2>
      </div>
      <div className='flex justify-end mr-4'>
        {/* 검색 */}
        <Search />
        <Button onClick={() => navigate(`/${param}/new`)}>글 작성</Button>
      </div>
      <section className='pt-10'>
        <table className='border-collapse w-full table-fixed'>
          <colgroup>
            <col className='w-[10%] sm:w-[10%]' />
            <col className='w-[60%] sm:w-[30%]' />
            <col className='w-[30%] sm:w-[15%]' />
            <col className='w-0 sm:w-[10%]' />
            <col className='w-0 sm:w-[10%]' />
            <col className='w-0 sm:w-[25%]' />
          </colgroup>
          <thead>
            <tr className='border-b border-solid border-gray-600'>
              <th className='p-2 whitespace-nowrap font-semibold'>번호</th>
              <th className='p-2 whitespace-nowrap font-semibold'>제목</th>
              <th className='p-2 whitespace-nowrap font-semibold'>글쓴이</th>
              <th className='p-2 whitespace-nowrap font-semibold hidden sm:table-cell'>
                조회수
              </th>
              <th className='p-2 whitespace-nowrap font-semibold hidden sm:table-cell'>
                댓글수
              </th>
              <th className='p-2 whitespace-nowrap font-semibold hidden sm:table-cell'>
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 로딩 상태 표시 */}
            {/*  <tr>
                <td colSpan='6' className='py-20 text-center'>
                  로딩중...
                </td>
              </tr> */}

            {/* 에러 메세지 출력 */}
            {/* <tr>
                <td colSpan='6' className='py-20 text-center'>
                  에러 메세지
                </td>
              </tr> */}

            {/* 본문 출력 */}
            {data ? (
              data.map((item) => <ListItem key={item._id} data={item} />)
            ) : (
              <tr>
                <td colSpan='6' className='text-center'>
                  <Spinner />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <hr />
        {/* 페이지네이션 */}
        <Pagination />
      </section>
    </main>
  );
}

export default List;
