import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import History from '../pages/History'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layouts/Layout'
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import LayoutAdmin from '../layouts/LayoutAdmin'
import LayoutUser from '../layouts/LayoutUser'
import HomeUser from '../pages/user/HomeUser'
import Manage from '../pages/admin/Manage'
import ProtectRouteUser from './ProtectRouteUser'
import ProtectRouteAdmin from './ProtecRouteAdmin'
import EditeProduct from '../pages/admin/EditeProduct'
import Payment from '../pages/Payment'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index : true, element: <Home /> }, /* index : true คือหน้าแรก */
            { path: '/shop', element: <Shop /> },
            { path: '/cart', element: <Cart /> },
            { path: '/history', element: <History /> },
            { path: '/checkout', element: <Checkout /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
           
        ]
    },
    {
        path : '/admin',
        element : <LayoutAdmin/>,
        // element : <ProtectRouteAdmin element={<LayoutAdmin/>} />,
        children : [ 
            { index :true ,element : <Dashboard/>},
            {path : '/admin/category',element  : <Category/>},
            {path : '/admin/product',element :<Product/>}, 
            { path: '/admin/manage', element: <Manage /> },
            { path: '/admin/product/edite/:id', element: <EditeProduct /> },

        ]
    },
    {
        path : '/user',
        element :<LayoutUser/>,
        // element :<ProtectRouteUser element ={<LayoutUser/>}/>, //เป๊นการส่ง pops ไปยัง
        children : [
            {index :true , element :<HomeUser/>},
            {path:'/user/payment' , element :<Payment/>}
        ]
    }, {
        path : '/404',
        element : "not found"
    }

])

function AppRoutes() {


    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default AppRoutes