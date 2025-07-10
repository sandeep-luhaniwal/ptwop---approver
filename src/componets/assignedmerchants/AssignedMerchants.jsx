"use client";

import React, { useState, useRef, useEffect } from "react";
import Icons from "../common/Icons";
import Link from "next/link";
import CtaDropDown from "../custom-ui/CtaDropDown";
import CtaPagination from "../custom-ui/CtaPagination";
import CtaSearch from "../custom-ui/CtaSearch";
import CtaButton from "../custom-ui/CtaButton";
import CtaTable from "../custom-ui/CtaTable";

const merchants = [
    {
        name: "PayEase",
        deposit: "35,0000",
        limit: "40,0000",
        email: "PayEase@gmail.com",
        status: "Inactive",
        created: "Apr 03, 2022, 14:15 PM",
    },
    {
        name: "CashNow",
        deposit: "70,0000",
        limit: "85,0000",
        email: "CashNow@gmail.com",
        status: "Active",
        created: "Apr 04, 2022, 10:45 AM",
    },
    {
        name: "PayFast",
        deposit: "45,0000",
        limit: "55,0000",
        email: "PayFast@gmail.com",
        status: "Active",
        created: "Apr 05, 2022, 13:30 PM",
    },
    {
        name: "MoneyExpress",
        deposit: "80,0000",
        limit: "90,0000",
        email: "MoneyExpress@gmail.com",
        status: "Inactive",
        created: "Apr 06, 2022, 16:00 PM",
    },
    {
        name: "PayQuick",
        deposit: "50,0000",
        limit: "60,0000",
        email: "PayQuick@gmail.com",
        status: "Active",
        created: "Apr 07, 2022, 09:30 AM",
    },
];

const AssignedMerchants = () => {
    const [tempNameFilter, setTempNameFilter] = useState("");
    const [tempStatusFilter, setTempStatusFilter] = useState("");
    const [tempSearchTerm, setTempSearchTerm] = useState("");

    const [nameFilter, setNameFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedMerchants, setSelectedMerchants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [showNameDropdown, setShowNameDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [loadClicked, setLoadClicked] = useState(false);

    const nameDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);

    const uniqueNames = [...new Set(merchants.map((m) => m.name))];
    const uniqueStatuses = [...new Set(merchants.map((m) => m.status))];

    const handleLoad = () => {
        setNameFilter(tempNameFilter);
        setStatusFilter(tempStatusFilter);
        setLoadClicked(true);
        setSelectedMerchants([]);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handleReset = () => {
        setTempNameFilter("");
        setTempStatusFilter("");
        setTempSearchTerm("");
        setNameFilter("");
        setStatusFilter("");
        setSelectedMerchants([]);
        setLoadClicked(false);
        setCurrentPage(1); // Reset to first page
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                nameDropdownRef.current &&
                !nameDropdownRef.current.contains(e.target)
            ) {
                setShowNameDropdown(false);
            }
            if (
                statusDropdownRef.current &&
                !statusDropdownRef.current.contains(e.target)
            ) {
                setShowStatusDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredMerchants = merchants
        .filter((merchant) => {
            const matchesName =
                nameFilter === "" || merchant.name === nameFilter;
            const matchesStatus =
                statusFilter === "" || merchant.status === statusFilter;
            return matchesName && matchesStatus;
        })
        .filter((merchant) =>
            merchant.name.toLowerCase().includes(tempSearchTerm.toLowerCase())
        );

    // Get current merchants
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMerchants = filteredMerchants.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);

    const handleCheckboxChange = (email) => {
        setSelectedMerchants((prev) =>
            prev.includes(email)
                ? prev.filter((id) => id !== email)
                : [...prev, email]
        );
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:px-[22px] bg-white w-full relative">
            <div className="flex flex-wrap gap-y-2.5 md:gap-y-5 gap-5">
                <CtaDropDown
                    data={uniqueNames}
                    value={tempNameFilter}
                    onChange={setTempNameFilter}
                    placeholder="Merchant Name"
                    dropdownRef={nameDropdownRef}
                />
                <CtaDropDown
                    data={uniqueStatuses}
                    value={tempStatusFilter}
                    onChange={setTempStatusFilter}
                    placeholder="Status"
                    icon="flag"
                    dropdownRef={statusDropdownRef}
                />
                <CtaButton left className={`${loadClicked ? "bg-purple text-white" : "bg-purple text-white"}`} onClick={handleLoad} main>Load</CtaButton>
                <CtaButton left main onClick={handleReset}>Reset</CtaButton>
            </div>
            <CtaSearch
                searchValue={tempSearchTerm}
                placeholder="Search by approver name, assigned merchant"
                onChange={(e) => setTempSearchTerm(e.target.value)}
                exportbutton
                icons={"exportcsv"}
            >
                Export CSV
            </CtaSearch>
            <div className="overflow-hidden max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px]">
                <CtaTable
                    columns={[
                        "MERCHANT NAME",
                        "TOTAL DEPOSIT",
                        "DAILY LIMIT",
                        "EMAIL",
                        "STATUS",
                        "CREATED ON",
                        "ACTION",
                    ]}
                    data={currentMerchants}
                    showCheckbox
                    allChecked={
                        currentMerchants.length > 0 &&
                        selectedMerchants.length === currentMerchants.length
                    }
                    onCheckAll={() => {
                        if (selectedMerchants.length === currentMerchants.length) {
                            setSelectedMerchants([]);
                        } else {
                            setSelectedMerchants(currentMerchants.map((m) => m.email));
                        }
                    }}
                    renderRow={(m, i) => (
                        <tr key={i} className="border-t border-[#E4E6E8]">
                            <td className="md:px-[15px] py-3 lg:py-[14px] px-2">
                                <input
                                    type="checkbox"
                                    checked={selectedMerchants.includes(m.email)}
                                    onChange={() => handleCheckboxChange(m.email)}
                                    className="border-[#959BA4] rounded-[5px] cursor-pointer"
                                />
                            </td>
                            <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{m.name}</td>
                            <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{m.deposit}</td>
                            <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{m.limit}</td>
                            <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{m.email}</td>
                            <td className="w-[100px] px-2.5 text-sm font-bold text-center">
                                <span
                                    className={`inline-block w-full px-2 py-1 rounded text-xs font-bold ${m.status === "Active"
                                        ? "bg-[#EDFFEA] text-[#165E3D]"
                                        : "bg-[#FFEAEA] text-[#B83131]"
                                        }`}
                                >
                                    {m.status}
                                </span>
                            </td>
                            <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{m.created}</td>
                            <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5 space-x-2">
                                <button className="text-sm cursor-pointer underline">View</button>
                                <button className="text-sm cursor-pointer underline">Edit</button>
                            </td>
                        </tr>
                    )}
                />
            </div>

            <CtaPagination
                currentPage={currentPage}
                totalItems={filteredMerchants.length}
                itemsPerPage={itemsPerPage}
                onPageChange={paginate}
            />
        </div >
    );
};

export default AssignedMerchants