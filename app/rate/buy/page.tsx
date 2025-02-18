"use client";

import { useState } from "react";
import Dropdown from "@/components/dropdown/page";
import { crypto, card, currency, cardType } from "@/data/dummy";
import Select from "@/components/select/page";

interface CryptoAsset {
  title: string;
  icon: string;
  abs: string;
  chg?: number;
}

interface CardAsset {
  title: string;
}

interface CardTypeAsset {
  title: string;
}

interface CurrencyAsset {
  title: string;
  icon: string;
  abs: string;
}

const Buy = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardAsset | null>(null);
  const [selectedType, setSelectedType] = useState<CardTypeAsset | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyAsset | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [unit, setUnit] = useState<number>(1);

  const giftCardValues = [5, 10, 20, 50, 75, 100, 200];

  const handleSelect = (item: CryptoAsset) => {
    setSelectedCrypto(item);
    setSelectedCard(null);
    setSelectedCurrency(null);
    setSelectedType(null);
    setSelectedValue(null);
    setUnit(1);
  };

  const handleCard = (item: CardAsset) => {
    setSelectedCard(item);
    setSelectedCurrency(null);
    setSelectedType(null);
    setSelectedValue(null);
    setUnit(1);
  };

  const handleCurrency = (item: CurrencyAsset) => {
    setSelectedCurrency(item);
    setSelectedValue(null);
    setUnit(1);
  };

  const handleValueSelect = (value: number) => {
    setSelectedValue(value);
    setUnit(1);
  };

  const handleAmountChange = (operation: "increase" | "decrease") => {
    setUnit((prev) => {
      const newUnit = operation === "increase" ? prev + 1 : Math.max(1, prev - 1);
      return newUnit;
    });
  };

  return (
    <div className="w-full">
      <form className="w-full">
        {/* Pay with */}
        <div className="w-full flex lg:flex-row sm:flex-col items-center gap-3">
          <div className="flex-1 lg:py-3 sm:py-1 w-full">
            <h2 className="capitalize text-secondary-2 font-[16px] lg:text-base sm:text-md">pay with</h2>
            <Dropdown data={crypto} onSelect={handleSelect} placeholder="Search for an asset" text="Select an asset" />
          </div>
          <div className="flex-1 lg:py-3 sm:py-1 flex-grow w-full">
            <h2 className="capitalize text-secondary-2 font-[16px] lg:text-base sm:text-md">Gift card</h2>
            <Dropdown
              data={card}
              onSelect={handleCard}
              placeholder="Search for gift"
              text="Select a gift card"
              disableInput={!selectedCrypto}
            />
          </div>
        </div>

        {/* Currency and No of Cards */}
        <div className="w-full flex lg:flex-row sm:flex-col items-center gap-3">
          <div className={`transition-all duration-300 ${selectedValue ? "lg:w-[70%]" : "w-full"} sm:w-full`}>
            <h2 className="capitalize text-secondary-2 font-[16px] lg:text-base sm:text-md">card currency</h2>
            <Select
              data={currency}
              onSelect={handleCurrency}
              placeholder="Search for an asset"
              text="Select currency"
              disabled={!selectedCard}
            />
          </div>
          {selectedValue && (
            <div className="lg:w-[30%] sm:w-full">
              <h2 className="capitalize text-secondary-2 font-[16px] lg:text-base sm:text-md">no of cards</h2>
              <div className="w-full border-2 rounded-lg flex border-primary-1">
                <button
                  type="button"
                  onClick={() => handleAmountChange("decrease")}
                  className="border-r-2 py-[14] w-[30%] border-primary-3 lg:text-base sm:text-md"
                >
                  -
                </button>
                <input
                  type="number"
                  value={unit}
                  className="text-center bg-transparent outline-none py-[14] w-[30%] lg:text-base sm:text-md"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => handleAmountChange("increase")}
                  className="border-l-2 py-[14] w-[30%] border-primary-3 lg:text-base sm:text-md"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Gift Card Value Selection */}
        {selectedCurrency && (
          <div className="w-full mt-3">
            <h2 className="capitalize text-secondary-2 font-[16px] lg:text-base sm:text-md">Gift card value</h2>
            <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-3">
              {giftCardValues.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`lg:p-3 sm:p-2 border-2 rounded-xl text-center ${
                    selectedValue === value ? "bg-primary-2 text-primary-1" : "border-primary-1"
                  }`}
                  onClick={() => handleValueSelect(value)}
                >
                  {value} {selectedCurrency.abs}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Total Payout */}
        {selectedCrypto && selectedCurrency && selectedValue !== null && (
          <div className="lg:p-[15px] mt-3 bg-primary-2 rounded-2xl flex flex-col sm:p-3">
            <div className="flex justify-between">
              <h2 className="font-bold capitalize text-secondary-1 lg:text-base sm:text-md">Rate</h2>
              <h2 className="flex items-center gap-x-2">
                <span className="uppercase text-primary-4 font-bold lg:text-base sm:text-md">1 {selectedCrypto.abs}</span>
                <span>/</span>
                <span className="uppercase text-primary-4 font-bold lg:text-base sm:text-md">{selectedCurrency.title}</span>
              </h2>
            </div>
            <div className="flex justify-between mt-2">
              <h2 className="font-bold capitalize text-secondary-1 lg:text-base sm:text-md">Total Payout</h2>
              <h2 className="uppercase text-primary-4 font-bold lg:text-base sm:text-md">
                {selectedCrypto.abs} {selectedValue * unit}
              </h2>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Buy;
