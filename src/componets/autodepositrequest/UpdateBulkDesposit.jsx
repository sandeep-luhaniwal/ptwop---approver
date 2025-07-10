"use client";

import React, { useState } from "react";
import Icons from "../common/Icons";
import InputWithLabelSub from "../custom-ui/InputWithLabelSub";
import CtaButton from "../custom-ui/CtaButton";

const UpdateBulkDesposit = ({ updateBulkDespositData, setUpdateBulkDespositData }) => {
    const [extraColumns, setExtraColumns] = useState([]);
    const [bankName, setBankName] = useState("");
    const [fileType, setFileType] = useState("");
    const [errors, setErrors] = useState({});

    const handleAddMore = () => {
        const newColumn = prompt("Enter column name:")?.trim();
        if (newColumn) {
            setExtraColumns((prev) => [...prev, newColumn]);
        }
    };

    const handleSave = () => {
        const validationErrors = {};
        if (!bankName.trim()) validationErrors.bankName = "Bank Name is required";
        if (!fileType.trim()) validationErrors.fileType = "File Type is required";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        console.log("Form submitted with:", {
            bankName,
            fileType,
            columns: ["Date", "Narration", "Amount", "Credit", "Debit", ...extraColumns],
        });
        alert("Form submitted successfully.");
    };

    const handleReset = () => {
        setBankName("");
        setFileType("");
        setExtraColumns([]);
        setErrors({});
    };

    return (
        <div className={`${updateBulkDespositData ? "scale-100 pointer-events-auto" : "scale-0 pointer-events-none"} duration-300 fixed top-0 left-0 bg-black/40 w-full h-full flex justify-center items-center`}>
            <div className='bg-white rounded-[10px] p-4 md:p-[30px] pe-3 max-w-[1192px] w-[90%] relative'>
                <div onClick={() => setUpdateBulkDespositData(null)} className='absolute cursor-pointer -top-4 -right-4'>
                    <Icons icon={"whitecross"} />
                </div>
                <div className='max-h-[80vh] pe-[18px] overflow-auto'>
                    <p className='text-lg md:text-xl text-black font-medium leading-100'>
                        Update Bulk Deposit Configuration
                    </p>
                    <p className='text-sm md:text-base font-normal text-black/70 leading-100 pt-1'>
                        Here you can upload statements for bulk deposit.
                    </p>

                    <div className="flex flex-col md:flex-row w-full gap-5 py-8 lg:py-10">
                        <InputWithLabelSub
                            name="bankName"
                            type="text"
                            placeholder="Enter Bank Name"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                        >
                            Bank Name
                            {errors.bankName && (
                                <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
                            )}
                        </InputWithLabelSub>

                        <InputWithLabelSub
                            name="fileType"
                            type="text"
                            placeholder="Choose file type"
                            value={fileType}
                            onChange={(e) => setFileType(e.target.value)}
                        >
                            File Type
                            {errors.fileType && (
                                <p className="text-red-500 text-xs mt-1">{errors.fileType}</p>
                            )}
                        </InputWithLabelSub>
                    </div>

                    <div className="">
                        <p className='text-base lg:text-lg font-normal text-black/60'>All Columns</p>
                        <div className="flex gap-4 flex-wrap my-4">
                            {["Date", "Narration", "Amount", "Credit", "Debit"].map((col, index) => (
                                <CtaButton key={index} className={'text-black cursor-pointer'} left main>{col}</CtaButton>
                            ))}
                            {extraColumns.map((col, index) => (
                                <CtaButton key={index} className={'text-black cursor-pointer'} left main>{col}</CtaButton>
                            ))}
                            <button
                                className='bg-white text-sm md:text-base text-purple cursor-pointer underline'
                                onClick={handleAddMore}
                            >
                                Add More
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <CtaButton left main className={'bg-purple text-white py-3 px-5 cursor-pointer'} onClick={handleSave}>
                                Save
                            </CtaButton>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-y-10 w-full gap-5 py-8 lg:py-10">
                        <InputWithLabelSub
                            name="amountColumn"
                            type="text"
                            placeholder="Select Amount Column"
                        >
                            Amount Column
                        </InputWithLabelSub>
                        <InputWithLabelSub
                            name="utrColumn"
                            type="text"
                            placeholder="Select UTR Column"
                        >
                            UTR Column
                        </InputWithLabelSub>
                        <InputWithLabelSub
                            name="utrSeparator"
                            type="text"
                            placeholder="UTR Separator"
                        >
                            UTR Separator
                        </InputWithLabelSub>
                        <InputWithLabelSub
                            name="utrIndex"
                            type="text"
                            placeholder="Select UTR Index"
                        >
                            UTR Index
                        </InputWithLabelSub>
                    </div>

                    <div className="">
                        <p className='text-base lg:text-lg font-normal text-black/60 mb-4'>All Columns</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <InputWithLabelSub
                                name="utrRegex"
                                type="text"
                                placeholder=""
                            >
                                UTR RegEx is Disabled
                            </InputWithLabelSub>
                        </div>
                        <div className='mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                            <InputWithLabelSub
                                name="txnCode"
                                type="text"
                                placeholder="********"
                            >
                                Transaction Code
                            </InputWithLabelSub>
                        </div>
                    </div>

                    <div className="flex gap-5 justify-end pt-8 lg:pt-10">
                        <button
                            onClick={handleReset}
                            className='text-black font-normal text-sm md:text-base py-2 px-4 border border-black rounded-[10px] cursor-pointer'
                        >
                            Reset
                        </button>
                        <CtaButton
                            left
                            main
                            className={'bg-purple text-white py-3 px-5 cursor-pointer'}
                            onClick={handleSave}
                        >
                            Save
                        </CtaButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBulkDesposit;
