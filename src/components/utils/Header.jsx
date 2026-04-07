import { useEffect, useState } from 'react';

const Header = ({ title, inputRefs, data, setData, tableRefs, isForex }) => {
	const [ShowCustomer, setShowCustomer] = useState(false);
	const [selectIndex, setSelectIndex] = useState(0);
	const [date, setDate] = useState({
		startDate: '',
		day: ''
	})
	const [customerName] = useState([]);
	const [filteredCustomer, setFilteredCustomer] = useState(customerName);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({ ...prevData, [name]: value }));
		if (name === 'customerName') {
			if (value) {
				const filteredData = customerName.filter((cust) =>
					cust.label.toLowerCase().includes(value.toLowerCase())
				);
				setFilteredCustomer(filteredData);
				setSelectIndex(0);
			} else {
				setSelectIndex(0);
				setFilteredCustomer(customerName);
			}
		}
	};


	useEffect(() => {
		setTimeout(() => {
			inputRefs.current[0]?.focus();
			inputRefs.current[0]?.setSelectionRange(0, 0);
		}, 0);
		// call formatter with the fetched data if it exists
		if (data.voucherDate) {
			dateFormatter(data.voucherDate);
		} else {
			dateFormatter()
		}

	}, [data.voucherDate]);

	const dateFormatter = (inputdate) => {
		const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		const parseDate = (dateString) => {
			if (!dateString) return new Date();

			// Try parsing standard ISO format (YYYY-MM-DD) first
			const standardDate = new Date(dateString);
			if (!isNaN(standardDate.getTime())) return standardDate;

			// Fallback to your custom dash/dot/slash logic
			const parts = dateString.split(/[-./]/);
			if (parts.length === 3) {
				let day = Number(parts[0]);
				let month = isNaN(parts[1])
					? monthsShort.indexOf(parts[1].charAt(0).toUpperCase() + parts[1].slice(1, 3).toLowerCase())
					: Number(parts[1]) - 1;
				let year = parts[2].length === 2 ? 2000 + Number(parts[2]) : Number(parts[2]);
				return new Date(year, month, day);
			}
			return new Date();
		};

		const currentDate = parseDate(inputdate);

		let d = String(currentDate.getDate());
		let m = monthsShort[currentDate.getMonth()];
		let y = String(currentDate.getFullYear()).slice(2);

		// Update the visual state (DD-MMM-YY)
		setDate((prev) => ({ ...prev, startDate: `${d}-${m}-${y}` }));

		// Update the Day Name
		getDayName(currentDate);

		// Update the parent data ONLY if it's different to avoid infinite loops
		const dateStamp = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
		if (data.voucherDate !== dateStamp) {
			setData((prevData) => ({ ...prevData, voucherDate: dateStamp }));
		}
	};

	const getDayName = (dateObj) => {
		const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const dayIndex = dateObj.getDay();
		setDate((prev) => ({ ...prev, day: daysOfWeek[dayIndex] }));
	};

	const handleSelect = (e, data) => {
		if (selectIndex < filteredCustomer.length) {
			if (e.key === 'ArrowUp' && selectIndex > 0) {
				e.preventDefault();
				setSelectIndex((prev) => prev - 1);
			} else if (
				e.key === 'ArrowDown' &&
				selectIndex < filteredCustomer.length - 1
			) {
				e.preventDefault();
				setSelectIndex((prev) => prev + 1);
			} else if (e.key === 'Enter' && selectIndex >= 0) {
				if (data === filteredCustomer) {
					updateData(e, data[selectIndex]);
					setShowCustomer(false);
					// isForex ? inputRefs.current[4]?.focus() : inputRefs.current[2]?.focus();
					// inputRefs.current[2].setSelectionRange(0, 0);
					tableRefs.current[0]?.focus()
					setSelectIndex(0)
				}
			} else if (e.key === 'Backspace') {
				if (e.target.value !== '') {
					return;
				} else {
					e.preventDefault();
					inputRefs.current[0]?.focus();
				}
			}
		}
	};

	const updateData = (e, value) => {
		setData((prevData) => ({
			...prevData,
			customerName: value.label,
		}));
		// inputRefs.current[1]?.focus();
		setShowCustomer(false);
	};

	return (
		<div className="flex justify-between border-b border-slate-300">
			<div className="">
				<div className="pt-1.5 flex leading-4">
					<label className="bg-[#2a67b1] text-center text-[13px] text-white font-semibold  min-w-32 px-5">
						{title}
					</label>
					<span className="text-[14px] font-semibold">
						{/* &nbsp;No.&nbsp;&nbsp;1 */}
						<input type="text" />
					</span>
				</div>

				<div className="flex leading-4 px-1 pt-1.5">
					<label htmlFor="custNo" className="w-32 text-[14px]">
						Party A/c Name
					</label>
					<div className="mr-0.5">:</div>
					<input
						ref={
							isForex
								? (el) => (inputRefs.current[3] = el)
								: (el) => (inputRefs.current[1] = el)
						}
						name="customerName"
						autoComplete="off"
						value={data.customerName}
						type="text"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								tableRefs.current[0]?.focus()
								setSelectIndex(0)
							}
						}}
						className="w-60 border border-transparent focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
						readOnly
					/>
				</div>

				<div className="flex leading-4 px-1 my-0.5">
					<label
						htmlFor="currentBalance"
						className="w-32 text-[13px] italic text-slate-500"
					>
						Current balance
					</label>
					<div className="mr-0.5 text-slate-500">:</div>
				</div>
			</div>
			{isForex && (
				<div className="pt-1.5 flex justify-center items-center">
					<div className="text-[13px] flex gap-10 leading-4">
						<div className="flex leading-4">
							<label htmlFor="" className='font-semibold'>Currency Type</label>
							<span className="mx-1">:</span>
							<input
								name='currencyType'
								type="text"
								className="w-24 border border-transparent focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
								ref={(el) => (inputRefs.current[0] = el)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && e.target.value !== '') {
										inputRefs.current[1]?.focus();
									}
								}}
								value={data.currencyType}
								onChange={handleChange}
							/>
						</div>
						<div className="flex leading-4">
							<label htmlFor="" className='font-semibold'>Exchange Rate</label>
							<span className="mx-1">:</span>
							<input
								name='exchangeRate'
								type="text"
								className="w-12 border border-transparent focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold text-red-700 text-right pr-0.5"
								ref={(el) => (inputRefs.current[1] = el)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && e.target.value !== '') {
										inputRefs.current[2]?.focus();
									}
								}}
								value={data.exchangeRate}
								onChange={handleChange}

							/>
						</div>
					</div>
				</div>
			)}
			<div className="pt-1 flex flex-col px-1 leading-4">
				<label htmlFor="" className="text-[13px] text-right font-semibold">
					<input
						type="text"
						className="w-20 text-[13px] outline-0 border border-transparent focus:border focus:border-blue-400 focus:bg-amber-200 text-right bg-transparent"
						onBlur={(e) => dateFormatter(e.target.value)}
						onChange={(e) =>
							setDate((prev) => ({ ...prev, startDate: e.target.value }))
						}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && e.target.value !== '') {
								if (isForex) {
									inputRefs.current[3]?.focus();
								} else {
									inputRefs.current[1]?.focus();
								}
							}
						}}
						ref={
							isForex
								? (el) => (inputRefs.current[2] = el)
								: (el) => (inputRefs.current[0] = el)
						}
						value={date.startDate}
					/>
				</label>
				<label className="text-[13px] text-right">{date.day}</label>

				<div className="flex leading-4 mt-5">
					<label className="text-[13px] w-24">Order No</label>
					<div className="mx-0.5">:</div>
					<input
						type="text"
						id="orderNo"
						value={data.orderNo}
						onChange={handleChange}
						name="orderNo"
						ref={
							isForex
								? (el) => (inputRefs.current[4] = el)
								: (el) => (inputRefs.current[2] = el)
						}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								tableRefs.current[0]?.focus();
							} else if (e.key === 'Backspace') {
								if (e.target.value !== '') {
									return;
								} else {
									e.preventDefault();
									inputRefs.current[1]?.focus();
									inputRefs.current[1].setSelectionRange(0, 0);
								}
							}
						}}
						className="outline-0 border border-transparent font-semibold pl-0.5 h-4.5 focus:bg-[#fee8af] focus:border focus:border-blue-500 text-[13px] bg-transparent"

					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
