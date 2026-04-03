import { HiXMark } from "react-icons/hi2";

const ModalTitle = ({ title, onHandle}) => {
	// const navigate = useNavigate();
	return (
		<>
			<div className="bg-[#88bee6] w-full h-4 flex justify-between items-center ">
				<h1 className="text-[11px] pl-2 font-bold">{title}</h1>
				<HiXMark
					className=" font-semibold cursor-pointer"
					onClick={onHandle}
				/>
			</div>
		</>
	);
};
export default ModalTitle;
