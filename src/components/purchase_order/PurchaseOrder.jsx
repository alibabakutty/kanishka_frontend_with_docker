import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Title from "../utils/Title";
import Header from "../utils/Header";
import VoucherSub from "../utils/VoucherSub";
import Footer from "../utils/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, formatINR } from "../utils/utils";

const PurchaseOrder = () => {
    const { id } = useParams();
    const [showProduct, setShowProduct] = useState(false);
    const [showSubForm, setShowSubForm] = useState(false);
    const [tableData, setTableData] = useState([
        {
            description: "",
            hsn: '',
            gst: '',
            dueOn: "",
            quantity: "",
            rate: "",
            uom: "",
            discount: "",
            amount: "",
            allocation: [
                {
                    dueOn: "",
                    location: "♦ Any",
                    batchNo: "♦ Any",
                    quantity: "",
                    rate: "",
                    uom: "",
                    discount: "",
                    amount: "",
                },
            ],
        },
    ]);
    const tableRefs = useRef([]);
    const inputRefs = useRef([]);
    const [selectionItem, setSelectionItem] = useState("");
    const [headerData, setHeaderData] = useState({
        customerName: '',
        voucherNo: '',
        voucherDate: '',
        voucherType: '',
        orderNo: ''
    });
    const [narration, setNarration] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [approvedBy, setApprovedBy] = useState("");
    const [status, setStatus] = useState("pending");
    const [stockItem] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [focusedRow, setFocusedRow] = useState(null)
    const [filteredStockItem, setFilterdStockItem] = useState(stockItem);
    const display = tableData.length > 1 ? [{ label: "♦ End of List" }, ...filteredStockItem] : filteredStockItem
    const [totalQuantity, setTotalQuantity] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/v1/purchase-orders/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = response.data;
                // map api
                setHeaderData({
                    customerName: data.partyLedgerName,
                    voucherNo: data.voucherNumber,
                    voucherDate: data.voucherDate,
                    voucherType: data.voucherType,
                    orderNo: data.orderNo
                });
                // map inventoryentries to your tabledata state
                if (data.inventoryEntries && data.inventoryEntries.length > 0) {
                    const mapperTableData = data.inventoryEntries.map(entry => ({
                        description: entry.itemName,
                        hsn: '',
                        gst: '',
                        dueOn: formatDate(data.voucherDate),
                        quantity: entry.billedQty.toFixed(2),
                        rate: entry.itemRate,
                        uom: entry.itemUom,
                        discount: "",
                        amount: Math.abs(entry.itemAmount).toFixed(2),
                        allocation: [
                            {
                                dueOn: formatDate(data.voucherDate),
                                location: "♦ Any",
                                batchNo: "♦ Any",
                                quantity: entry.billedQty.toFixed(2),
                                rate: entry.itemRate,
                                uom: entry.itemUom,
                                discount: "",
                                amount: Math.abs(entry.itemAmount).toFixed(2),
                            }
                        ]
                    }));
                    setTableData(mapperTableData);
                }
            } catch (error) {
                console.error('Failed to fetch order:', error);
                alert("Error fetching order details")
            }
        };

        if (id) {
            fetchOrderData();
        }
    }, [id]);

    // const handleInputChange = (e, rowIndex) => {
    //     const { value, name } = e.target;
    //     const updatedData = [...tableData];
    //     updatedData[rowIndex][name] = value;
    //     setTableData(updatedData);
    //     if (name === 'description') {
    //         const selectedProductItem = stockItem.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()))
    //         setFilterdStockItem(selectedProductItem)
    //     }
    // };

    const handleKeyDown = (e, rowIndex, colIndex) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();

            const nextCell = rowIndex * 2 + colIndex + 1;

            if (nextCell < tableRefs.current.length && tableRefs.current[nextCell]) {
                tableRefs.current[nextCell]?.focus();
                tableRefs.current[nextCell].setSelectionRange(0, 0)
            } else {
                if (rowIndex === tableData.length - 1) {
                    if (inputRefs.current[3]) {
                        inputRefs.current[3].focus();
                    }
                } else {
                    tableRefs.current[(rowIndex + 1) * 2]?.focus();
                    tableRefs.current[(rowIndex + 1) * 2].setSelectionRange(0, 0)
                }
            }
        } else if (e.key === "Backspace") {
            const prevCell = rowIndex * 2 + colIndex - 1;
            if (prevCell >= 0 && prevCell < tableRefs.current.length) {
                e.preventDefault();
                tableRefs.current[prevCell]?.focus();
                tableRefs.current[prevCell].setSelectionRange(0, 0);
            }
        }
    };

    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if(e.key === 'Escape'){
                if (showSubForm) {
                    setShowSubForm(false)
                } else {
                    navigate(-1);
                }
            }
        }
        window.addEventListener('keydown', handleGlobalKeyDown);

        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [navigate, showSubForm, showProduct]);

    const handleFormSubmit = async () => {
        const customerName = headerData.customerName;
        const voucherNo = headerData.voucherNo;
        const voucherDate = headerData.voucherDate;
        const voucherType = headerData.voucherType;
        const orderNo = headerData.orderNo;
        const orderItem = tableData.map((item) => ({
            description: item.description,
            dueDate: item.dueOn,
            quantity: item.quantity,
            rate: item.rate,
            uom: item.uom,
            discount: item.discount,
            amount: item.amount,
            batchWiseItem: item.allocation.map((batch) => ({
                dueDate: batch.dueOn,
                location: batch.location,
                batchNo: batch.batchNo,
                quantity: batch.quantity,
                rate: batch.rate,
                uom: batch.uom,
                discount: batch.discount,
                amount: batch.amount,
            })),
        }));
        const data = {
            customerName,
            voucherNo,
            voucherDate,
            voucherType,
            orderNo,
            orderItem,
            narration,
            createdBy,
            approvedBy,
            status,
        };
        await axios.post('/transact/save', data);
    };

    const handleSelect = (e, item, rowIndex) => {
        if (selectedProduct < display.length) {
            if (e.key === "ArrowUp" && selectedProduct > 0) {
                setSelectedProduct((prev) => prev - 1);
            } else if (
                e.key === "ArrowDown" &&
                selectedProduct < display.length - 1
            ) {
                setSelectedProduct((prev) => prev + 1);
            } else if (e.key === "Enter" && selectedProduct >= 0) {
                onSelected(e, item[selectedProduct], rowIndex);
            } else if (e.key === "Backspace") {
                if (e.target.value !== "") {
                    return;
                } else {
                    if (rowIndex > 0) {
                        const prevRowIndex = rowIndex - 1;
                        const prevRow = prevRowIndex * 2 + 1;
                        e.preventDefault();
                        tableRefs.current[prevRow]?.focus();
                    } else {
                        e.preventDefault();
                        inputRefs.current[1]?.focus();
                        inputRefs.current[1].setSelectionRange(0, 0);
                    }
                }
            }
        }
    };

    const onSelected = (e, item, rowIndex) => {
        const updatedTable = [...tableData];
        updatedTable[rowIndex].description = item.label;
        setSelectionItem(item.label);
        if (item.label !== "♦ End of List") {
            setShowSubForm(true);
        } else {
            setShowSubForm(false);
            e.preventDefault()
            inputRefs.current[3]?.focus()
            const updated = tableData.filter((_, index) => index !== rowIndex);
            setTableData(updated)
        }
        setShowProduct(false);
    };

    const afterAllocation = (row) => {
        setTimeout(() => {
            tableRefs.current[row * 2 + 1]?.focus();
        }, 0)
    }

    useEffect(() => {
        tableRefs.current = tableRefs.current.filter(ref => ref !== null);
    }, [tableData])

    const handleTotalQty = () => {
        const qty = tableData.reduce(
            (sum, alloc) => {
                const num = typeof alloc.quantity === 'number' ? alloc.quantity : parseFloat(alloc.quantity.replace(/,/g, '')) || 0
                return sum + num
            }, 0
        );
        if (!isNaN(qty)) {
            setTotalQuantity(parseFloat(qty).toFixed(2));
        }
    };

    const handleTotalAmount = () => {
        const amt = tableData.reduce(
            (sum, alloc) => sum + parseFloat(alloc.amount),
            0
        );
        if (!isNaN(amt)) setTotalAmount(parseFloat(amt).toFixed(2));
    };

    useEffect(() => {
        handleTotalQty();
        handleTotalAmount();
    }, [tableData])

    return (
        <>
            <div className="w-full h-145">
                <Title title="Order Voucher Creation" nav="/" />
                <form
                    action=""
                    className="relative"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Header
                        title="Purchase Order"
                        inputRefs={inputRefs}
                        data={headerData}
                        setData={setHeaderData}
                        tableRefs={tableRefs}
                    />
                    <div className="h-112.5 overflow-auto">
                        <table className="w-full">
                            <thead className=" bg-[#F9F3CC] text-[12px] border border-slate-300 font-semibold sticky top-0">
                                <tr className="h-4.25 leading-4 border border-slate-300">
                                    <th className="w-11.25 text-center border border-slate-300">
                                        S.No
                                    </th>
                                    <th className="w-105 text-center border border-slate-300">
                                        Product Name
                                    </th>
                                    <th className="w-17.5 text-center border border-slate-300">
                                        HSN
                                    </th>
                                    <th className="w-17.5 text-center border border-slate-300">
                                        GST %
                                    </th>
                                    <th className="w-15 text-center border border-slate-300">
                                        Due on
                                    </th>
                                    <th className="w-17.5 text-center border border-slate-300">
                                        Quantity
                                    </th>
                                    <th className="w-22.5 text-right border border-slate-300">
                                        Rate
                                    </th>
                                    <th className="w-12.5 text-center border border-slate-300">
                                        Per
                                    </th>
                                    <th className="w-17.5 text-center border border-slate-300">
                                        Discount %
                                    </th>
                                    {/* <th className="w-17.5 text-center border border-slate-300">
                                        Tax %
                                    </th> */}
                                    <th className="w-25.75 text-right border border-slate-300">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item, rowIndex) => (
                                    <tr
                                        className=" text-[13px] h-4.25 leading-4"
                                        key={rowIndex}
                                    >
                                        <td className="text-center border border-slate-300 bg-white">
                                            {rowIndex + 1}
                                        </td>
                                        <td className="border border-slate-300 bg-white">
                                            <input
                                                type="text"
                                                ref={(input) => (tableRefs.current[rowIndex * 2 + 0] = input)}
                                                className="w-full outline-0 focus:bg-amber-300 pl-1"
                                                name="description"
                                                value={item.description}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        setShowSubForm(true)
                                                    }
                                                }}
                                                onFocus={() => {
                                                    setShowProduct(true);
                                                    setFocusedRow(rowIndex);
                                                }}
                                                // onBlur={() => setShowProduct(false)}
                                                readOnly
                                            />
                                        </td>
                                        <td className="text-center border border-slate-300 bg-white">
                                            {/* {item.hsn} */}
                                            {"Null"}
                                        </td>
                                        <td className="text-center border border-slate-300 bg-white">
                                            {/* {item.gst ? item.gst + ' %' : ''} */}
                                            {"Null"}
                                        </td>
                                        <td className="text-center border border-slate-300 bg-white">
                                            {item.dueOn}
                                        </td>
                                        <td className="text-center border border-slate-300 bg-white">
                                            {item.quantity}
                                        </td>
                                        <td className="text-right border border-slate-300 bg-white">
                                            {formatINR(item.rate)}
                                        </td>
                                        <td className="text-center border border-slate-300 bg-white">
                                            {item.uom}
                                        </td>
                                        <td className="text-center border border-slate-300 bg-white">
                                            {/* {item.discount ? item.discount + ' %' : ''} */}
                                            {"Null"}
                                        </td>
                                        <td className="border border-slate-300 bg-white cursor-default">
                                            <input
                                                className="w-full outline-0 text-right focus:bg-amber-300"
                                                type="text"
                                                name="amount"
                                                value={formatINR(item.amount)}
                                                ref={(input) =>
                                                    (tableRefs.current[rowIndex * 2 + 1] = input)
                                                }
                                                onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                                                readOnly
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {showSubForm && (
                            <VoucherSub
                                isClose={setShowSubForm}
                                selectionItem={selectionItem}
                                orderData={tableData}
                                setOrderData={setTableData}
                                allocation={tableData[focusedRow].allocation}
                                row={focusedRow}
                                afterAllocation={afterAllocation}
                            />
                        )}
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="border-y border-slate-400 h-5.5 w-117.5 flex items-center justify-between">
                            <span className="w-20 text-right text-[14px] font-semibold">
                                {totalQuantity !== '0.00' ? totalQuantity : ''}
                            </span>
                            <span className="w-20 text-right text-[14px] font-semibold">
                                <span className="mr-1">₹</span>
                                {totalAmount !== '0.00' ? totalAmount : ''}
                            </span>
                        </div>
                    </div>

                    {/* Footer Component */}
                    <Footer
                        narration={narration}
                        setNarration={setNarration}
                        inputRefs={inputRefs}
                        handleFormSubmit={handleFormSubmit}
                        createdBy={createdBy}
                        setCreatedBy={setCreatedBy}
                        approvedBy={approvedBy}
                        setApprovedBy={setApprovedBy}
                        status={status}
                        setStatus={setStatus}
                        navigate={navigate}
                    />
                </form>
            </div>
        </>
    );
};

export default PurchaseOrder;