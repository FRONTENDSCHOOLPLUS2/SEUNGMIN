import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className='flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out'>
      {/* 헤더 부분 */}
      <Header />

      {/* 페이지 본문 */}
      <Outlet />

      {/* 푸터 부분 */}
      <Footer />
    </div>
  );
}

export default Layout;
