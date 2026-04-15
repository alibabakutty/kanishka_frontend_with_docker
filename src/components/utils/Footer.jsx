
const Footer = ({
    narration,
    inputRefs,
    setInputRef,
    createdBy = '',
    approvedBy = '',
    navigate
}) => {
    return (
        <div className="flex justify-between border border-slate-400">
            <div className="">
                <label htmlFor="narration" className="text-[14px] pl-1 mr-0.5 font-semibold">
                    Narration
                </label>
                <span className="mr-2">:</span>
                <input type="text"
                    ref={setInputRef(3)}
                    name="narration"
                    value={narration || ""}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (inputRefs.current[4]) {
                                inputRefs.current[4].focus();
                            }
                        } else if (e.key === 'Backspace') {
                            if (inputRefs.current[2]?.value === '') {
                                console.log();
                            }
                        }
                    }}
                    className="h-5 text-[13px] focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 w-120 border border-transparent capitalize"
                    readOnly
                />
            </div>
            <div className="flex">
                <div>
                    <label className="text-[14px] font-semibold" htmlFor="createdBy">
                        Created By
                    </label>
                    <span className="mr-1">:</span>
                    <input
                        type="text"
                        id="createdBy"
                        value={createdBy || ""}
                        ref={setInputRef(4)}
                        // onChange={(e) => setCreatedBy(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                if (inputRefs.current[5]) {
                                    inputRefs.current[5].focus();
                                }
                            } else if (e.key === 'Backspace') {
                                if (inputRefs.current[3]?.value === '') {
                                    console.log();
                                }
                            }
                        }}
                        className="w-37.5 h-5 resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 border border-transparent text-[13px] capitalize font-semibold"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-[14px] ml-1 font-semibold" htmlFor="approvedBy">
                        Approved By
                    </label>
                    <span className="mr-1">:</span>
                    <input
                        type="text"
                        id="approvedBy"
                        value={approvedBy || ""}
                        ref={setInputRef(5)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                const confirmed = window.confirm('Do you want to exit?');
                                if (confirmed) {
                                    navigate(-1);
                                }
                            } else if (e.key === 'Backspace') {
                                if (inputRefs.current[4]?.value === '') {
                                    console.log();
                                }
                            }
                        }}
                        className="w-28 h-5 resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 border border-transparent capitalize font-semibold text-[13px]"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default Footer;