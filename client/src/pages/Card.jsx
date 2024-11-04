import React from 'react'
import Product_img from '../assets/shop.jpg'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
    <div className='bg-gray-200 hover:bg-gray-300 transition-colors shadow-lg p-4 rounded-lg overflow-hidden'>
      <div className="img overflow-hidden rounded-md">
        <img src={Product_img} className='max-w-full' alt="" />
      </div>
      <div className="content">
        <h1 className='text-orange-500 font-semibold' style={{fontSize:"24px"}}>Name</h1>
        <p className='w-full text-black' style={{ wordBreak: 'break-word' }}>
          gggggggggggggggggggggggggggggggggjfdskfjkjfkdsjfkjdskfjdsfdsjfksjg...
        </p>
        <p className='py-2 font-semibold text-black' style={{fontSize:"24px"}}>100$</p>
        <Link to={'/details_product/id'}>
          <button className='btn-style w-full my-2' style={{backgroundColor:"green"}}>Details</button>
        </Link>
        <button className='btn-style w-full my-2'>Add to cart</button>
      </div>
    </div>
  )
}

export default Card