import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import VerifyotpPage from './VerifyotpPage';
import { useDispatch } from 'react-redux';
import { loginWithEmail } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginwithGmail = () => {

  const dispatch = useDispatch()
  const navigate =useNavigate()
  
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); 
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e) => {

    e.preventDefault();

    const result = await dispatch(
      loginWithEmail({ email })
    );

    if (result.type.includes("fulfilled")) {

      navigate("/verify-otp", {
        state: {
          email: email
        }
      });

    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col justify-center items-center px-6 relative overflow-hidden mt-16">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-md transition-all duration-500">
        
        {step === 1 ? (
          /* --- Step 1: Email Entry --- */
          <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] mb-4">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h1 className="text-2xl font-bold text-white">Login to EmailAI</h1>
              <p className="text-zinc-500 text-sm mt-2 text-center">
                Enter your email to receive a login code
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button 
                disabled={isLoading}
                className="w-full bg-blue-500 text-black font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Login Code
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* --- Step 2: OTP Entry (Using your component) --- */
          <VerifyotpPage email={email} onBack={() => setStep(1)} />
        )}
      </div>

      {step === 1 && (
        <p className="mt-8 text-zinc-500 text-sm animate-in fade-in duration-700">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 font-medium hover:underline">
            Sign up for free
          </a>
        </p>
      )}
    </div>
  );
};

export default LoginwithGmail;