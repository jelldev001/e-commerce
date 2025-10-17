import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Rigester() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  const handleOnchange = (e) => {

    console.log(e.target.name, e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSupmit = async (e) => {
    e.preventDefault()
   
    if(form.password !== form.confirmPassword) {
      return alert('confirmPassword is  not match')
    }
    console.log(form)
    //send to back 
    try {
      const res = await axios.post('http://localhost:3000/api/register',form)
      console.log(res)
      toast.success(res.data)
      navigate('/user')

    }catch (err) {
      
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }
  return (
    <div className=' '>
      Rigester
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
        confirm Password
        <input
          onChange={handleOnchange}
          type="text"
          name='confirmPassword'
          className='border' />
        <button className='bg-sky-700 text-white rounded-md mx-2 p-2' >Register</button>

      </form>
    </div>
  )
}

export default Rigester