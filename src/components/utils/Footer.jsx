
const Footer = ({
    narration,
    // setNarration,
    inputRefs,
    // handleFormSubmit,
    createdBy = '',
    setCreatedBy,
    approvedByTally = '',
    setApprovedByTally,
    status = '',
    setStatus,
    navigate
}) => {
    return (
        <div className="flex justify-between">
            <div className="flex">
                <label htmlFor="narration" className="text-[14px] pl-1">
                    Narration
                </label>
                <span className="mr-0.5">:</span>
                <textarea
                    ref={(el) => (inputRefs.current[3] = el)}
                    name="narration"
                    value={narration}
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
                    className="h-5 text-[13px] resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 w-100 bg-transparent"
                    rows={1}
                    readOnly
                />
            </div>
            <div className="flex">
                <div>
                    <label className="text-[14px]" htmlFor="createdBy">
                        Created By
                    </label>
                    <span className="mr-1">:</span>
                    <input
                        type="text"
                        id="createdBy"
                        value={createdBy}
                        ref={(el) => (inputRefs.current[4] = el)}
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
                        className="w-37.5 h-5 resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 bg-transparent text-[13px]"
                        readOnly
                    />
                </div>
                {/* <div>
                    <label className="text-[14px] ml-1" htmlFor="approvedBy">
                        Approved By
                    </label>
                    <span className="mr-1">:</span>
                    <input
                        type="text"
                        id="approvedBy"
                        value={approvedBy}
                        ref={(el) => (inputRefs.current[5] = el)}
                        onChange={(e) => setApprovedBy(e.target.value)}
                        onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (inputRefs.current[6]) {
                                inputRefs.current[6].focus();
                            }
                        } else if (e.key === 'Backspace') {
                            if (inputRefs.current[4]?.value === '') {
                                console.log();
                            }
                        }}}
                        className="w-37.5 h-5 resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 bg-transparent text-[13px]"
                    />
                </div> */}
                <div>
                    <label className="text-[14px] ml-1" htmlFor="status">
                        Approved By Tally
                    </label>
                    <span className="mr-1">:</span>
                    <input
                        type="text"
                        id="approvedByTally"
                        value={approvedByTally}
                        ref={(el) => (inputRefs.current[5] = el)}
                        // onChange={(e) => setApprovedByTally(e.target.value)}
                        onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (inputRefs.current[6]) {
                                inputRefs.current[6].focus();
                            }
                        } else if (e.key === 'Backspace') {
                            if (inputRefs.current[4]?.value === '') {
                                console.log();
                            }
                        }}}
                        className="w-24 h-5 resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 bg-transparent capitalize font-semibold text-[13px]"
                        readOnly
                    />
                </div>
                <div>
                    <label className="text-[14px] ml-1" htmlFor="status">
                        Approved By Tab
                    </label>
                    <span className="mr-1">:</span>
                    <input
                        type="text"
                        id="status"
                        value={status}
                        ref={(el) => (inputRefs.current[6] = el)}
                        onChange={(e) => setStatus(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                const confirmed = window.confirm('Do you want exit!');
                                if (confirmed) {
                                    // handleFormSubmit();
                                    navigate(-1);
                                }
                            } else if (e.key === 'Backspace') {
                                if (inputRefs.current[5]?.value === '') {
                                    console.log();
                                }
                            }
                        }}
                        className="w-24 h-5 resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 bg-transparent capitalize font-semibold text-[13px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Footer;