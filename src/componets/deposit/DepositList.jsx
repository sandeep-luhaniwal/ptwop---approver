"use client";

import { useEffect, useRef, useState } from "react";
import Icons from "../common/Icons";
import CtaPagination from "../custom-ui/CtaPagination";
import CtaTable from "../custom-ui/CtaTable";

const banks = [
    {
        name: "RBI",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "In Review",
    },
    {
        name: "SBI",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Declined",
    },
    {
        name: "PNB",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Succeeded",
    },
    {
        name: "UNION",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Succeeded",
    },
    {
        name: "AXIS",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Succeeded",
    },
    {
        name: "PATYM",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Succeeded",
    },
    {
        name: "KANRA",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Succeeded",
    },
    {
        name: "AXIS",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Succeeded",
    },
];

const columns = [
    "BANK NAME",
    "FILE TYPE",
    "COLUMNS",
    { label: "STATUS", },
];

const DepositList = () => {
    const [tempBankFilter, setTempBankFilter] = useState("");
    const [tempFileTypeFilter, setTempFileTypeFilter] = useState("");
    const [tempStatusFilter, setTempStatusFilter] = useState("");
    const [tempSearchTerm, setTempSearchTerm] = useState("");

    const [bankFilter, setBankFilter] = useState("");
    const [fileTypeFilter, setFileTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedBanks, setSelectedBanks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loadClicked, setLoadClicked] = useState(false);
    const [popupBank, setPopupBank] = useState(null);
    const [updateBulkDespositData, setUpdateBulkDespositData] = useState(false);

    const bankDropdownRef = useRef(null);
    const fileTypeDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);

    const uniqueBanks = [...new Set(banks.map((b) => b.name))];
    const uniqueFileTypes = [...new Set(banks.map((b) => b.fileType))];
    const uniqueStatuses = [...new Set(banks.map((b) => b.status))];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (bankDropdownRef.current && !bankDropdownRef.current.contains(e.target)) {
                // close dropdown logic here
            }
            if (fileTypeDropdownRef.current && !fileTypeDropdownRef.current.contains(e.target)) {
                // close dropdown logic here
            }
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target)) {
                // close dropdown logic here
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLoad = () => {
        setBankFilter(tempBankFilter);
        setFileTypeFilter(tempFileTypeFilter);
        setStatusFilter(tempStatusFilter);
        setLoadClicked(true);
        setSelectedBanks([]);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setTempBankFilter("");
        setTempFileTypeFilter("");
        setTempStatusFilter("");
        setTempSearchTerm("");
        setBankFilter("");
        setFileTypeFilter("");
        setStatusFilter("");
        setSelectedBanks([]);
        setLoadClicked(false);
        setCurrentPage(1);
    };

    const filteredBanks = banks
        .filter((bank) => {
            const matchBank = bankFilter === "" || bank.name === bankFilter;
            const matchFile = fileTypeFilter === "" || bank.fileType === fileTypeFilter;
            const matchStatus = statusFilter === "" || bank.status === statusFilter;
            return matchBank && matchFile && matchStatus;
        })
        .filter((bank) =>
            bank.name.toLowerCase().includes(tempSearchTerm.toLowerCase())
        );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBanks = filteredBanks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBanks.length / itemsPerPage);

    const handleCheckboxChange = (name) => {
        setSelectedBanks((prev) =>
            prev.includes(name) ? prev.filter((id) => id !== name) : [...prev, name]
        );
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div >
            <div className="py-7 md:py-8 lg:py-10 flex flex-col gap-4 xl:flex-row w-full justify-between xl:items-center">
                <div>
                    <p className='text-lg md:text-xl text-black font-medium leading-100'>
                        Bulk Deposit
                    </p>
                    <p className='text-sm md:text-base font-normal text-black/70 leading-100 pt-1'>
                        Here you can upload statements for bulk deposit.
                    </p>
                </div>
                <div className="flex gap-4 sm:gap-5 flex-col sm:flex-row">
                    <button className="cursor-pointer max-w-max max-sm:h-10 text-nowrap bg-white text-sm flex gap-1 items-center leading-100 md:text-base font-medium py-2 border md:py-2.5 rounded-[10px] border-black text-black px-3 md:px-4">
                        Custom Sheet Status
                    </button>
                    <button onClick={() => setUpdateBulkDespositData(true)} className='text-sm text-nowrap md:text-base py-2 cursor-pointer rounded-[10px] px-4 bg-purple flex items-center gap-5 text-white hover:opacity-85 max-w-max'>
                        Add Custom Sheet
                        <Icons icon={"puls"} />
                    </button>
                </div>
            </div>



            {/* Table */}
            <CtaTable
                columns={columns}
                data={currentBanks}
                showCheckbox
                allChecked={
                    currentBanks.length > 0 &&
                    selectedBanks.length === currentBanks.length
                }
                onCheckAll={() => {
                    if (selectedBanks.length === currentBanks.length) {
                        setSelectedBanks([]);
                    } else {
                        setSelectedBanks(currentBanks.map((b) => b.name));
                    }
                }}
                renderRow={(b, i) => (
                    <tr key={i} className="border-t border-[#E4E6E8]">
                        <td className="md:px-[15px] py-3 px-2">
                            <input
                                type="checkbox"
                                checked={selectedBanks.includes(b.name)}
                                onChange={() => handleCheckboxChange(b.name)}
                                className="border-[#959BA4] rounded-[5px] cursor-pointer"
                            />
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{b.name}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{b.fileType}</td>
                        <td className="text-[#4B5563] text-sm font-normal px-2.5">
                            <div className="flex gap-10 md:gap-14 xl:gap-16">
                                {b.columns.map((col, index) => (
                                    <span key={index}>{col}</span>
                                ))}
                            </div>
                        </td>
                        <td className="w-[120px] px-2.5 text-sm font-bold text-center">
                            <span
                                className={`inline-block w-full px-2 py-1 rounded text-xs font-bold ${b.status === "Succeeded"
                                    ? "bg-[#EDFFEA] text-[#165E3D]"
                                    : b.status === "In Review"
                                        ? "bg-[#FFF6E9] text-[#B5850B]"
                                        : "bg-[#FFEAEA] text-[#B83131]"
                                    }`}
                            >
                                {b.status}
                            </span>
                        </td>
                    </tr>
                )}
            />

            <CtaPagination
                currentPage={currentPage}
                totalItems={filteredBanks.length}
                itemsPerPage={itemsPerPage}
                onPageChange={paginate}
            />


        </div>
    );
};

export default DepositList;
