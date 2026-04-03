import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Title = ({ title, nav }) => {
	const navigate = useNavigate();
	return (
		<>
			<div className="bg-[#88bee6]  w-full h-4 flex justify-between items-center sticky z-1" >
				<h1 className="text-[11px] pl-2 font-bold">{title}</h1>
				<HiXMark
					className=" font-semibold cursor-pointer"
					onClick={() => navigate(nav)}
				/>
			</div>
		</>
	);
};
export default Title;