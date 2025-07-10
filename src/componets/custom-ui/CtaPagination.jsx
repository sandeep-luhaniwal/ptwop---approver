"use client";

import React from "react";
import Icons from "../common/Icons";

const CtaPagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm pb-6">
      <p className="text-black order-2 mt-3 md:order-1 text-sm md:text-base">
        Showing {indexOfFirstItem}-{indexOfLastItem} of {totalItems}
      </p>
      <div className="flex items-center order-1 md:order-2 gap-2">
        <button
          className="px-2 py-1 cursor-pointer"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <Icons icon="nextarrow" />
        </button>

        {getPageNumbers().map((number, idx) =>
          number === "..." ? (
            <span key={idx} className="px-1 text-[#4B5563]">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(number)}
              className={`px-3 cursor-pointer py-1 text-base lg:text-lg rounded-[5px] font-medium ${
                currentPage === number
                  ? "bg-purple text-white"
                  : "text-[#4B5563]"
              }`}
            >
              {number}
            </button>
          )
        )}

        <button
          className="px-2 py-1 cursor-pointer"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <Icons icon="prevarrow" />
        </button>
      </div>
    </div>
  );
};

export default CtaPagination;
