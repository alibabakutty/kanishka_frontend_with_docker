import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const SelectArea = ({ title, data, selectIndex, onHandle, extraParams }) => {
	const listRef = useRef([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (selectIndex >= 0 && listRef.current[selectIndex]) {
			listRef.current[selectIndex].scrollIntoView({
				behavior: 'auto',
				block: 'end',
				inline: 'nearest',
			});
		}
	}, [selectIndex]);
	
	const handleClickItem = (e, item) => {
		if (typeof onHandle === 'function') {
			onHandle(e, item, extraParams);
		} else {
			onHandle(e, item);
		}
	};
	console.log(data)
	// console.log(...extraParams)
	return (
		<>
			<div className="bg-[#def1fc] w-75 border border-slate-500 absolute top-0 right-0 z-10 h-141">
				<h1 className="bg-[#2a67b1] text-white pl-2 text-[13px] text-left ">
					{/* {title} */}
				</h1>
				<div className="w-full  px-1" onMouseDown={(e)=> e.preventDefault()}>
					<button
					type='button'
						onClick={(e)=> 
						{	e.preventDefault();
							navigate("/")
						}
						}
						className="w-full text-right text-[14px] mt-3 pr-2 border-b border-slate-500 "
					>
						Create
					</button>
				</div>
				<div className="overflow-auto h-128.25">
					<ul
						onMouseDown={(e) => e.preventDefault()}
						tabIndex="-1"
						className=""
					>
						{data.map((item, index) => (
							<li
								key={index}
								tabIndex="0"
								className={`px-2 h-4.25 flex justify-between capitalize items-center py-0.5  cursor-pointer text-sm ${
									selectIndex === index ? 'bg-amber-300' : ''
								}`}
								onClick={(e) => {
									handleClickItem(e, item);
									// refs.current[1].focus();
								}}
								ref={(el) => (listRef.current[index] = el)}
							>
								<span>
									{item.stockItemCode && item.stockItemCode + ' - '}
									{item.label || item.stockItemName}
									{item.stockCategoryName}
									{item.description}
									{item.stockGroupName}
									{item.unitSymbolName}
									{item.godownName}
									{item.batchSerialNumber}
								</span>{' '}
								{item.quantity && item.quantity + ' ' + item.uom}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
export default SelectArea;
