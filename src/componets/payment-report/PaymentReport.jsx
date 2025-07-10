"use client";

import { useState } from "react";
import CtaButton from "../custom-ui/CtaButton";
import CtaDropDown from "../custom-ui/CtaDropDown";
import CtaPagination from "../custom-ui/CtaPagination";
import CtaSearch from "../custom-ui/CtaSearch";
import CtaTable from "../custom-ui/CtaTable";
import Icons from "../common/Icons";

const merchants = [
    {
        name: "Phantom777",
        totalDeposit: "₹1,00,00,000",
        charges: "4%",
        totalCharge: "₹4,00,000",
        approver: "₹3,00,000",
        admin: "₹1,00,000",
        paymentDate: "Mar 23, 2022, 13:00 PM",
    },
    {
        name: "QuantumX",
        totalDeposit: "₹75,00,000",
        charges: "4%",
        totalCharge: "₹2,62,500",
        approver: "₹1,87,500",
        admin: "₹75,000",
        paymentDate: "Apr 10, 2022, 10:15 AM",
    },
    {
        name: "NexusTech",
        totalDeposit: "₹50,00,000",
        charges: "4%",
        totalCharge: "₹2,50,000",
        approver: "₹1,50,000",
        admin: "₹1,00,000",
        paymentDate: "May 15, 2022, 09:30 AM",
    },
    {
        name: "TechWave",
        totalDeposit: "₹1,20,00,000",
        charges: "4%",
        totalCharge: "₹5,40,000",
        approver: "₹4,00,000",
        admin: "₹1,40,000",
        paymentDate: "Jun 25, 2022, 14:45 PM",
    },
    {
        name: "DataSphere",
        totalDeposit: "₹90,00,000",
        charges: "4%",
        totalCharge: "₹2,70,000",
        approver: "₹1,80,000",
        admin: "₹90,000",
        paymentDate: "Jul 30, 2022, 11:00 AM",
    },
    {
        name: "InnoVate",
        totalDeposit: "₹1,50,00,000",
        charges: "4%",
        totalCharge: "₹9,00,000",
        approver: "₹6,00,000",
        admin: "₹3,00,000",
        paymentDate: "Aug 20, 2022, 12:00 PM",
    },
    {
        name: "SmartTech",
        totalDeposit: "₹1,80,00,000",
        charges: "4%",
        totalCharge: "₹7,56,000",
        approver: "₹5,40,000",
        admin: "₹2,16,000",
        paymentDate: "Sep 12, 2022, 15:30 PM",
    },
    {
        name: "NextGen Solutions",
        totalDeposit: "₹65,00,000",
        charges: "4%",
        totalCharge: "₹2,47,000",
        approver: "₹1,45,000",
        admin: "₹1,02,000",
        paymentDate: "Oct 05, 2022, 09:00 AM",
    },
];

const merchantColumns = [
    "MERCHANT NAME",
    "TOTAL DEPOSIT",
    "CHARGES",
    "TOTAL CHARGE",
    "APPROVER 3%",
    "ADMIN 1%",
    "PAYMENT DATE",
    "ACTION"
];

