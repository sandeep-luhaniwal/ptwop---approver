"use client";

import { useState } from "react";
import CtaTable from "../custom-ui/CtaTable";
import CtaPagination from "../custom-ui/CtaPagination";
import Icons from "../common/Icons";

const agents = [
    {
        bulkDeposit: "👁️ View",
        mainData: "👁️ View",
        accountData: "👁️ View",
        paymentData: "INR",
        provider: "USDT Crypto",
        userName: "qqphantom777",
        minMaxRange: "2000 - 10000000",
        txnCountRange: "0<>0",
        totalTxnAmtRange: "0<>0",
        paymentLimit: "10000000",
        currentPaymentLimit: "10000000",
        agentActive: "De‑Active",
    },
    {
        bulkDeposit: "👁️ View",
        mainData: "👁️ View",
        accountData: "👁️ View",
        paymentData: "PKT",
        provider: "USDT Crypto",
        userName: "qqphantom777",
        minMaxRange: "2000 - 10000000",
        txnCountRange: "0<>0",
        totalTxnAmtRange: "0<>0",
        paymentLimit: "10000000",
        currentPaymentLimit: "10000000",
        agentActive: "De‑Active",
    },
    {
        bulkDeposit: "👁️ View",
        mainData: "👁️ View",
        accountData: "👁️ View",
        paymentData: "INR",
        provider: "USDT Crypto",
        userName: "qqphantom777",
        minMaxRange: "2000 - 10000000",
        txnCountRange: "0<>0",
        totalTxnAmtRange: "0<>0",
        paymentLimit: "10000000",
        currentPaymentLimit: "10000000",
        agentActive: "De‑Active",
    },
    {
        bulkDeposit: "👁️ View",
        mainData: "👁️ View",
        accountData: "👁️ View",
        paymentData: "INR",
        provider: "USDT Crypto",
        userName: "qqphantom777",
        minMaxRange: "2000 - 10000000",
        txnCountRange: "0<>0",
        totalTxnAmtRange: "0<>0",
        paymentLimit: "10000000",
        currentPaymentLimit: "10000000",
        agentActive: "De‑Active",
    },
    {
        bulkDeposit: "👁️ View",
        mainData: "👁️ View",
        accountData: "👁️ View",
        paymentData: "INR",
        provider: "USDT Crypto",
        userName: "qqphantom777",
        minMaxRange: "2000 - 10000000",
        txnCountRange: "0<>0",
        totalTxnAmtRange: "0<>0",
        paymentLimit: "10000000",
        currentPaymentLimit: "10000000",
        agentActive: "De‑Active",
    },
    {
        bulkDeposit: "👁️ View",
        mainData: "👁️ View",
        accountData: "👁️ View",
        paymentData: "PKT",
        provider: "USDT Crypto",
        userName: "qqphantom777",
        minMaxRange: "2000 - 10000000",
        txnCountRange: "0<>0",
        totalTxnAmtRange: "0<>0",
        paymentLimit: "10000000",
        currentPaymentLimit: "10000000",
        agentActive: "De‑Active",
    },
    {
        bulkDeposit: "👁️ View",
        mainData: "👁️ View",
        accountData: "👁️ View",
        paymentData: "INR",
        provider: "USDT Crypto",
        userName: "qqphantom777",
        minMaxRange: "2000 - 10000000",
        txnCountRange: "0<>0",
        totalTxnAmtRange: "0<>0",
        paymentLimit: "10000000",
        currentPaymentLimit: "10000000",
        agentActive: "De‑Active",
    },
    {
        bulkDeposit: "👁️ View",
        mainData: "👁️ View",
        accountData: "👁️ View",
        paymentData: "INR",
        provider: "USDT Crypto",
        userName: "qqphantom777",
        minMaxRange: "2000 - 10000000",
        txnCountRange: "0<>0",
        totalTxnAmtRange: "0<>0",
        paymentLimit: "10000000",
        currentPaymentLimit: "10000000",
        agentActive: "De-Active",
    },
];

const columns = [
    "BULK DEPOSIT",
    "MAIN DATA",
    "ACCOUNT DATA",
    "PAYMENT DATA",
    "PROVIDER",
    "USER NAME",
    "MIN‑MAX RANGE",
    "TXN COUNT RANGE",
    "TOTAL TXN AMT RANGE",
    "PAYMENT LIMIT",
    "CURRENT PAYMENT LIMIT",
    "AGENT ACTIVE",
    { label: "ACTION", className: "text-end pe-10" },
];

