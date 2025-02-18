'use client';

import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: Array<{ [key: string]: any }>;
  text1: string;
}

const Table: React.FC<TableProps> = ({ columns, data, text1 }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Array<{ [key: string]: any }>>([]);

  useEffect(() => {
    setFilteredData(data); // Ensure filteredData updates when data changes
  }, [data]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(data);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    
    const updatedData = data.filter((item) =>
      columns.some((col) => {
        const value = item[col.key];

        // Handle "check" field separately (search in title & abs)
        if (col.key === "check" && Array.isArray(value)) {
          return value.some(
            (entry) =>
              entry.title?.toLowerCase().includes(lowerCaseQuery) ||
              entry.abs?.toLowerCase().includes(lowerCaseQuery)
          );
        }

        return value?.toString()?.toLowerCase().includes(lowerCaseQuery);
      })
    );

    setFilteredData(updatedData);
  }, [searchQuery, data, columns]);

  return (
    <div className="w-full relative overflow-x-auto">
      {/* Search Bar */}
      <div className="w-full flex lg:flex-row sm:flex-cols gap-y-3 items-center justify-between">
        <h2 className="capitalize text-primary-4 lg:text-[24px] sm:text-lg">{text1}</h2>
        <div className="">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:px-3 lg:py-2 sm:px-2 sm:py-1 border-primary-4 border-2 rounded-lg outline-none focus:border-primary-1"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left shadow-lg mt-3 rounded-2xl">
        <thead className="bg-primary-6 w-full rounded-2xl">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="lg:px-[48px] lg:py-[13.008px] sm:px-5 sm:py-3 capitalize">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No Data Available
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index} className="border-b border-primary-6">
                {columns.map((col) => (
                  <td key={col.key} className="lg:pt-[12px] lg:pr-[24px] lg:pb-[12px] lg:pl-[48px] sm:p-5">
                    {col.key === "chg" ? (
                      <>
                        {item[col.key] && item[col.key].toString().startsWith('-') ? (
                          <div className="flex items-center text-red-500">
                            <IoIosArrowDown />
                            <span>{item[col.key]}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-green-500">
                            <IoIosArrowUp />
                            <span>{item[col.key]}</span>
                          </div>
                        )}
                      </>
                    ) : col.key === "check" && Array.isArray(item.check) ? (
                      <div className="flex items-center gap-2">
                        <img src={item.check[0].icon} alt={item.check[0].title} className="w-6 h-6 rounded-full" />
                        <span className="capitalize">{item.check[0].title}</span>
                        <span className="text-primary-5 capitalize">{item.check[0].abs}</span>
                      </div>
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
