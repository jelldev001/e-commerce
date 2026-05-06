import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
function Rigester() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      {/* Rigester
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

      </form> */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-sky-50 p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl mx-auto flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Wellcome</h2>
            {/* <p className="text-gray-500">Please log in to continue.</p> */}
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="example@email.com"
                  name="email"
                  value={form.email}
                  onChange={handleOnchange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  value={form.password}
                  onChange={handleOnchange}
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>


            {/*  confrim password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleOnchange}
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            

            {/* Submit Button */}
            <button
              onClick={handleSupmit}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
            >
              Register
            </button>
          </div>

          {/* Divider */}
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">หรือ</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Rigester