import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatINR } from '../utils/utils';

const FetchItemPurchaseOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [filters, setFilters] = useState({
        voucherType: '',
        voucherNumber: '',
        orderNo: '',
        date: '',
        party: '',
        amount: '',
        itemName: '',
        hsn: '',
        gst: '',
        qty: '',
        rate: '',
        uom: '',
        itemAmount: '',
        createdBy: '',
        approvedBy: ''
    });

    const navigate = useNavigate();
    const [showFilters, setShowFilters] = useState(false);
    // Flatten inventory entries
    const flattenedOrders = useMemo(() => {
        return orders.flatMap((order) =>
            order.inventoryEntries.map((item) => ({
                ...order,
                itemName: item.itemName,
                hsnCode: item.hsnCode,
                gstPercentage: item.gstPercentage,
                itemUom: item.itemUom,
                billedQty: item.billedQty,
                itemRate: item.itemRate,
                itemAmount: item.itemAmount
            }))
        );
    }, [orders]);

    // Filtering
    const filteredOrders = useMemo(() => {
        return flattenedOrders.filter((order) => {
            const search = searchTerm.toLowerCase();

            const globalMatch =
                !search ||
                Object.values(order).some((val) =>
                    val?.toString().toLowerCase().includes(search)
                );

            const columnMatch =
                (!filters.voucherType || order.voucherType?.toLowerCase().includes(filters.voucherType.toLowerCase())) &&
                (!filters.voucherNumber || order.voucherNumber?.toLowerCase().includes(filters.voucherNumber.toLowerCase())) &&
                (!filters.orderNo || order.orderNo?.toLowerCase().includes(filters.orderNo.toLowerCase())) &&
                (!filters.date || order.voucherDate?.toLowerCase().includes(filters.date.toLowerCase())) &&
                (!filters.party || order.partyLedgerName?.toLowerCase().includes(filters.party.toLowerCase())) &&
                (!filters.amount || order.totalAmount?.toString().includes(filters.amount)) &&
                (!filters.itemName || order.itemName?.toLowerCase().includes(filters.itemName.toLowerCase())) &&
                (!filters.hsn || order.hsnCode?.toLowerCase().includes(filters.hsn.toLowerCase())) &&
                (!filters.gst || order.gstPercentage?.toString().includes(filters.gst)) &&
                (!filters.qty || order.billedQty?.toString().includes(filters.qty)) &&
                (!filters.rate || order.itemRate?.toString().includes(filters.rate)) &&
                (!filters.uom || order.itemUom?.toLowerCase().includes(filters.uom.toLowerCase())) &&
                (!filters.itemAmount || Math.abs(order.itemAmount)?.toString().includes(filters.itemAmount)) &&
                (!filters.createdBy || order.createdBy?.toLowerCase().includes(filters.createdBy.toLowerCase())) &&
                (!filters.approvedBy || order.approvedBy?.toLowerCase().includes(filters.approvedBy.toLowerCase()));

            return globalMatch && columnMatch;
        });
    }, [flattenedOrders, searchTerm, filters]);

    useEffect(() => {
        setFocusedIndex(0);
    }, [searchTerm, filters]);

    // Keyboard Navigation
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape') {
                navigate(-1);
                return;
            }

            if (filteredOrders.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setFocusedIndex((prev) =>
                    prev < filteredOrders.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
            } else if (e.key === 'Enter') {
                const selected = filteredOrders[focusedIndex];
                if (selected) {
                    navigate(`/update_purchase_order/${selected.id}`);
                }
            }
        },
        [filteredOrders, focusedIndex, navigate]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Fetch Data
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(
                    'http://localhost:8080/api/v1/purchase-orders',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const grossTotal = filteredOrders.reduce(
        (sum, order) => sum + (Number(order.itemAmount) || 0),
        0
    );

    const totals = useMemo(() => {
        return filteredOrders.reduce(
            (acc, order) => {
                acc.qty += Number(order.billedQty) || 0;
                acc.amount += Number(order.itemAmount) || 0;
                return acc;
            },
            { qty: 0, amount: 0 }
        );
    }, [filteredOrders]);

    const isFilterApplied = useMemo(() => {
        return (
            searchTerm.trim() !== '' ||
            Object.values(filters).some((val) => val.trim() !== '')
        );
    }, [searchTerm, filters]);

    if (loading) return <div className="p-4 text-center">Loading orders...</div>;
    if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;

    return (
        <div className="h-screen flex flex-col bg-white text-xs">
            {/* Navbar */}
            <nav className="bg-[#003366] text-white px-4 py-1 flex justify-between">
                <h1 className="text-lg font-bold">PURCHASE ORDER</h1>
                <div>admin | Logout</div>
            </nav>

            {/* Search */}
            <div className="bg-gray-100 p-1 flex justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-green-700 text-white px-3 py-1"
                >
                    ← Back
                </button>

                <button
                    onClick={() => {
                        setShowFilters(prev => {
                            if (prev) {
                                // clearing filters when hiding
                                setFilters({
                                    voucherType: '',
                                    voucherNumber: '',
                                    orderNo: '',
                                    date: '',
                                    party: '',
                                    amount: '',
                                    itemName: '',
                                    hsn: '',
                                    gst: '',
                                    qty: '',
                                    rate: '',
                                    uom: '',
                                    itemAmount: '',
                                    createdBy: '',
                                    approvedBy: ''
                                });
                            }
                            return !prev;
                        });
                    }}
                    className="bg-cyan-700 text-white px-3 py-1"
                >
                    {showFilters ? 'Hide Filter' : 'Advance Filter'}
                </button>

                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-2"
                />
            </div>

            {/* ✅ Horizontal Scroll Wrapper */}
            <div className="flex-1 overflow-auto">
                <table className=" border-collapse min-w-375">
                    {/* Sticky Header */}
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-green-800 text-white">
                            <th className='w-9'>S.No</th>
                            <th className='w-52 text-left pl-2'>Voucher Type</th>
                            <th className='w-28'>Voucher No</th>
                            <th className='w-28'>PO No</th>
                            <th className='w-28 text-left pl-2'>PO Date</th>
                            <th className='w-60'>Party Ledger Name</th>
                            <th className='w-28 text-right'>PO Amount</th>
                            <th className='w-60'>Item Name</th>
                            <th className='w-20 text-left pl-2'>HSN</th>
                            <th className='w-12'>GST %</th>
                            <th className='w-12'>Qty</th>
                            <th className='w-28'>Rate</th>
                            <th className='w-12'>UOM</th>
                            <th className='w-24'>Amount</th>
                            <th className='w-20'>Created By</th>
                            <th className='w-28'>Approved Status</th>
                        </tr>

                        {/* Filters */}
                        {showFilters && (
                            <tr className="bg-gray-200">
                                <th></th>
                                {Object.keys(filters).map((key) => (
                                    <th key={key}>
                                        <input
                                            className="text-[12px] outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 bg-transparent w-full pl-1 capitalize"
                                            value={filters[key]}
                                            onChange={(e) =>
                                                setFilters({ ...filters, [key]: e.target.value })
                                            }
                                            placeholder="type..."
                                        />
                                    </th>
                                ))}
                            </tr>
                        )}
                    </thead>

                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr
                                key={index}
                                onClick={() =>
                                    navigate(`/update_purchase_order/${order.id}`)
                                }
                                className={`cursor-pointer ${focusedIndex === index
                                    ? 'bg-yellow-100'
                                    : index % 2 === 0
                                        ? 'bg-yellow-50'
                                        : ''
                                    }`}
                            >
                                <td className='pl-2'>{index + 1}</td>
                                <td className='pl-2'>{order.voucherType}</td>
                                <td>{order.voucherNumber}</td>
                                <td>{order.orderNo}</td>
                                <td>{formatDate(order.voucherDate)}</td>
                                <td className=''>{order.partyLedgerName}</td>
                                <td className='text-right'>{formatINR(order.totalAmount)}</td>
                                <td className='pl-2'>{order.itemName}</td>
                                <td>{order.hsnCode}</td>
                                <td>{order.gstPercentage}%</td>
                                <td className='text-right'>{order.billedQty.toFixed(2)}</td>
                                <td className='text-right'>{formatINR(order.itemRate)}</td>
                                <td className='pl-3 capitalize'>{order.itemUom}</td>
                                <td className='text-right'>{formatINR(Math.abs(order.itemAmount))}</td>
                                <td className='pl-3'>{order.createdBy}</td>
                                <td>{order.approvedBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* 🔥 Sticky Bottom Footer */}
            <div className="bg-[#003366] text-white px-4 py-1 sticky bottom-0">

                <div className="flex items-center">

                    {/* Empty space */}
                    <div className=" text-right font-semibold">
                        Total:
                    </div>

                    {/* Qty Total */}
                    <div className="text-right font-semibold ml-[1050px]">
                        {isFilterApplied ? totals.qty.toFixed(2) : ''}
                    </div>

                    {/* Skip Rate + UOM */}
                    <div className=""></div>

                    {/* Amount Total */}
                    <div className="text-right font-bold ml-[145px]">
                        {isFilterApplied ? formatINR(Math.abs(totals.amount)) : ''}
                    </div>

                    <div className="col-span-2"></div>

                </div>

            </div>
        </div>
    );
};

export default FetchItemPurchaseOrder;