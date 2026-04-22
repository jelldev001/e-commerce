import React, { use } from 'react'
import { Link } from 'react-router-dom'
import useEcomeStore from '../store/Ecome_store'
const Navbar = () => {
    const carts = useEcomeStore((s) => s.carts)
    return (
        <nav className='bg-sky-600'>
            <div className=' mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex  items-center gap-6'>
                        <Link to={'/'} className='text-2xl font-bold'>KALEE SHOP</Link>
                        <Link to={'/'} >Home</Link>
                        <Link to={'/shop'} >Shop</Link>
                        <Link className='relative py-4' to={'/cart'}  >Cart
                            {
                                carts.length > 0 ? <span className='absolute top-0 left-6  bg-red-600  text-white px-2 rounded-full '>{carts.length}</span> : ''
                            }
                        </Link>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Link to={'/register'} >Register</Link>
                        <Link to={'/login'} >Login</Link>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar