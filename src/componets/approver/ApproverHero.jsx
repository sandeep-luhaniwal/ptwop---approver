"use client";

import { useEffect, useRef, useState } from "react";
import CtaButton from "../custom-ui/CtaButton";
import CtaDropDown from "../custom-ui/CtaDropDown";
import CtaPagination from "../custom-ui/CtaPagination";
import CtaSearch from "../custom-ui/CtaSearch";
import CtaTable from "../custom-ui/CtaTable";
import ApproverPopUp from "./ApproverPopUp";

const approvers = [
    { name: "Niropay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
    { name: "Goopay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
    { name: "Apppay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Inactive" },
    { name: "Viewpay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
    { name: "Portpay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
    { name: "Surepay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
    { name: "Outpay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Inactive" },
    { name: "Mejopay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
    { name: "Apppay", assigned: 25, created: "Mar 23, 2022, 13:00 PM", status: "Active" },
];
const approverColumns = [
    "APPROVER NAME",
    "ASSIGNED",
    "CREATED ON",
    "STATUS",
    { label: "ACTION", className: "text-end pe-10" },
];

const ApproverHero = () => {
    const [tempApproverFilter, setTempApproverFilter] = useState("");
    const [tempMerchantFilter, setTempMerchantFilter] = useState("");
    const [tempStatusFilter, setTempStatusFilter] = useState("");
    const [tempSearchTerm, setTempSearchTerm] = useState("");

    const [approverFilter, setApproverFilter] = useState("");
    const [merchantFilter, setMerchantFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedMerchants, setSelectedMerchants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [showApproverDropdown, setShowApproverDropdown] = useState(false);
    const [showMerchantDropdown, setShowMerchantDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [loadClicked, setLoadClicked] = useState(false);
    const [popupApprover, setPopupApprover] = useState(null);

    const approverDropdownRef = useRef(null);
    const merchantDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);

    const uniqueNames = [...new Set(approvers.map((m) => m.name))];
    const uniqueStatuses = [...new Set(approvers.map((m) => m.status))];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (approverDropdownRef.current && !approverDropdownRef.current.contains(e.target)) {
                setShowApproverDropdown(false);
            }
            if (merchantDropdownRef.current && !merchantDropdownRef.current.contains(e.target)) {
                setShowMerchantDropdown(false);
            }
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target)) {
                setShowStatusDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLoad = () => {
        setApproverFilter(tempApproverFilter);
        setMerchantFilter(tempMerchantFilter);
        setStatusFilter(tempStatusFilter);
        setLoadClicked(true);
        setSelectedMerchants([]);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setTempApproverFilter("");
        setTempMerchantFilter("");
        setTempStatusFilter("");
        setTempSearchTerm("");
        setApproverFilter("");
        setMerchantFilter("");
        setStatusFilter("");
        setSelectedMerchants([]);
        setLoadClicked(false);
        setCurrentPage(1);
    };

    const filteredMerchants = approvers
        .filter((merchant) => {
            const matchesApprover = approverFilter === "" || merchant.name === approverFilter;
            const matchesMerchant = merchantFilter === "" || merchant.name === merchantFilter;
            const matchesStatus = statusFilter === "" || merchant.status === statusFilter;
            return matchesApprover && matchesMerchant && matchesStatus;
        })
        .filter((merchant) =>
            merchant.name.toLowerCase().includes(tempSearchTerm.toLowerCase())
        );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMerchants = filteredMerchants.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);

    const handleCheckboxChange = (name) => {
        setSelectedMerchants((prev) =>
            prev.includes(name) ? prev.filter((id) => id !== name) : [...prev, name]
        );
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:px-[22px] bg-white w-full relative">
            <div className="flex flex-wrap gap-y-2.5 md:gap-y-5 gap-5">
                <CtaDropDown
                    data={uniqueNames}
                    value={tempApproverFilter}
                    onChange={setTempApproverFilter}
                    placeholder="Approver Name"
                    dropdownRef={approverDropdownRef}
                />
                <CtaDropDown
                    data={uniqueNames}
                    value={tempMerchantFilter}
                    onChange={setTempMerchantFilter}
                    placeholder="Merchant Name"
                    dropdownRef={merchantDropdownRef}
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
                addLink="/dashboard/approvers/add-new-approvers"
                searchValue={tempSearchTerm}
                placeholder={"Search by approver name, assigned merchant"}
                onChange={(e) => setTempSearchTerm(e.target.value)}
            >
                Add New Approver
            </CtaSearch>
            <CtaTable
                columns={approverColumns}
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
                        setSelectedMerchants(currentMerchants.map((m) => m.name));
                    }
                }}
                renderRow={(m, i) => (
                    <tr key={i} className="border-t border-[#E4E6E8]">
                        <td className="md:px-[15px] py-3 lg:py-[14px] px-2">
                            <input
                                type="checkbox"
                                checked={selectedMerchants.includes(m.name)}
                                onChange={() => handleCheckboxChange(m.name)}
                                className="border-[#959BA4] rounded-[5px] cursor-pointer"
                            />
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{m.name}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                            {m.assigned} 👁️ View
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{m.created}</td>
                        <td className="w-[100px] px-2.5 text-sm font-bold text-center">
                            <span
                                className={`inline-block w-full px-2 py-1 rounded text-xs font-bold ${m.status === "Active" ? "bg-[#EDFFEA] text-[#165E3D]" : "bg-[#FFEAEA] text-[#B83131]"
                                    }`}
                            >
                                {m.status}
                            </span>
                        </td>
                        <td className="text-end text-sm font-normal text-nowrap px-2.5 space-x-2">
                            <button className="text-sm text-[#4B5563] cursor-pointer underline">Edit</button>
                            <button
                                onClick={() => setPopupApprover(m.name)}
                                className={`text-sm cursor-pointer underline ${popupApprover === m.name ? "text-[#4B5563]/65" : "text-[#4B5563]"
                                    }`}
                            >
                                {popupApprover === m.name ? "Enable" : "Disable"}
                            </button>
                        </td>
                    </tr>
                )}
            />
            <CtaPagination
                currentPage={currentPage}
                totalItems={filteredMerchants.length}
                itemsPerPage={itemsPerPage}
                onPageChange={paginate}
            />
            {popupApprover ? (
                <ApproverPopUp
                    popupApprover={popupApprover}
                    setPopupApprover={setPopupApprover}
                />
            ) : ""}
        </div>
    );
};

export default ApproverHero;
