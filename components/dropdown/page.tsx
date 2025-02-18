"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface DropdownItem {
  title?: string;
  icon?: string;
  abs?: string;
  chg?: number;
}


interface DropdownProps<T> {
  data?: T[];
  onSelect: (item: T) => void;
  placeholder?: string;
  text?: string;
  disableInput?: boolean;
}

const Dropdown = <T extends { title: string; icon?: string; abs: string }>({
  data = [],
  onSelect,
  placeholder = "Search...",
  text = "",
  disableInput = false,
}: DropdownProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    onSelect(item);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="w-full flex justify-between items-center border-2 border-primary-5 rounded-lg p-3 bg-white cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center gap-2">
          {selectedItem ? (
            <>
              {selectedItem.icon && <img src={selectedItem.icon} alt={selectedItem.title} className="w-6 h-6 rounded-full" />}
              <span className="capitalize lg:text-lg text-primary-4">{selectedItem.title}</span>
            </>
          ) : (
            <span className="text-gray-500">{text}</span>
          )}
        </div>

        {isDropdownOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
      </div>

      {isDropdownOpen && data.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-primary-5 rounded-lg shadow-lg lg:px-3 sm:px-1">
          <input
            type="text"
            className="w-full p-2 border-2 focus:border-primary-1 border-primary-3 rounded-lg mt-2 outline-none"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            disabled={disableInput} // Dynamically disable input
          />

          <div className="max-h-60 overflow-y-auto">
            {data
              .filter((item) => item.title.toLowerCase().includes(searchTerm))
              .map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  <div className="flex items-center gap-x-2">
                    {item.icon && <img src={item.icon} alt={item.title} className="w-6 h-6 rounded-full" />}
                    <h2 className="capitalize text-secondary-4">{item.title}</h2>
                  </div>
                  {item.abs && <h2 className="text-primary-3 font-bold">{item.abs}</h2>}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
