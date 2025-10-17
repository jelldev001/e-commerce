import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const LoadingToredirect = () => {
    const [count, setCount] = useState(3)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currenCount) => {
                if (currenCount === 1) {
                    clearInterval(interval) 
                    setRedirect(true)

                }
                return currenCount - 1
            })
        }, 1000)
        return ()=>{clearInterval(interval)} //clear ข้อมูลทังหมดก่อนจื่งทำงานรอบไหม่
    }, [])
    if (redirect){
       return  <Navigate to ={'/'}></Navigate>
    }
    return (
        <div>No Permission,Redirect in {count} </div>
    )
}

export default LoadingToredirect