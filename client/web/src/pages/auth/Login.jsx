import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import useEcomeStore from '../../store/Ecome_store';
import {  useNavigate } from 'react-router-dom';
function Login() {
  const Navigate = useNavigate()
  const actionLogin = useEcomeStore((state) => state.actionLogin)
  const user = useEcomeStore((state)=>state.user)
console.log("user form zustand",user)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleOnchange = (e) => {

    console.log(e.target.name, e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSupmit = async (e) => {
    e.preventDefault()
    // console.log(form)
    try {
      //   const res = await axios.post('http://localhost:3000/api/login',form)
      //   console.log(res.data)
     
      const res = await actionLogin(form)
      // console.log("res",res)
      const role = res.data.payload.role;
      // console.log(role)
      roleRedirect(role)
         toast.success("login success")
    } catch (err) {
        const errMsg = err.response?.data?.message
        toast.error(errMsg)
      console.log(err)

    }
  }
  const roleRedirect = (role)=>{
    if(role === 'admin'){
      Navigate('/admin')
    }else {
      Navigate('/user')
    } 
  } 
  return (
    <div className=' '>
      Login
      <form onSubmit={handleSupmit} >
        Email
        <input
          type="email"
          placeholder='Enter your email'
          className='border'
          name='email'
          onChange={handleOnchange}
        />
        password
        <input
          onChange={handleOnchange}
          type="text"
          placeholder='Enter your password '
          name='password'
          className='border' />
        <button className='bg-sky-700 text-white rounded-md mx-2 p-2' >Login</button>

      </form>
    </div>
  )
}

export default Login