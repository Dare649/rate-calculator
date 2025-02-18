"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface SelectItem {
  icon?: string;
  title: string;
  abs?: string;
}

interface SelectProps {
  data?: SelectItem[];
  onSelect: (item: SelectItem) => void;
  placeholder?: string;
  text?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ data = [], onSelect, placeholder = "Search...", text = "", disabled = false }) => {
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSelect = (item: SelectItem) => {
    if (disabled) return;
    setSelectedItem(item);
    onSelect(item);
    setIsSelectOpen(false);
  };

  return (
    <div className={`relative w-full ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <div
        className={`w-full flex justify-between items-center border-2 border-primary-5 rounded-lg p-3 bg-white ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => !disabled && setIsSelectOpen(!isSelectOpen)}
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

        {isSelectOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
      </div>

      {isSelectOpen && data.length > 0 && !disabled && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-primary-5 rounded-lg shadow-lg lg:px-3 sm:px-1">
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
                    <h2 className="uppercase text-secondary-4">{item.title}</h2>
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

export default Select;
