import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import useEcomeStore from '../../store/Ecome_store';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate()
  const actionLogin = useEcomeStore((state) => state.actionLogin)
  const user = useEcomeStore((state) => state.user)
  console.log("user form zustand", user)
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
  const roleRedirect = (role) => {
    if (role === 'admin') {
      Navigate('/admin')
    } else {
      Navigate(-1)
    }
  }
  return (
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
            <p className="text-gray-500">Please log in to continue.</p>
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

            {/* Remember & Forgot Password */}
            {/* <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-gray-600">จดจำฉันไว้</span>
              </label>
              <a href="#" className="text-sky-600 hover:text-sky-700 font-medium">
                ลืมรหัสผ่าน?
              </a>
            </div> */}

            {/* Submit Button */}
            <button
              onClick={handleSupmit}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
            >
             Login
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account yet? </span>
            <Link to="/register" className="text-sky-600 hover:text-sky-700 font-semibold">
              register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login