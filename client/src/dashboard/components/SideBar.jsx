import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { updateActiveLink } from '../../redux/slices/dashboard-slice';

function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch()
  const activeNow = useSelector(state => state.dashboardSlice.activeLink)

  useEffect(()=>{
    dispatch(updateActiveLink((location.pathname.split('/').includes('products') ? 'products' : 'orders')))
  },[])

  const [activeLink, setActiveLink] = useState(activeNow)

  console.log()

  useEffect(() => {
    setActiveLink(activeNow);
  }, [activeNow]);

  console.log(activeLink)

  return (
    <div style={{ width: '250px', backgroundColor: '#2c2c2c', padding: '20px' }} className='text-white'>
      <h2 className='text-3xl font-semibold mb-20 mt-5'>Dashboard</h2>
      <ul className='flex flex-col gap-8'>
      <Link 
        onClick={()=>dispatch(updateActiveLink('orders'))}
        className={`py-3 px-4 ${activeLink === 'orders' ? "bg-orange-500" : 'bg-neutral-600 hover:bg-neutral-700'} rounded-md  transition-all duration-300`}
        to="/dashboard/orders">Orders
        </Link>
        <Link 
        onClick={()=>dispatch(updateActiveLink('products'))}
        className={`py-3 px-4 ${activeLink === 'products' ? "bg-orange-500" : 'bg-neutral-600 hover:bg-neutral-700'} rounded-md  transition-all duration-300`}
          to="/dashboard/products">Products
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
