import React from 'react'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

const thdStyle = 'p-2'

const Products = () => {
  const products = [
    { id: 1, name: 'Laptop', price: '$1000', stock: 5 },
    { id: 2, name: 'Phone', price: '$500', stock: 10 },
    { id: 2, name: 'Phone', price: '$500', stock: 10 },
    { id: 2, name: 'Phone', price: '$500', stock: 10 },
    { id: 2, name: 'Phone', price: '$500', stock: 10 },
  ];

  const handleDeleteProduct = async () => {

  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 className='text-2xl font-bold'>Products</h2>
      <table style={{ width: '100%', border: '1px solid #ddd', marginTop: '20px' }}>
        <thead className='bg-[#2c2c2c] text-white'>
          <tr className='text-center'>
            <th className={`${thdStyle}`}>View</th>
            <th className={`${thdStyle}`}>ID</th>
            <th className={`${thdStyle}`}>Name</th>
            <th className={`${thdStyle}`}>iamge</th>
            <th className={`${thdStyle}`}>price</th>
            <th className={`${thdStyle}`}>Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {products.map((product, index) => (
            <tr key={product.id} className={`${(index % 2 === 0 ? 'bg-slate-200' : 'bg-white')}`}>
              <td><FaEye className='m-auto' /></td>
              <td className={`${thdStyle}`}>{product.id}</td>
              <td className={`${thdStyle}`}>{product.name}</td>
              <td className={`${thdStyle}`}>{product.image}</td>
              <td className={`${thdStyle}`}>{product.price}</td>
              <td className={`${thdStyle}`}>
                <div className='flex items-center justify-center gap-3'>
                  <Link to={'/dashboard/createProduct'} className='bg-green-600 rounded-md p-2 text-white'>Create</Link>
                  <Link to={'/dashboard/updateProduct/2'} className='bg-blue-500 rounded-md p-2 text-white'>Update</Link>
                  <button onClick={handleDeleteProduct} className='bg-red-600 rounded-md p-2 text-white'>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products