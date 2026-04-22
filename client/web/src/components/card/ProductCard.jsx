import React from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomeStore from '../../store/Ecome_store';
const ProductCard = (pops) => {
  const actionAdtoCart = useEcomeStore((state)=>state.actionAdtoCart)
  const { item } = pops
  // console.log(item) 
  return (
    <div className='border rounded-md shadow-md p-2 w-50 hover:scale-110 transition-all duration-300'>
      {item.images && item.images.length > 0 ?
        <img
          src={item.images[0].url}
          alt="Product"
          className='w-full h-30 object-cover  rounded-md '
        />
        :
        <div className='w-full h-30 bg-gray-300 rounded-md flex items-center justify-center text-gray-500'>
          No image
        </div>
      }

      <div className='py-2'>
        <p className='text-xl'>{item.title} </p>
        <p className='text-sm text-gray-500'>{item.description} </p>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-xl font-bold'> {item.price.toLocaleString('th-TH')} </span>
        <button onClick={ ()=>actionAdtoCart (item)} className='hover:cursor-pointer bg-blue-500 rounded-md p-2 hover:bg-blue-600 text-white'> <ShoppingCart size={24} /></button>
      </div>
    </div>
  )
}

export default ProductCard