const PaymentReport = () => {
    const [tempMerchantFilter, setTempMerchantFilter] = useState("");
    const [tempFromDate, setTempFromDate] = useState("");
    const [tempToDate, setTempToDate] = useState("");
    const [tempSearchTerm, setTempSearchTerm] = useState("");

    const [merchantFilter, setMerchantFilter] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [selectedMerchants, setSelectedMerchants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loadClicked, setLoadClicked] = useState(false);

    const uniqueMerchants = [...new Set(merchants.map((m) => m.name))];
    const uniquePaymentDates = [...new Set(merchants.map((m) => m.paymentDate))];

    const handleLoad = () => {
        setMerchantFilter(tempMerchantFilter);
        setFromDate(tempFromDate);
        setToDate(tempToDate);
        setLoadClicked(true);
        setSelectedMerchants([]);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setTempMerchantFilter("");
        setTempSearchTerm("");
        setTempFromDate("");
        setTempToDate("");
        setMerchantFilter("");
        setFromDate("");
        setToDate("");
        setSelectedMerchants([]);
        setLoadClicked(false);
        setCurrentPage(1);
    };

    const filteredMerchants = merchants
        .filter((m) => {
            const matchesMerchant = !merchantFilter || m.name === merchantFilter;
            const payment = new Date(m.paymentDate);
            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;
            const inDateRange = (!from || payment >= from) && (!to || payment <= to);
            return matchesMerchant && inDateRange;
        })
        .filter((m) =>
            m.name.toLowerCase().includes(tempSearchTerm.toLowerCase())
        );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMerchants = filteredMerchants.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handleCheckboxChange = (name) => {
        setSelectedMerchants((prev) =>
            prev.includes(name)
                ? prev.filter((id) => id !== name)
                : [...prev, name]
        );
    };

    // Calculate totals for the summary cards
    const totalDeposits = merchants.reduce((sum, merchant) => {
        const amount = parseInt(merchant.totalDeposit.replace(/[^0-9]/g, ''));
        return sum + amount;
    }, 0);

    const totalApproverEarnings = merchants.reduce((sum, merchant) => {
        const amount = parseInt(merchant.approver.replace(/[^0-9]/g, ''));
        return sum + amount;
    }, 0);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount).replace('₹', '₹');
    };

    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] overflow-clip lg:px-[22px] bg-white w-full relative">

            <div className="max-w-[888px] grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-7 lg:grid-cols-3 mb-7 md:mb-8 lg:mb-10">
                <div className="bg-white rounded-[10px] flex gap-2.5 py-3 px-4">
                    <Icons icon={"totaldeposit"} />
                    <div className="">
                        <p className="text-[#425166] font-bold text-[11px]">Total Deposits</p>
                        <p className="text-base md:text-lg font-semibold flex items-center gap-2.5 leading-120">
                            {formatCurrency(totalDeposits)}
                            <span className="text-[#24A959] text-xs font-semibold flex items-center gap-1">
                                <Icons icon={"greenarrow"} />
                                {""} 1.7%
                            </span>
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-[10px] flex gap-2.5 py-3 px-4">
                    <Icons icon={"totaapproverl"} />
                    <div className="">
                        <p className="text-[#425166] font-bold text-[11px]">Total Approver Earnings</p>
                        <p className="text-base md:text-lg font-semibold flex items-center gap-2.5 leading-120">
                            {formatCurrency(totalApproverEarnings)}
                            <span className="text-[#24A959] text-xs font-semibold flex items-center gap-1">
                                <Icons icon={"greenarrow"} />
                                {""} 1.7%
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-y-4 md:gap-y-5 gap-5 items-center">
                <CtaDropDown
                    data={uniquePaymentDates}
                    value={tempFromDate}
                    onChange={setTempFromDate}
                    placeholder="From Date"
                />
                <CtaDropDown
                    data={uniquePaymentDates}
                    value={tempToDate}
                    onChange={setTempToDate}
                    placeholder="To Date"
                />
                <CtaDropDown
                    data={uniqueMerchants}
                    value={tempMerchantFilter}
                    onChange={setTempMerchantFilter}
                    placeholder="Merchant Name"
                />
                <CtaButton
                    left
                    className={`${loadClicked ? "bg-purple text-white" : "bg-purple text-white"}`}
                    onClick={handleLoad}
                    main
                >
                    Load
                </CtaButton>
                <CtaButton left main onClick={handleReset}>
                    Reset
                </CtaButton>
            </div>

            <CtaSearch
                addLink="/"
                searchValue={tempSearchTerm}
                placeholder="Search by merchant name"
                onChange={(e) => setTempSearchTerm(e.target.value)}
                exportbutton
                icons={"exportcsv"}
            >
                Export CSV
            </CtaSearch>

            <CtaTable
                columns={merchantColumns}
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
                        <td className="md:px-[15px] py-3 px-2">
                            <input
                                type="checkbox"
                                checked={selectedMerchants.includes(m.name)}
                                onChange={() => handleCheckboxChange(m.name)}
                                className="border-[#959BA4] rounded-[5px] cursor-pointer"
                            />
                        </td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.name}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.totalDeposit}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.charges}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.totalCharge}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.approver}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.admin}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.paymentDate}</td>
                        <td className="w-[100px] px-4 text-sm font-bold text-center">
                            <button className="text-purple underline">
                                View
                            </button>
                        </td>
                    </tr>
                )}
            />
            <CtaPagination
                currentPage={currentPage}
                totalItems={filteredMerchants.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default PaymentReport;