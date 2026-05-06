import React from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react';
import useEcomeStore from '../../store/Ecome_store';
import { Link } from 'react-router-dom';
const CartCard = () => {
    const carts = useEcomeStore((state) => state.carts)
    const actionUpdateQuantity = useEcomeStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomeStore((state) => state.actionRemoveProduct)
    const getTotalPrice = useEcomeStore((state) => state.getTotalPrice)
    // console.log(carts)

    return (
        <div>
            <h1 className='font-bold text-2xl'>CartCard</h1>
            {/* border */}
            <div className=''>
                {/* card */}
                {carts.map((item, index) =>
                    <div className='bg-white p-2 rounded-md shadow-md mb-3 ' key={index}>
                        {/* row1 */}
                        <div className='flex justify-between items-center mb-2'>
                            {/* left */}
                            <div className='flex gap-2 items-center'>
                                {
                                    item.images && item.images.length > 0
                                        ? <img src={item.images[0].url} alt="Product" className='h-16 w-16 flex justify-center items-center  rounded-md bg-gray-400' />
                                        : <div className='h-16 w-16 flex justify-center items-center  rounded-md bg-gray-400'>No img </div>
                                }
                                <div className=' '>
                                    <p className='font-bold'>{item.title}</p>
                                    <p className='text-sm'>{item.description}</p>
                                </div>
                            </div>
                            {/* right */}
                            <div
                                onClick={() => actionRemoveProduct(item.id)}
                                className='text-red-500 hover:cursor-pointer hover:text-green-600'>  <Trash2 className='h-6 w-6 ' /></div>
                        </div>
                        {/* row2 */}
                        <div className='flex justify-between items-center '>
                            {/* left */}
                            <div className='flex items-center'>
                                <button
                                    onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                    className='bg-gray-200 px-2 py-2 rounded-full hover:bg-gray-300 hover:text-red-500 active:bg-gray-300 hover:cursor-pointer'>
                                    <Minus className='h-4 w-4' />
                                </button>
                                <span className='px-2'>{item.count}</span>
                                <button
                                    onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                    className='bg-gray-200 px-2 py-2 rounded-full hover:bg-gray-300 hover:text-red-500 active:bg-gray-300 hover:cursor-pointer' >
                                    <Plus className='h-4 w-4' />
                                </button>
                            </div> 
                            {/* right */}
                            <div className='font-bold text-green-500'>{(item.price * item.count).toLocaleString('th-TH')} </div>
                        </div>
                    </div>

                )}

                {/* total */}
                <div className='flex justify-between items-center mt-4 p-2 font-bold'>
                    <span>Total :</span>
                    <span className='text-green-500'> {getTotalPrice().toLocaleString('th-TH')} </span>
                </div>
                {/* checkout button */}
                <div className='mt-4'>
                    <Link to ='/cart'>
                        <button className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 font-bold'>Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartCard