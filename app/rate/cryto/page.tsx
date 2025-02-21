"use client";

import { useState } from "react";
import { crypto } from "@/data/dummy";
import Dropdown from "@/components/dropdown/page";
import { BsArrowDownUp } from "react-icons/bs";

interface CryptoAsset {
  title: string;
  icon: string;
  abs: string;
  chg?: number;
}

const Crypto = () => {
  // Explicitly define state types
  const [fromAsset, setFromAsset] = useState<CryptoAsset | null>(null);
  const [toAsset, setToAsset] = useState<CryptoAsset | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  const handleSelectFrom = (item: CryptoAsset) => {
    setFromAsset(item); // Store selected "From" asset
  };

  const handleSelectTo = (item: CryptoAsset) => {
    setToAsset(item); // Store selected "To" asset
  };

  return (
    <div className="w-full">
      <form className="w-full"> 
        {/* FROM & TO SELECTION */}
        <div className="flex lg:flex-row sm:flex-col items-center gap-1">
          {/* FROM */}
          <div className="flex-1 w-full">
            <h2 className="capitalize lg:pb-[8px] text-secondary-1 font-[16px] lg:text-base sm:text-md">From</h2>
            <Dropdown data={crypto} onSelect={handleSelectFrom} placeholder="Search for an asset" text="Select an asset"/>
          </div>

          {/* SWAP ICON */}
          <div className="lg:w-8 lg:h-8 sm:w- rounded-full bg-primary-1 flex items-center justify-center mt-7">
            <BsArrowDownUp className="text-white font-bold" />
          </div>

          {/* TO */}
          <div className="flex-1 w-full">
            <h2 className="capitalize lg:pb-[8px] text-secondary-1 font-[16px] lg:text-base sm:text-md">To</h2>
            <Dropdown data={crypto} onSelect={handleSelectTo} placeholder="Search for an asset" text="Select an asset"/>
          </div>
        </div>

        {/* AMOUNT SECTION */}
        <div className="lg:py-3 sm:py-1 w-full">
          <h4 className="capitalize font-medium lg:text-base sm:text-md">Amount</h4>

          <div className="flex lg:flex-row sm:flex-col items-center gap-5 w-full">
            {/* FROM AMOUNT */}
            <div className="flex-1 w-full">
              <div className={`w-full border-2 rounded-lg flex items-center p-3 ${amount ? "border-primary-1" : "border-secondary-1"} focus-within:border-primary-1`}>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full bg-transparent appearance-none outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  disabled={!fromAsset} // Disable if no asset is selected
                  onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : null)}
                />
                {fromAsset && <h3 className="uppercase font-semibold ml-2">{fromAsset.abs}</h3>}
              </div>
            </div>

            {/* TO AMOUNT */}
            <div className="flex-1 w-full">
              <div className="w-full border-2 border-secondary-1 focus-within:border-primary-1 rounded-lg flex items-center p-3">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full bg-transparent appearance-none outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  disabled={!toAsset} // Disable if no asset is selected
                />
                {toAsset && <h3 className="uppercase font-semibold ml-2">{toAsset.abs}</h3>}
              </div>
            </div>
          </div>
        </div>

        {/* SEPARATOR & RATE SECTION (ONLY SHOW IF AMOUNT IS FILLED) */}
        {amount !== null && amount > 0 && fromAsset && toAsset && (
          <>
            <hr className="w-full bg-secondary-1 h-1 opacity-10 mt-3" />

            {/* RATE SECTION */}
            <div className="lg:p-[15px] sm:p-3 mt-3 bg-primary-1 rounded-2xl flex items-center justify-between w-full">
              <h2 className="font-bold capitalize text-secondary-1 lg:text-base sm:text-md">Rate</h2>
              <h2 className="flex items-center gap-x-2">
                <span className="uppercase text-secondary-1 font-bold lg:text-base sm:text-md">1 {fromAsset.abs}</span>
                <span>=</span>
                <span className="uppercase text-secondary-1 font-bold lg:text-base sm:text-md">1 {toAsset.abs}</span>
              </h2>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Crypto;
