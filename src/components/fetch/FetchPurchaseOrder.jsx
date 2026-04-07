import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FetchPurchaseOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // filter logic
  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    return (
      order.orderNo?.toLowerCase().includes(search) ||
      order.voucherDate?.toLowerCase().includes(search) ||
      order.partyLedgerName?.toLowerCase().includes(search) ||
      order.voucherType?.toLowerCase().includes(search) ||
      order.totalAmount?.toString().includes(search)       // converts number to string for searching
    );
  })

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // retrieve the token you stored during login(usually in localstorage)
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/api/v1/purchase-orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    // split the YYYY-MM-DD string
    const [year, month, day] = dateStr.split("-");
    // return in DD-MM-YYYY format
    return `${day}-${month}-${year}`;
  }

  if (loading) return <div className='p-4 text-center'>Loading orders...</div>;
  if (error) return <div className='p-4 text-red-500 text-center'>Error: {error}</div>

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
        <button onClick={() => navigate(-1)} className="bg-[#004d26] text-white px-3 py-0.5 rounded text-xs flex items-center gap-1">
          ← Back
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
              <th className="px-px py-0.5 font-semibold border-r border-gray-500 text-center">S. No</th>
              <th className="px-1 py-0.5 font-semibold border-r border-gray-500 text-center">Voucher Type</th>
              <th className="px-1 py-0.5 font-semibold border-r border-gray-500 text-center">Voucher No</th>
              <th className="px-1 py-0.5 font-semibold border-r border-gray-500 text-center">PO No</th>
              <th className="px-1 py-0.5 font-semibold border-r border-gray-500 text-center">PO Date</th>
              <th className="px-1 py-0.5 font-semibold border-r border-gray-500 text-center">Party Ledger Name</th>
              <th className="px-1 py-0.5 font-semibold text-center">PO Amount</th>
              <th className="px-1 py-0.5 font-semibold text-center">Tally Status</th>
              <th className="px-1 py-0.5 font-semibold text-center">Tab Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr
                  key={order.id}
                  onClick={() => navigate(`/update_purchase_order/${order.id}`)}
                  className={`${index % 2 === 0 ? 'bg-[#fffbeb]' : 'bg-white'} border-b border-gray-200 hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-1 py-0.5 text-[#003366] text-center">{index + 1}</td>
                  <td className="px-1 py-0.5">{order.voucherType}</td>
                  <td className="px-1 py-0.5 text-[#003366] text-center">{order.voucherNumber}</td>
                  <td className="px-1 py-0.5 text-[#003366] text-center">{order.orderNo}</td>
                  <td className="px-1 py-0.5 text-center">{formatDate(order.voucherDate)}</td>
                  <td className="px-1 py-0.5">{order.partyLedgerName}</td>
                  <td className="px-1 py-0.5 text-right font-medium">
                    <span className="mr-1">₦</span> {order.totalAmount}
                  </td>
                  <td className="px-1 py-0.5 text-center">{"Pending"}</td>
                  <td className="px-1 py-0.5 text-center">{"Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='text-center py-4 text-gray-500'>
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchPurchaseOrder;