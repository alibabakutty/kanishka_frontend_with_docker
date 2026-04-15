import { HiXMark } from "react-icons/hi2";
import { HiOutlinePrinter, HiOutlineShare } from "react-icons/hi2"; // Optional: Adding icons for a professional look
import { useNavigate } from "react-router-dom";

const Title = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#88bee6] w-full h-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
            {/* Left side: Title */}
            <h1 className="text-[11px] pl-2 font-bold uppercase tracking-wider text-slate-800">
                {title}
            </h1>

            {/* Right side: Actions & Close */}
            <div className="flex items-center h-full">
                <div className="flex gap-4 mr-4 text-[10px] font-bold uppercase">
                    <button 
                        type="button"
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                        onClick={() => console.log("Exporting...")}
                    >
                        <HiOutlineShare className="text-[12px]" />
                        Export
                    </button>
                    <button 
                        type="button"
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                        onClick={() => window.print()}
                    >
                        <HiOutlinePrinter className="text-[12px]" />
                        Print
                    </button>
                </div>

                {/* Closing Icon with Background Hover */}
                <div 
                    className="h-full px-3 flex items-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <HiXMark className="text-white font-bold text-[14px]" />
                </div>
            </div>
        </div>
    );
};

export default Title;