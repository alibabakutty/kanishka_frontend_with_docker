import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GatewayPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // if no token exists, kick them back to login immediately
      navigate('/login')
    }
  }, [navigate]);

  const handleLogout = async () => {
    // 1. Retrieve and Verify the token format before sending
    const token = localStorage.getItem('token');
    console.log('Token found in storage:', token ? "Yes (length: " + token.length + ")" : "No");

    // GUARD: Only call API if token is a real string and not "undefined" or "null"
    const isValidToken = token && token !== "undefined" && token !== "null" && token.includes(".");

    if (isValidToken) {
      console.log('Sending logout request to backend...');
      try {
        const response = await fetch('http://localhost:8080/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        console.log('Logout API Status:', response.status);
      } catch (error) {
        console.error('Logout API failed (Backend might be down):', error);
      }
    } else {
      console.warn('Logout API skipped: Token was missing or malformed (preventing 403 error)');
    }

    // 2. Finalize local cleanup
    console.log('Clearing local storage and redirecting...');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    {
      section: 'MASTERS', links: [
        { label: 'Customer Master', hotkey: 'C' },
        { label: 'Inventory Master', hotkey: 'I' },
      ]
    },
    {
      section: 'VOUCHERS', links: [
        { label: 'Kanishka Purchase Order', hotkey: 'K' },
        { label: 'DayBook', hotkey: 'D' },
      ]
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#fdf8e1] relative overflow-hidden">

      {/* --- BACKGROUND DECORATION (Diagonal Stripe) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[200%] h-64 bg-[#f6eec7] -rotate-6 -translate-y-1/2 origin-left"></div>
      </div>

      {/* --- TOP NAVIGATION BAR --- */}
      <header className="z-10 bg-[#1e4e8a] text-white px-6 py-2 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-bold tracking-wide uppercase">
          Kanishka Purchase Order
        </h1>

        {/* Administrator Badge */}
        <div className="bg-[#e23636] px-4 py-1 rounded-full flex items-center gap-2 text-xs font-bold uppercase shadow-inner">
          <span className="bg-white text-[#e23636] rounded-sm p-0.5">👤</span>
          Administrator
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span>Welcome, <strong className="text-white">admin</strong></span>
          <button onClick={handleLogout} className="hover:underline opacity-90">Logout</button>
        </div>
      </header>

      {/* --- MAIN CONTENT (Centered Menu) --- */}
      <main className="flex-1 z-10 flex items-center justify-center p-4">

        <div className="w-full max-w-xs bg-[#e1f0ff] border-2 border-[#1e4e8a] shadow-2xl rounded-sm overflow-hidden">
          {/* Menu Header */}
          <div className="bg-[#1e4e8a] text-white py-2 text-center font-bold text-sm uppercase tracking-wider">
            Kanishka Gateway
          </div>

          {/* Menu Items */}
          <div className=" space-y-4 text-center">
            {menuItems.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-gray-400 text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
                  {group.section}
                </h3>
                <ul className="space-y-1">
                  {group.links.map((link, i) => (
                    <li key={i} className="text-[#003366] text-sm font-semibold hover:bg-yellow-100 cursor-pointer py-0.5">
                      <span className="underline decoration-1 underline-offset-2">{link.hotkey}</span>
                      {link.label.substring(1)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Quit Option */}
            <div className="pt-4 border-t border-blue-200">
              <button className="text-[#003366] text-sm font-semibold hover:bg-yellow-100 w-full">
                <span className="underline decoration-1 underline-offset-2">Q</span>uit
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER (Activate Windows Text) --- */}
      <footer className="z-10 p-6 text-right">
        <div className="text-gray-400/60 select-none">
          <p className="text-xl">Activate Windows</p>
          <p className="text-xs">Go to Settings to activate Windows.</p>
        </div>
      </footer>

    </div>
  );
};

export default GatewayPage;