import { useNavigate } from 'react-router-dom';

function ListItem({ data }) {
  const navigate = useNavigate();

  return (
    <tr className='border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out'>
      <td className='p-2 text-center'>{data._id}</td>
      <td
        className='p-2 truncate indent-4 cursor-pointer'
        onClick={() => navigate(`/info/${data._id}`)}
      >
        {data.title}
      </td>
      <td className='p-2 text-center truncate'>{data.user.name}</td>
      <td className='p-2 text-center hidden sm:table-cell'>{data.views}</td>
      <td className='p-2 text-center hidden sm:table-cell'>
        {data.repliesCount}
      </td>
      <td className='p-2 truncate text-center hidden sm:table-cell'>
        {data.createdAt}
      </td>
    </tr>
  );
}

export default ListItem;
