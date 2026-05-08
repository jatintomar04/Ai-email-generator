import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { Mail, Lock, ArrowRight, User, Phone, Shield, ArrowLeft } from 'lucide-react';
import { registerUser } from '../features/auth/authSlice';

const RegisterPage = () => {

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })
  const { name, email, password, phone } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(formData))
  }

  useEffect(() => {
  if (user) {
    navigate("/verify-otp",{
      state: {
    email: formData.email
  }
    });
  }
  if (isError && message) {
    toast.error(message);
  }

}, [isSuccess, isError, message, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col justify-center items-center px-6 py-8 relative overflow-hidden ">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/5 rounded-full blur-[120px] -z-10"></div>


      <>
        <div className="mb-8 flex flex-col items-center gap-2 text-center mt-17">

          <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
          <p className="text-zinc-500 text-sm">Join EmailAI to start your outreach</p>
        </div>

        <div className="w-full max-w-md p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md shadow-2xl transition-all">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
                <input required name="name" type="text" value={name} placeholder="John Doe" onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-600" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-400 ml-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
                <input required value={phone} name="phone" type="tel" placeholder="+1 (555) 000-0000" onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-600" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
                <input required value={email} name="email" type="email" placeholder="name@company.com" onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-600" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-400 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
                <input required value={password} name="password" type="password" placeholder="••••••••" onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-600" />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-black font-bold py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group mt-4">
              Create Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </>


      <p className="mt-8 text-zinc-500 text-sm">
        Already have an account?{' '}

        <Link
          to="/login"
          className="text-blue-500 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;