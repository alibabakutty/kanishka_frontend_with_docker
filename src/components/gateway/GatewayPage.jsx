import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const GatewayPage = () => {
  const navigate = useNavigate();
  
  // 1. Flatten the menu items for easier indexing
  const menuItems = [
    { section: 'MASTERS', label: 'Customer Master', hotkey: 'C', path: '/customers' },
    { section: 'MASTERS', label: 'Inventory Master', hotkey: 'I', path: '/inventory' },
    { section: 'VOUCHERS', label: 'Purchase Order Register', hotkey: 'P', path: '/fetch_purchase_order' },
    { section: 'VOUCHERS', label: 'PPO Item Register', path: '/fetch_item_purchase_order'},
    { section: 'SYSTEM', label: 'Quit', hotkey: 'Q', isQuit: true },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token && token.includes(".")) {
      try {
        await fetch('http://localhost:8080/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        });
      } catch (error) { console.error('Logout failed', error); }
    }
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  // 2. Keyboard Logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        setSelectedIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      } else if (e.key === 'Enter') {
        const currentItem = menuItems[selectedIndex];
        if (currentItem.isQuit) handleLogout();
        else if (currentItem.path) navigate(currentItem.path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, navigate, handleLogout, menuItems]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#fdf8e1] relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[200%] h-64 bg-[#f6eec7] -rotate-6 -translate-y-1/2 origin-left"></div>
      </div>

      <header className="z-10 bg-[#1e4e8a] text-white px-6 py-1 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-bold tracking-wide uppercase">Kanishka Purchase Order</h1>
        <div className="flex items-center gap-4 text-sm">
          <span>Welcome, <strong>admin</strong></span>
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        </div>
      </header>

      <main className="flex-1 z-10 flex items-center justify-center p-4">
        <div className="w-full max-w-xs bg-[#e1f0ff] border-2 border-[#1e4e8a] shadow-2xl rounded-sm overflow-hidden">
          <div className="bg-[#1e4e8a] text-white py-1 text-center font-bold text-sm uppercase tracking-wider">
            Kanishka Gateway
          </div>

          <div className="py-2 text-center">
            {menuItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {/* Section Header (Show only if first item in section) */}
                {(idx === 0 || menuItems[idx - 1].section !== item.section) && (
                  <h3 className="text-gray-400 text-[10px] font-bold tracking-[0.2em] mt-2 mb-1 uppercase">
                    {item.section}
                  </h3>
                )}
                
                <div
                  onClick={() => item.isQuit ? handleLogout() : navigate(item.path)}
                  className={`
                    text-[#003366] text-[13px] font-semibold cursor-pointer py-1 transition-colors
                    ${selectedIndex === idx ? 'bg-yellow-100' : 'hover:bg-yellow-100'}
                  `}
                >
                  <span className="underline decoration-1 underline-offset-2">{item.hotkey}</span>
                  {item.label.substring(1)}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GatewayPage;