const ManualDeposit = () => {
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const perPage = 10;

    const indexOfLast = page * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const current = agents.slice(indexOfFirst, indexOfLast);

    const handleCheck = (id) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );

    return (
        <div>
            <div className="py-7 md:py-8 lg:py-10">
                <p className="text-lg md:text-xl font-medium text-black leading-100">
                    Manual Deposit
                </p>
                <p className="text-sm md:text-base font-normal text-black/70 leading-100 pt-1">
                    Manage your deposit setting and preferences.
                </p>
            </div>
            <div className="py-7 flex justify-between">
                <div className="py-2 md:max-w-[251px] w-full flex gap-1 md:py-2.5 px-3 md:px-4 bg-[#f4f4f4] rounded-[10px]">
                    <label htmlFor="search">
                        <Icons className={'fill-black'} icon={'search'} />
                    </label>
                    <input
                        placeholder="search"
                        type="search" name="search" id="search" className="text-black w-full placeholder:text-black text-sm md:text-base font-normal leading-100 outline-none" />
                </div>
                <div className="flex gap-6 md:gap-7">
                    <button className="cursor-pointer bg-white text-sm flex gap-1 items-center leading-100 md:text-base font-medium py-2 border md:py-2.5 rounded-[10px] border-black text-black px-3 md:px-4">All
                        <span>
                            <Icons className={'fill-white'} icon={'downarrow'} />
                        </span>
                    </button>
                    <button className="cursor-pointer bg-white text-sm flex gap-1 items-center leading-100 md:text-base font-medium py-2 border md:py-2.5 rounded-[10px] border-black text-black px-3 md:px-4">Reset
                        <span>
                            <Icons className={'fill-white'} icon={'reset'} />
                        </span>
                    </button>
                    <button className="cursor-pointer bg-white text-sm flex gap-1 items-center leading-100 md:text-base font-medium py-2 border md:py-2.5 rounded-[10px] border-black text-black px-3 md:px-4">UTR Submit Type
                    </button>
                    <button className="cursor-pointer bg-white text-sm flex gap-1 items-center leading-100 md:text-base font-medium py-2 border md:py-2.5 rounded-[10px] border-black text-black px-3 md:px-4">Filter
                        <span>
                            <Icons className={'stroke-'} icon={'filter'} />
                        </span>
                    </button>
                </div>

            </div>
            <CtaTable
                columns={columns}
                data={current}
                showCheckbox
                allChecked={current.length > 0 && selected.length === current.length}
                onCheckAll={() =>
                    selected.length === current.length
                        ? setSelected([])
                        : setSelected(current.map((d) => d.userName))
                }
                renderRow={(row, i) => (
                    <tr key={i} className="border-t border-[#E4E6E8]">
                        <td className="md:px-[15px] py-3 px-2">
                            <input
                                type="checkbox"
                                checked={selected.includes(row.userName)}
                                onChange={() => handleCheck(row.userName)}
                                className="border-[#959BA4] rounded-[5px] cursor-pointer"
                            />
                        </td>
                        <td className="text-[#4B5563] text-sm font-bold text-nowrap underline px-3">{row.bulkDeposit}</td>
                        <td className="text-[#4B5563] text-sm font-bold text-nowrap underline px-3">{row.mainData}</td>
                        <td className="text-[#4B5563] text-sm font-bold text-nowrap underline px-3">{row.accountData}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-3">{row.paymentData}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-3">{row.provider}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-3">{row.userName}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-3">{row.minMaxRange}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-3">{row.txnCountRange}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-3">{row.totalTxnAmtRange}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-3">{row.paymentLimit}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-3">{row.currentPaymentLimit}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-3">{row.agentActive}</td>
                        <td className="text-end text-[#4B5563] text-sm font-normal text-nowrap px-3 space-x-2">
                            <button className="underline text-sm text-[#4B5563]">View</button>
                            <button className="underline text-sm text-[#4B5563]">Edit</button>
                        </td>
                    </tr>
                )}
            />

            <CtaPagination
                currentPage={page}
                totalItems={agents.length}
                itemsPerPage={perPage}
                onPageChange={setPage}
            />
        </div>
    );
};

export default ManualDeposit;
