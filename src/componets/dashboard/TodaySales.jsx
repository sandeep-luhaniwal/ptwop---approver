"use client";
import React, { useState, useRef, useEffect } from "react";
import Icons from "../common/Icons";
import TodayCardsDetails from "./TodayCardsDetails";

const options = ["Today", "Yesterday", "Last 7 Days", "This Month", "Last Month"];

const TodaySales = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Today");
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        setSelected(option);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:px-[22px] bg-white max-h-max w-full relative">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-navy-light text-xs md:text-sm font-semibold leading-140 pb-0.5">
                        Today’s Sales
                    </p>
                    <p className="text-[10px] md:text-[12px] leading-200 font-normal text-grey">
                        Sales Summary
                    </p>
                </div>

                <div className="flex md:gap-5 gap-3 relative z-10">
                    <div className="relative" ref={dropdownRef}>
                        <div
                            onClick={toggleDropdown}
                            className="flex gap-2.5 items-center p-2 cursor-pointer border-grey-off border-[0.8px] h-[31px] rounded-[6px]"
                        >
                            <p className="text-xs md:text-[13px] font-medium text-navy-light leading-100">
                                {selected}
                            </p>
                            <Icons icon={"downarrow"} />
                        </div>

                        <div
                            className={`absolute top-[110%] left-0 w-full min-w-[120px] bg-white border border-grey-off rounded-md shadow-md overflow-hidden transition-all duration-300 ease-in-out ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 pointer-events-none -translate-y-1"
                                }`}
                        >
                            {options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => handleOptionClick(option)}
                                    className="px-4 py-2 hover:bg-gray-100 text-sm text-navy-light cursor-pointer"
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="flex gap-2.5 items-center p-2 cursor-pointer border-grey-off border-[0.8px] h-[31px] rounded-[6px]">
                        <Icons icon={"export"} />
                        <span className="text-xs md:text-[13px] font-medium text-navy-light leading-100">
                            Export CSV
                        </span>
                    </button>
                </div>
            </div>
            <TodayCardsDetails />
        </div>
    );
};

export default TodaySales;
