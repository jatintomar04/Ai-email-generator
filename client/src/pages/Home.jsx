import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { Mail, Zap, TrendingUp, Users, CheckCircle, ArrowRight, Play, Code } from 'lucide-react';
import { useSelector } from 'react-redux';

const Home = () => {

  const {user, isLoading, isError , isSuccess, message} = useSelector(state => state.auth)
  // Added useState to make the "Watch Demo" button functional
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    /* Changed bg-background to a specific dark color (zinc-950) to ensure it's black regardless of CSS variables */
    <div className="min-h-screen bg-[#030303] text-zinc-100 overflow-hidden selection:bg-accent/30">
      
     

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background gradient orbs - kept as requested but adjusted for dark mode */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 opacity-60"></div>
        <div className="absolute -bottom-40 left-0 w-72 h-72 bg-amber-600/5 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-amber-500/20">
            <span className="text-sm font-medium text-blue-500">AI-Powered Cold Email Generation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight text-white">
            Generate{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              personalized cold emails
            </span>{' '}
            in seconds
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto text-balance">
            Stop spending hours writing cold emails. Our AI analyzes your prospects and generates highly personalized, contextual emails that get replies.
          </p>
{
  !user?.isVerified ?  (

    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">

      <Link
        to="/login"
        className="px-8 py-3 rounded-full bg-blue-500 text-black font-semibold hover:bg-blue-400 transition flex items-center gap-2"
      >
        Start Free Trial
        <ArrowRight className="w-4 h-4" />
      </Link>

      <button
        onClick={() => setIsVideoOpen(true)}
        className="px-8 py-3 rounded-full border border-zinc-800 bg-zinc-900/50 text-white hover:bg-zinc-800 transition flex items-center gap-2"
      >
        <Play className="w-4 h-4 fill-current" />
        Watch Demo
      </button>

    </div>

  ) : (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">

    <Link
      to="/generate/mail"
      className="px-6 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 transition"
    >
      Generate Email
    </Link>
    </div >

  )
}  

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
            <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <div className="text-2xl font-bold text-blue-500 mb-1">5x</div>
              <div className="text-xs text-zinc-500">Higher Reply Rates</div>
            </div>
            <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <div className="text-2xl font-bold text-blue-500 mb-1">30s</div>
              <div className="text-xs text-zinc-500">Email Generation</div>
            </div>
            <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <div className="text-2xl font-bold text-blue-500 mb-1">99%</div>
              <div className="text-xs text-zinc-500">Accuracy Rate</div>
            </div>
          </div>

          {/* Screenshot placeholder */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/30">
            <div className="aspect-video bg-gradient-to-b from-zinc-800/20 to-transparent flex flex-col items-center justify-center gap-3">
              <Code className="w-12 h-12 text-blue-500 opacity-40" />
              <div className="text-zinc-500 font-medium">Dashboard Preview</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Powerful Features</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">Everything you need to master cold email outreach</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'AI Email Generation', description: 'Intelligent algorithms analyze your prospects and generate contextual, personalized emails in seconds.' },
              { icon: TrendingUp, title: 'Performance Analytics', description: 'Track open rates, click-through rates, and replies with detailed insights and optimization recommendations.' },
              { icon: Users, title: 'Prospect Management', description: 'Manage unlimited prospect lists with advanced segmentation and targeting capabilities.' },
              { icon: CheckCircle, title: 'A/B Testing', description: 'Test different variations of your emails automatically and identify what works best for your audience.' },
              { icon: Mail, title: 'Multi-Channel Outreach', description: 'Sync with Gmail, Outlook, and leading CRM platforms for seamless workflow integration.' },
              { icon: Zap, title: 'Smart Follow-ups', description: 'Automatic intelligent follow-up sequences that adapt based on prospect engagement.' },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-amber-500/30 transition group">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition">
                  <feature.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-zinc-100">{feature.title}</h3>
                <p className="text-sm text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 border-t border-zinc-900 bg-zinc-900/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">How It Works</h2>
          <div className="space-y-12">
            {[
              { step: '01', title: 'Upload Your Prospects', description: 'Import your prospect list via CSV, API, or manual entry. Our AI analyzes LinkedIn profiles and company data.' },
              { step: '02', title: 'Configure Your Template', description: 'Set your tone, value proposition, and key messaging. Our AI learns from your preferences.' },
              { step: '03', title: 'Generate Personalized Emails', description: 'Watch as our AI generates unique, contextual emails for each prospect in your list.' },
              { step: '04', title: 'Review & Send', description: 'Review emails, make edits, and send directly from EmailAI or your favorite email provider.' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 md:gap-12">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <span className="text-lg font-bold text-blue-500">{item.step}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold mb-2 text-zinc-100">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Simple Pricing</h2>
          <p className="text-center text-zinc-500 mb-16 max-w-2xl mx-auto">Start free and scale as you grow.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: 'Free', features: ['Up to 100 emails/month', 'Basic AI personalization', 'Email templates', 'CSV import'] },
              { name: 'Professional', price: '$99', highlighted: true, features: ['5,000 emails/month', 'Advanced personalization', 'A/B testing', 'CRM integration', 'Priority support'] },
              { name: 'Enterprise', price: 'Custom', features: ['Unlimited emails', 'Custom AI training', 'Dedicated account manager', 'API access', 'SLA guarantee'] },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-8 transition ${
                  plan.highlighted
                    ? 'border-amber-500 bg-zinc-900 scale-105 shadow-2xl shadow-amber-500/10'
                    : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900'
                }`}
              >
                <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-zinc-500">/month</span>}
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-medium mb-8 transition ${
                    plan.highlighted
                      ? 'bg-blue-500 text-black hover:bg-amber-400'
                      : 'border border-zinc-700 text-white hover:bg-zinc-800'
                  }`}
                >
                  Get Started
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-sm text-zinc-400">
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;