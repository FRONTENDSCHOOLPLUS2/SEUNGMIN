import loading from '@/images/loading.gif';

function Spinner() {
  return (
    <div className='text-center'>
      {/* <h3>잠깐만...</h3> */}
      <img src={loading} alt='로딩' className='mx-auto' width={'13%'} />
    </div>
  );
}

export default Spinner;
