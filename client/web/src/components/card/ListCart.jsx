import React from 'react'
import { List } from 'lucide-react';
import { Link } from 'react-router-dom';
import useEcomeStore from '../../store/Ecome_store';
import {useNavigate } from 'react-router-dom';
import { AddUserCart } from '../../api/user';
import { toast } from 'react-toastify';
const ListCart = () => {
    const cart = useEcomeStore((state) => state.carts)
    const getTotalPrice = useEcomeStore((state) => state.getTotalPrice)
    const token = useEcomeStore((state) => state.token)
    const user = useEcomeStore((state) => state.user)
    const navigate = useNavigate()
    const hadleSaveCart = async () => {
        await AddUserCart(token, { cart })
            .then((res) => {
                console.log(res)
                toast.success("save cart success")
                navigate('/checkout')
            })
            .catch((err) => {
                console.log(err)
                toast.error("failed to save cart")
            })
    }
    return (
        <div className='bg-gray-100 p-4 rounded-md shadow-md '>
            {/* //header */}
            <div className='flex gap-2 bg-white p-4 rounded-md shadow-md items-center mb-4'>
                <List size={32} />
                <p className='text-2xl font-bold'>list cart {cart.length}  </p>
            </div>
            {/* //list */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                {/* //left */}
                <div className='col-span-2 '>
                    {cart.map((item, index) =>
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
                                        <p className='text-sm'>{item.description} X {item.count}</p>
                                    </div>
                                </div>
                                {/* right */}
                                <div className='font-bold text-green-500'>{(item.price * item.count).toLocaleString('th-TH')} </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* //right */}
                <div className='bg-white p-4 rounded-md shadow-md space-y-4' >
                    <p className='font-bold text-2xl'>Total :</p>
                    <div className='flex justify-between items-center font-bold text-xl'>
                        <span>Total net</span>
                        <span className='text-green-500'>{getTotalPrice().toLocaleString('th-TH')}</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {user ?
                            <Link>
                                <button
                                    onClick={hadleSaveCart}
                                    className='bg-blue-500 w-full text-lg hover:cursor-pointer hover:bg-blue-600 text-white py-2 px-4 rounded-md '>Checkout</button>
                            </Link> :
                            <Link to='/login'>
                                <button className='bg-blue-500 w-full text-lg hover:cursor-pointer hover:bg-blue-600 text-white py-2 px-4 rounded-md '>Login</button>
                            </Link>
                        }
                        <Link to='/shop'>
                            <button className='bg-red-500 w-full text-lg hover:cursor-pointer hover:bg-red-600 text-white py-2 px-4 rounded-md '>Edit</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCart