import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard,ShoppingCart,LogOut, ShoppingBag,ChartNoAxesGantt  } from 'lucide-react';

const SidebarAdmin = () => {
    return (
        <div className='bg-gray-600 w-64 text-gray-400 flex flex-col h-screen'>
            <div className='bg-gray-800 h-24 flex items-center justify-center text-2xl font-bold'>Admin panel</div>
            <nav className='flex-1 p-4 space-y-2 '>
                <NavLink
                    end
                    to={'/admin'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md '
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded flex items-center px-4 py-2'
                    }
                >
                    <LayoutDashboard /> Dashboard
                </NavLink>
                <NavLink
                    to={'/admin/manage'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md '
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded flex items-center px-4 py-2'
                    }
                >
                    <ChartNoAxesGantt /> Manage
                </NavLink>
                <NavLink
                    to={'/admin/category'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md '
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded flex items-center px-4 py-2'
                    }
                >
                    < ShoppingBag /> Category
                </NavLink>
                <NavLink
                    to={'/admin/product'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md '
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded flex items-center px-4 py-2'
                    }
                >
                    <ShoppingCart /> Product
                </NavLink>
            </nav>
            <footer>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md '
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded flex items-center px-4 py-2'
                    }
                >
                    <LogOut /> Logout
                </NavLink>
            </footer>
        </div>
    )
}

export default SidebarAdmin