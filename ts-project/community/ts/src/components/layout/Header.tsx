import basic from '@/images/basicProfile.webp';
import Favicon from '@/images/favicon.svg';
import Button from '@components/Button';
import Theme from '@components/Theme';
import useLoginFetch from '@hooks/useLoginfetch';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserType } from 'types/user';

function Header() {
  const navigate = useNavigate();
  const { accessToken, user_id } = sessionStorage;
  const { data } = useLoginFetch<UserType>(`/users/${user_id}`);

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user_id');

    if (!sessionStorage.getItem('user_id')) {
      toast.success('로그아웃 되었습니다.');
    }
    navigate('/');
    // window.location.reload(); // Add this line to refresh the page
  };

  return (
    <header className='px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out'>
      <nav className='flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between'>
        <div className='w-1/2 order-1 md:w-auto'>
          <Link to='/' className='flex items-center gap-2'>
            <img className='mr-3 h-6 sm:h-9' src={Favicon} alt='로고 이미지' />
            <span className='text-lg font-bold'>멋사컴</span>
          </Link>
        </div>
        <div className='w-auto order-2 text-base mt-4 md:mt-0'>
          <ul className='flex items-center gap-6 uppercase'>
            <li className='hover:text-amber-500 hover:font-semibold'>
              <Link to='/info'>정보공유</Link>
            </li>
            <li className='hover:text-amber-500 hover:font-semibold'>
              <Link to='/free'>자유게시판</Link>
            </li>
            <li className='hover:text-amber-500 a:font-semibold'>
              <Link to='/qna'>질문게시판</Link>
            </li>
          </ul>
        </div>

        <div className='w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto'>
          {accessToken && data ? (
            //@ 로그인 후
            <p className='flex items-center'>
              {JSON.stringify(data.item.profileImage) === '{}' ? (
                <img
                  className='w-8 rounded-full mr-2'
                  src={`https://api.fesp.shop/${data.item.profileImage.path}`}
                  alt={`${data.item.name}의 프로필 이미지`}
                />
              ) : (
                <img
                  className='w-8 rounded-full mr-2'
                  src={basic}
                  alt='기본 프로필 이미지'
                />
              )}
              {data.item.name}
              <Button bgColor='gray' size='sm' onClick={handleLogout}>
                로그아웃
              </Button>
            </p>
          ) : (
            //@ 로그인 전
            <div className='flex justify-end'>
              <Button size='sm' onClick={() => navigate('/user/login')}>
                로그인
              </Button>
              <Button
                bgColor='gray'
                size='sm'
                onClick={() => navigate('/user/signup')}
              >
                회원가입
              </Button>
            </div>
          )}

          {/* 라이트/다크 모드 전환 */}
          <Theme />
        </div>
      </nav>
    </header>
  );
}

export default Header;
