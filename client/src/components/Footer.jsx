import React from 'react'
import { Mail } from 'lucide-react';
const Footer = () => {
  return (
    <div>
        {/* Footer */}
      <footer className=" py-12 px-6 bg-black border-t border-zinc-600 ">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                <Mail className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold text-white">EmailAI</span>
            </div>
            <p>© 2026 EmailAI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer