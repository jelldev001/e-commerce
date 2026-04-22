import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useEcomeStore from '../store/Ecome_store'
import SearchCart from '../components/card/SearchCart'
import { Car } from 'lucide-react'
import CartCard from '../components/card/CartCard'
const Shop = () => {
  const getProduct = useEcomeStore((state) => state.getProduct)
  const products = useEcomeStore((state) => state.products)
  useEffect(() => {
    getProduct()
  }, [])
  return (
    <div className='flex '>
      {/* search bar */}
      <div className='w-1/4 bg-gray-100 h-screen p-4'>
        <SearchCart/>
      </div>
      {/* product */}
      <div className='w-1/2 bg-gray-200 h-screen p-4 overflow-y-auto'>
        <p className='mb-2 text-2xl font-bold '>All product</p>
        <div className='flex flex-wrap gap-6'>
          {/* product card */}
          {products.map((item, index) =>
            <ProductCard key={index} item={item} />
          )}

        </div>
      </div>
      {/* cart */}
      <div className='w-1/4 bg-gray-100 h-screens p-4 overflow-y-auto'>
        <CartCard/>
      </div>
    </div>
  )
}

export default Shop