
import React, { useEffect, useRef, useState } from 'react';
import { Mail, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { verifyOtp } from '../features/auth/authSlice';
import { useLocation } from "react-router-dom";
import Loading from '../components/Loading';

const VerifyotpPage = () => {

 const location = useLocation();

  const { email } = location.state || {};
  console.log(email)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user, isLoading, isOtpVerified, isError, message, isSuccess } =
    useSelector(state => state.auth);


  // OTP state
  const [otp, setOtp] = useState(new Array(6).fill(""));

  // refs
  const inputRefs = useRef([]);

  // Handle OTP change
  const handleChange = (e, index) => {

    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);

    // move next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify OTP
  const handleVerify = async () => {

    const finalOtp = otp.join("");
    const result = await dispatch(
      verifyOtp({

        email: email,
        otp: finalOtp
      })
    );

    if (result.type.includes("fulfilled")) {
      toast.success("OTP Verified Successfully");
      navigate("/login");
    }
  };
   useEffect(() => {
  
    if (user?.isVerifyied) {
      navigate("/generate/mail");
    }
  
    if (isError && message) {
      toast.error(message);
    }
  
  }, [isSuccess, isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col justify-center items-center px-6 relative overflow-hidden py-8">

      {/* Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/5 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-md p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md shadow-2xl text-center mt-20">

        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-zinc-500 hover:text-blue-500 transition-colors mb-6 text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to edit details
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-blue-500" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          Verify your email
        </h1>

        <p className="text-zinc-500 text-sm mb-2">
          We've sent a 6-digit code to:
        </p>

        <p className="text-blue-500 text-sm mb-8 font-medium">
          email
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-2 sm:gap-3 justify-center mb-8">

          {otp.map((data, index) => (

            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              ref={(el) => (inputRefs.current[index] = el)}

              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}

              className="w-11 h-14 sm:w-12 sm:h-16 bg-zinc-950 border border-zinc-800 rounded-xl text-center text-xl font-bold text-amber-500 focus:outline-none focus:border-amber-500"
            />
          ))}

        </div>

        {/* Verify Button */}
        <button
          className="w-full bg-blue-500 text-black font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all mb-6"
          onClick={handleVerify}
        >
          Verify & Complete
        </button>

        {/* Resend */}
        <p className="text-sm text-zinc-500">
          Didn't receive the code?{" "}

          <button className="text-blue-500 hover:underline font-medium">
            Resend OTP
          </button>
        </p>

      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center gap-2 opacity-50">
        <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center">
          <Mail className="w-3 h-3 text-blue-500" />
        </div>

        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
          EmailAI Secure
        </span>
      </div>

    </div>
  );
};

export default VerifyotpPage;

