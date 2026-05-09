import React, { useEffect, useState } from 'react';
import { Send, RefreshCw, Copy, Sparkles, User, Target, MessageSquare, Wand2, Terminal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { generateEmail } from '../features/email/emailSlice';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';


const GenerateEmail = () => {
  const { generatedEmail,singleEmail,isLoading, isError, isSuccess, message } = useSelector(state => state.email)

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    purpose: '',
    tone: 'Professional',
    instructions: ''
  });

  useEffect(() => {

   if (singleEmail) {
      setFormData({
        from : singleEmail.from || "",
         to: singleEmail.to || "",
         purpose: singleEmail.purpose || "",
         tone: singleEmail.tone || "",
         instructions: singleEmail.instructions || ""
      });
   }

}, [singleEmail]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async (e) => {

    e.preventDefault();

    try {

      setIsGenerating(true);

      const response = await dispatch(
        generateEmail(formData)
      ).unwrap();

      console.log(response);

      setResult(response.email);

    } catch (error) {

      console.log(error);

    } finally {

      setIsGenerating(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 p-6 lg:p-12 relative overflow-hidden mt-16 ">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Left Column: Inputs */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Wand2 className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">AI Email Drafter</h1>
          </div>

          <form onSubmit={handleGenerate} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl backdrop-blur-md space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">From</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
                  <input
                    required
                    value={formData.from }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 focus:border-blue-500/50 outline-none transition-all text-sm"
                    placeholder="Your Name"
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">To</label>
                <div className="relative">
                  <Target className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
                  <input
                  value={formData.to}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 focus:border-blue-500/50 outline-none transition-all text-sm"
                    placeholder="Recipient Name"
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Purpose of Email</label>
              <input
              value={formData.purpose}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 focus:border-blue-500/50 outline-none transition-all text-sm"
                placeholder="e.g. Requesting a meeting, following up on invoice"
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Tone</label>
              <select
                value={formData.tone || formData.tone}
                name='tone'
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 focus:border-blue-500/50 outline-none transition-all text-sm appearance-none cursor-pointer"
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Academic (Professor)</option>
                <option>Persuasive</option>
                <option>Urgent</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1 flex items-center gap-2">
                <Terminal  className="w-3 h-3" /> Specific Instructions
              </label>
              <textarea value={formData.instructions}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 focus:border-blue-500/50 outline-none transition-all text-sm h-24 resize-none"
                placeholder="Mention the deadline is Friday, include the attachment link..."
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-blue-500 text-black font-bold py-3.5 rounded-xl hover:bg-blue-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Generate Email</>}
            </button>
          </form>
        </div>

        {/* Right Column: Output */}
        <div className="h-full flex flex-col ">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Generated Output
          </label>
          <div className="flex-1 bg-zinc-900/20 border border-zinc-800 rounded-3xl p-8 relative min-h-[400px]">
            {(result || singleEmail?.content)  ?  (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <pre  className="whitespace-pre-wrap font-sans text-zinc-300 text-sm leading-relaxed">
                  {result  || singleEmail.content}
                </pre>

                <div className="absolute bottom-6 left-6 right-6 flex gap-3 mt-20">
                  <button
                    onClick={async () => {

                      try {

                        await navigator.clipboard.writeText(result);

                        toast.success("Copied Successfully");

                      } catch (error) {

                        toast.error("Copy Failed");
                      }

                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Content
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-blue-500/30 hover:bg-blue-500/10 text-blue-500 rounded-xl text-sm font-medium transition"
                  >
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} /> Regenerate
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 italic">
                <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                <p>Fill out the form and click generate to see the magic</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GenerateEmail;