import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import tallyMain from './../assets/tally_main.jpeg'; // Ensure path is correct

const Home = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      
      {/* --- HEADER --- */}
      <nav className="bg-[#1a407a] text-white px-6 py-3 flex items-center justify-between shadow-md">
        <div className="text-lg font-semibold tracking-wide uppercase">
          KANISHKA PVT LTD.
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 border border-white/40 px-4 py-1 rounded hover:bg-white/10 transition-colors text-sm uppercase tracking-wider"
          >
            Login <i className={`bi ${isDropdownOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`}></i>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-xl py-2 z-50 border border-gray-200">
              <button 
                onClick={() => { setIsDropdownOpen(false); navigate('/login'); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <i className="bi bi-person-gear"></i> Admin Login
              </button>
              <button 
                onClick={() => { setIsDropdownOpen(false); navigate('/login'); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <i className="bi bi-person-fill"></i> User Login
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* --- MAIN CONTENT (Image Area) --- */}
      <main className="grow flex items-center justify-center p-4">
        {/* If your child routes (like login) should replace this image, 
            keep the image logic here. If they should appear below it, move <Outlet /> below. */}
        <div className="w-full max-w-5xl">
          <img 
            src={tallyMain} 
            alt="Tally Power of Simplicity" 
            className="w-full h-[78vh] object-contain"
          />
        </div>
        
        {/* This is where your nested routes will render */}
        <Outlet />
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#005c8a] text-white py-3 px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-[13px] tracking-wider uppercase font-light">
          Copyright © {currentYear} Cloud 9 Soft Technologies
        </div>

        <div className="flex items-center gap-5 mt-3 md:mt-0">
          <a href="#" className="hover:text-gray-300 text-lg"><i className="bi bi-globe"></i></a>
          <a href="#" className="hover:text-gray-300 text-lg"><i className="bi bi-linkedin"></i></a>
          <a href="#" className="hover:text-gray-300 text-lg"><i className="bi bi-youtube"></i></a>
          <a href="#" className="hover:text-gray-300 text-lg"><i className="bi bi-envelope"></i></a>
        </div>
      </footer>

    </div>
  );
};

export default Home;