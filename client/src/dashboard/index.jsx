import { Route, Routes } from 'react-router-dom';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';

function Dashboard() {
  return (
    <div className='flex min-h-[100vh]'>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <Routes>
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path='createProduct' element={<CreateProduct />} />
          <Route path='updateProduct/:id' element={<UpdateProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
