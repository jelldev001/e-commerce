import React, { useState, useEffect } from 'react'
import { listUserCart, saveAddress } from '../../api/user'
import useEcomstor from '../../store/Ecome_store'
import { toast } from "react-toastify"
const SummaryCart = () => {
    const token = useEcomstor((s) => s.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)
    useEffect(() => {
        dhlGetUserCart(token)
    }, [])
    const dhlGetUserCart = () => {
        listUserCart(token)
            .then((res) => {
                console.log(res.data.products)
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            }).catch((err) => {
                console.log(err)
            })
    }
    const hdlSaveAddress = () => {
        console.log(address)
        if (!address) {
            return toast.warning("Please fil data address frist")
        }
        saveAddress(token, address)
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
                setAddressSaved(true)
            })
            .catch((err) => {
                console.log(err)
            })

    }
    console.log("products", products)
    return (
        <div className='mx-auto'>
            <div className='flex flex-warp gap-4'>
                {/* left */}
                <div className='w-2/4'>
                    <div className='bg-gray-200 rounded-md shadow-md p-4 space-y-4 '>
                        <h1 className='font-bold text-lg'>Location</h1>
                        <textarea
                            onChange={((e) => setAddress(e.target.value))}
                            className='w-full bg-white ' name="" id=""></textarea>
                        <button
                            onClick={hdlSaveAddress}
                            className='bg-sky-400 px-4 rounded-md text-white hover:bg-sky-600
                        hover:translate-y-1 hover:duration-200 hover:scale-105 hover:cursor-pointer py-2'>Save Address</button>
                    </div>
                </div>
                {/* right */}
                <div className='w-2/4'>
                    <div className='bg-gray-200 rounded-md shadow-md p-4 space-y-4'>
                        <h1 className='font-bold text-lg'>Your Order</h1>
                        {/* item list  */}

                        {products?.map((item, index) =>
                            <div key={index} className='flex justify-between items-end'>
                                {/* left */}
                                <div>
                                    <p className='font-bold'> Title : {item.product.title} </p>
                                    <p className='text-gray-600'>Count : {item.count} x {item.product.price}</p>
                                </div>
                                {/* right */}
                                <div>
                                    <p className='text-green-400'> {item.count * item.product.price} </p>
                                </div>
                            </div>
                        )}



                        {/* total */}
                        <div>
                            <div className='flex justify-between'>
                                <p>ค่าจัดส่ง</p>
                                <p className='text-red-500'>000</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>ส่วนลด</p>
                                <p className='text-red-500'>000</p>
                            </div>
                        </div>
                        {/* total */}
                        <div>
                            <div className='flex justify-between'>
                                <p className='font-bold'>ยอดรวมสุทธิ</p>
                                <p className='font-bold text-green-400'> {cartTotal.toLocaleString('th-TH')}</p>
                            </div>
                        </div>
                        <div >
                            <butbton
                            disabled = {!addressSaved}
                            className='bg-green-400 items-center w-full p-2 text-2xl text-white rounded-md' >Check in </butbton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryCart