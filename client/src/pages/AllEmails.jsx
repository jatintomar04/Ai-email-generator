import React, { useEffect, useState } from 'react';
import { 
  Search, Mail, Trash2, Copy, ExternalLink, 
  Filter, Calendar, MoreVertical, CheckCircle2 
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { DeleteEmail, getAllEmails, getsingleEmail } from '../features/email/emailSlice';
import { useNavigate } from 'react-router-dom';


const AllEmails = () => {
  const {emails,isLoading, isError,message}=  useSelector((state)=> state.email)
 const dispatch = useDispatch()
const navigate = useNavigate()

 useEffect(()=>{
    dispatch(getAllEmails())
     if(isError && message) {
      toast.error(message)
    }
 },[dispatch,isError,message])


  const [search, setSearch] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Content copied to clipboard!", {
      style: { background: '#18181b', color: '#f59e0b', border: '1px solid #27272a' }
    });
  };

  const handleSingleEmail = async (id) => {

   const result = await dispatch(getsingleEmail(id));
   if (result.type.includes("fulfilled")) {
      navigate("/generate/mail");
   }
};

const handleDeleteEmail = async ( id) => {
 
   const result = await dispatch(DeleteEmail(id));
    if (result.type.includes("fulfilled")) {
    toast.success("Email Deleted Successfully");
  
  }
  
};

  if (isLoading) {
  return <Loading />;
}


  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 p-4 md:p-10 mt-17">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Email Vault</h1>
            <p className="text-zinc-500 text-sm mt-1">Review and manage all your AI-generated drafts.</p>
          </div>
          
          <div className="relative group w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by recipient or purpose..."
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-all shadow-2xl"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Generated', value: emails.length, icon: Mail },
            { label: 'Saved Drafts', value: '12', icon: CheckCircle2 },
            { label: 'This Month', value: '5', icon: Calendar },
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <stat.icon className="text-blue-500" size={20} />
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Emails Table */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="p-5 text-zinc-400 font-semibold text-sm">Recipient</th>
                  <th className="p-5 text-zinc-400 font-semibold text-sm">Purpose</th>
                  <th className="p-5 text-zinc-400 font-semibold text-sm">Tone</th>
                  <th className="p-5 text-zinc-400 font-semibold text-sm">Date</th>
                  <th className="p-5 text-zinc-400 font-semibold text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {emails.filter(e => e.to.includes(search) || e.purpose.includes(search)).map((email) => (
                  <tr key={email._id} className="hover:bg-zinc-800/20 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-blue-500">
                          {email.to[0].toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-zinc-200">{email.to}</span>
                      </div>
                    </td>
                    <td className="p-5 text-sm text-zinc-400">{email.purpose}</td>
                    <td className="p-5">
                      <span className="px-2.5 py-1 bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase rounded-md border border-zinc-700">
                        {email.tone}
                      </span>
                    </td>
                    <td className="p-5 text-sm text-zinc-500"> {new Date(email.createdAt).toLocaleString()}</td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => copyToClipboard(email.content)}
                          className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-blue-500 transition-all"
                        >
                          <Copy size={16} />
                        </button>
                        <button onClick={()=>handleSingleEmail(email._id)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-all">
                          <ExternalLink size={16} />
                        </button>
                        <button onClick={()=>handleDeleteEmail(email._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-500 hover:text-red-500 transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {emails.length === 0 && (
            <div className="py-20 text-center">
              <Mail className="mx-auto text-zinc-800 mb-4" size={48} />
              <p className="text-zinc-500">No generated emails found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllEmails;