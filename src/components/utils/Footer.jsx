import React from 'react';

const Footer = ({ 
    narration, 
    setNarration, 
    inputRefs, 
    handleFormSubmit,
    createdBy = '',
    setCreatedBy,
    approvedBy = '',
    setApprovedBy,
    status = '',
    setStatus
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
                    onChange={(e) => setNarration(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const confirmed = window.confirm('Do you want Confirm...');
                            if (confirmed) {
                                handleFormSubmit();
                            }
                        } else if (e.key === 'Backspace') {
                            if (inputRefs.current[2]?.value === '') {
                                console.log();
                            }
                        }
                    }}
                    className="h-5 text-[13px] resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 w-137.5 bg-transparent"
                    rows={1}
                />
            </div>
            <div className="flex">
                <div>
                    <label className="text-[14px]" htmlFor="createdBy">
                        Created By
                    </label>
                    <span className="mr-0.5">:</span>
                    <input 
                        type="text" 
                        id="createdBy"
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        className="w-37.5 h-5 resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 bg-transparent" 
                    />
                </div>
                <div>
                    <label className="text-[14px]" htmlFor="approvedBy">
                        Approved By
                    </label>
                    <span className="mr-0.5">:</span>
                    <input 
                        type="text" 
                        id="approvedBy"
                        value={approvedBy}
                        onChange={(e) => setApprovedBy(e.target.value)}
                        className="w-37.5 h-5 resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 bg-transparent" 
                    />
                </div>
                <div>
                    <label className="text-[14px]" htmlFor="status">
                        Status
                    </label>
                    <span className="mr-0.5">:</span>
                    <input 
                        type="text" 
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-37.5 h-5 resize-none focus:bg-[#fee8af] overflow-hidden outline-0 focus:border focus:border-blue-400 bg-transparent" 
                    />
                </div>
            </div>
        </div>
    );
};

export default Footer;