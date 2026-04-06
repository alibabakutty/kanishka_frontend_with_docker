import React, { useState } from 'react';
// import { ArrowLeft, UserCircle } from 'lucide-react';

const FetchPurchaseOrder = () => {
  // Mock data based on your image
  const [orders] = useState([
    { id: 'SO-25-26-002', date: '2026-03-30', party: 'SRI', ledger: 'VAT Purchase A/c', amount: '787,520,607.07' },
    { id: 'SO-25-26-003', date: '2026-03-30', party: 'SRI', ledger: 'VAT Purchase A/c', amount: '49,068,375.00' },
    { id: 'SO-25-26-001', date: '2026-03-30', party: 'ADMIN', ledger: 'VAT Purchase A/c', amount: '17,783,986.43' },
  ]);

  return (
    <div className="min-h-screen bg-white font-sans text-xs">
      {/* Top Blue Navbar */}
      <nav className="bg-[#003366] text-white px-4 py-2 flex justify-between items-center">
        <h1 className="text-lg font-bold tracking-tight">KANISHKA PURCAHSE ORDER</h1>
        
        <div className="flex items-center gap-6">
          <button className="bg-[#e63946] px-4 py-1 rounded flex items-center gap-2 font-semibold uppercase text-xs">
            <span className="bg-white text-[#e63946] rounded-sm px-0.5">■</span> ADMINISTRATOR
          </button>
          <div className="text-xs">
            Welcome, <span className="font-bold">admin</span> | <button className="hover:underline">Logout</button>
          </div>
        </div>
      </nav>

      {/* Sub-header / Search Area */}
      <div className="bg-[#f0f0f0] border-b border-gray-300 p-1 flex justify-between items-center">
        <button className="bg-[#004d26] text-white px-3 py-0.5 rounded text-xs flex items-center gap-1">
          ← Back
        </button>
        
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-1/3 border border-gray-400 bg-[#ffffcc] px-2 py-0.5 outline-none focus:border-blue-500"
        />

        <span className="text-[#003366] font-bold text-xs pr-2 italic">
          Purcahse Order Update
        </span>
      </div>

      {/* Table Section */}
      <div className="w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#004d26] text-white text-left">
              <th className="px-1 py-0.5 font-semibold border-r border-gray-500">Order No</th>
              <th className="px-1 py-0.5 font-semibold border-r border-gray-500">Date</th>
              <th className="px-1 py-0.5 font-semibold border-r border-gray-500">Party Name</th>
              <th className="px-1 py-0.5 font-semibold border-r border-gray-500">Purchase Ledger</th>
              <th className="px-1 py-0.5 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr 
                key={order.id} 
                className={`${index % 2 === 0 ? 'bg-[#fffbeb]' : 'bg-white'} border-b border-gray-200 hover:bg-blue-50 transition-colors`}
              >
                <td className="px-1 py-0.5 text-[#003366]">{order.id}</td>
                <td className="px-1 py-0.5">{order.date}</td>
                <td className="px-1 py-0.5">{order.party}</td>
                <td className="px-1 py-0.5">{order.ledger}</td>
                <td className="px-1 py-0.5 text-right font-medium">
                  <span className="mr-1">₦</span> {order.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchPurchaseOrder;