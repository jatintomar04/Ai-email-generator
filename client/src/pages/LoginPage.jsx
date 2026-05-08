import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import  { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight,Globe,UserKey } from 'lucide-react';
import Loading from '../components/Loading';
import { loginUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
const {user, isLoading, isError , isSuccess, message} = useSelector(state => state.auth)

const dispatch = useDispatch()
const navigate = useNavigate()

const [formData, setformData] = useState ({
  
  email : "",
  password : "",
})
const {email , password} = formData 

const handleChange = e => {
  setformData({
    ...formData,
    [e.target.name] : e.target.value
  })
}

const handleSubmit = e => {
  e.preventDefault()
  dispatch(loginUser(formData))
}

useEffect (()=>{
  if(user?.isVerified){
    navigate(("/generate/mail"))
  }
  

  if(isError && message)
  toast.error(message)
},[user , isError , message])

if (isLoading) {
  return<Loading />
}

 

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col justify-center items-center px-6 relative overflow-hidden mt-17">

      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/5 rounded-full blur-[120px] -z-10"></div>

      {/* Header */}
      <div className="mb-8 flex flex-col items-center gap-2">
        {/* <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
          <Mail className="w-7 h-7 text-black" />
        </div> */}
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-zinc-500 text-sm">Login to your account</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md shadow-2xl">

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                 name="email"
                placeholder="name@company.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500"
                value={email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-400">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500"
                value={password}
                onChange={handleChange }
              />
            </div>
          </div>

          {/* Login Button */}
          <button onSubmit={handleSubmit} type='submit' className="w-full bg-blue-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700">
            Login
            <ArrowRight size={16} />
          </button>

        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="border-t border-zinc-800"></div>
          <span className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#0c0c0e] px-2 text-xs text-zinc-500">
            OR
          </span>
        </div>

        {/* Social Buttons */}
        <div >

          <Link to = "/login/mail" className="flex w-full items-center justify-center gap-2 py-2.5 border border-zinc-800 rounded-xl hover:bg-zinc-800 text-sm">
            <UserKey  size={16} />
            Login with Google
          </Link>

        </div>

      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-zinc-500">
        Don’t have an account?{" "}
        <Link to ="/register" className="text-blue-500 cursor-pointer">Sign up</Link>
      </p>

    </div>
  );
};

export default LoginPage;