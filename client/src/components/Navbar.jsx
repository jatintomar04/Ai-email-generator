import React from 'react'
import { Link, useNavigate,useLocation  } from "react-router-dom";
import { Mail, Zap, TrendingUp, Users, CheckCircle, ArrowRight, Play, Code } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';


const Navbar = () => {
  const {user} = useSelector(state => state.auth)
const dispatch = useDispatch()
const navigate = useNavigate()
const location = useLocation();

const hideNavLinks =
  location.pathname === "/login" ||
  location.pathname === "/register";
 
  const handleButtons = 
  location.pathname === "/all-emails" ;


const handleLogout =()=>{
  dispatch(logoutUser())
  navigate("/login")
}

  return (
    <div > 
         {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black backdrop-blur-xl border-b border-zinc-600 shadow-xl shadow-blue-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to = "/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <Mail className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white">EmailAI</span>
          </Link>
         {
          !user && !hideNavLinks &&  (
             <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition">
              Features
            </a>
            <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition">
              Pricing
            </a>
           
          </div>
          )
         }
            {/* conditional  buttons   */}
          {
            user ?.isVerified ?(
                  <div className='flex  gap-3'>
              {
                !handleButtons ? ( <Link
                    to="/all-emails"
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm hover:bg-zinc-800 transition"
                  >
                    {/* <FileText className="w-4 h-4" /> */}
                    Generated Emails
                  </Link>
                 ):(
                   <Link
                    to="/generate/mail"
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm hover:bg-zinc-800 transition"
                  >
                    {/* <FileText className="w-4 h-4" /> */}
                    Generate new Email
                  </Link>
                 )
              }
              <button onClick={handleLogout} className="px-6 py-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition">
                Logout
              </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition"
              >
                Get Started
              </Link>
            )
          }
        </div>
      </nav>
    </div>
  )
}

export default Navbar