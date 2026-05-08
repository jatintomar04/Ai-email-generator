import React, { useEffect, useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';

const Loading = () => {
  const [progress, setProgress] = useState(0);

  // Simulate a loading progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className="relative mb-12">
          {/* Rotating Outer Ring */}
          <div className="absolute -inset-4 border-2 border-amber-500/20 rounded-full animate-[spin_4s_linear_infinite]"></div>
          <div className="absolute -inset-4 border-t-2 border-amber-500 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
          
          {/* Center Icon */}
          <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)] relative z-10">
            <Mail className="w-10 h-10 text-black animate-bounce" />
          </div>
          
          {/* Floating Sparkles */}
          <Sparkles className="absolute -top-6 -right-6 text-amber-500 w-6 h-6 animate-pulse" />
        </div>

        {/* Text and Percentage */}
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-white tracking-widest uppercase">
            Initializing AI
          </h2>
          <div className="flex flex-col items-center gap-2">
            {/* Progress Bar Track */}
            <div className="w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              {/* Active Progress */}
              <div 
                className="h-full bg-blue-500 transition-all duration-200 ease-out shadow-[0_0_15px_rgba(245,158,11,0.8)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-blue-500 font-mono text-sm tracking-tighter">
              {progress}%
            </span>
          </div>
          <p className="text-zinc-500 text-xs animate-pulse">
            Drafting your perfect outreach...
          </p>
        </div>
      </div>

      {/* Decorative Terminal Lines (bottom) */}
      <div className="absolute bottom-10 left-10 opacity-20 hidden md:block">
        <div className="font-mono text-[10px] text-blue-500 space-y-1">
          <p>{`> GET /api/v1/user/session`}</p>
          <p>{`> LOADING_NLP_MODELS...`}</p>
          <p>{`> SECURING_CONNECTION_READY`}</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;