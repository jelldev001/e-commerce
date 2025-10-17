import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutUser = () => {
  return (
    <div>
        <h1>User</h1>
        <hr /> 
        <Outlet/>   {/* Outlet ตรงนี้จะคลอบ element ต่างๆที่ได้กำนดใส่ใน layoutUser จาก folder routes -> AppRoutes  */}
    </div>
  )
}

export default LayoutUser