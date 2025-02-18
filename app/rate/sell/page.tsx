'use client'

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
}

interface SelectItem {
  icon?: string;
  title: string;
  abs?: string;
}


const Sell = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardAsset | null>(null);
  const [selectedType, setSelectedType] = useState<CardTypeAsset | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyAsset | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [unit, setUnit] = useState<number>(1);
  const [priceRange, setPriceRange] = useState<number[]>([]);

  const handleSelect = (item: CryptoAsset) => {
    setSelectedCrypto(item);
    setSelectedCard(null); // Reset dependent fields
    setSelectedCurrency(null);
    setSelectedType(null);
    setAmount(null);
    setPriceRange([]);
  };

  const handleCard = (item: CardAsset) => {
    setSelectedCard(item);
    setSelectedCurrency(null);
    setSelectedType(null);
    setAmount(null);
    setPriceRange([]);
  };

  const handleCurrency = (item: SelectItem) => {
    if (item.icon) {
      setSelectedCurrency(item as CurrencyAsset);  // Cast when needed
    }
  };
  
  

  const handleType = (item: CardTypeAsset) => {
    setSelectedType(item);
    const range = item.title === "Physical" ? [100, 500] : [10, 50];
    setPriceRange(range);
    setAmount(range[0]);
  };

  const handleAmountChange = (operation: "increase" | "decrease") => {
    setUnit((prev) => {
      const newUnit = operation === "increase" ? prev + 1 : Math.max(1, prev - 1);
      setAmount(priceRange[0] * newUnit);
      return newUnit;
    });
  };

  return (
    <div className="w-full">
      <form className="w-full">
        <div className="w-full flex lg:flex-row sm:flex-col items-center gap-3">
          <div className="flex-1 lg:py-3 sm:py-1 w-full">
            <h2 className="capitalize text-secondary-2 font-[16px] ">Receive payment in</h2>
            <Dropdown 
              data={crypto} 
              onSelect={handleSelect} 
              placeholder="Search for an asset" 
              text="Select an asset" 
            />
          </div>
          <div className="flex-1 lg:py-3 sm:py-1 flex-grow w-full">
            <h2 className="capitalize text-secondary-2 font-[16px] ">Gift card</h2>
            <Dropdown 
              data={card} 
              onSelect={handleCard} 
              placeholder="Search for gift" 
              text="Select a gift card" 
              disableInput={!selectedCrypto} // Disabled until a crypto asset is selected
            />
          </div>
        </div>
        <div className="w-full flex lg:flex-row sm:flex-col items-center gap-3">
          <div className="flex-1 lg:py-3 sm:py-1 w-full">
            <h2 className="capitalize text-secondary-2 font-[16px] ">Currency</h2>
            <Select 
              data={currency} 
              onSelect={handleCurrency} 
              placeholder="Search for an asset" 
              text="Select currency" 
              disabled={!selectedCard} // Disabled until a gift card is selected
            />
          </div>
          <div className="flex-1 lg:py-3 sm:py-1 flex-grow w-full">
            <h2 className="capitalize text-secondary-2 font-[16px] lg:text-base sm:text-md">Card type</h2>
            <Select 
              data={cardType} 
              onSelect={handleType} 
              placeholder="Search for gift" 
              text="Select card type" 
              disabled={!selectedCurrency} // Disabled until a currency is selected
            />
          </div>
        </div>
        {priceRange.length > 0 && (
          <div className="w-full">
            <h2 className="capitalize text-secondary-2 font-[16px] lg:text-base sm:text-md">Gift card value</h2>
            <div className="w-full flex lg:flex-row sm:flex-col items-center gap-3">
              <div className="lg:w-[70%] sm:w-full lg:px-2 sm:px-1 border-2 rounded-lg flex flex-col border-primary-1">
                <p className="capitalize text-secondary-2 font-[12px] lg:text-base sm:text-md">Enter amount:</p>
                <div className="flex items-center w-full lg:py-2 sm:py-1 text-lg">
                  <input
                    type="number"
                    value={amount || ""}
                    className="w-full bg-transparent outline-none"
                    readOnly
                  />
                  <div className="bg-primary-2 rounded-lg flex items-center gap-x-2 p-2 justify-center">
                    {selectedCurrency && (
                      <>
                        <img src={selectedCurrency.icon} alt="currency icon" className="w-6 h-6 rounded-full" />
                        <span className="text-sm font-medium uppercase">{selectedCurrency.title}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:w-[30%] sm:w-full border-2 rounded-lg flex border-primary-1">
                <button type="button" onClick={() => handleAmountChange("decrease")} className="border-r-2 sm:py-5 lg:py-[21.5%] w-[30%] border-primary-3">-</button>
                <input
                  type="number"
                  value={unit}
                  className="text-center bg-transparent outline-none sm:py-5 lg:py-[21.5%] w-[30%]"
                  readOnly
                />
                <button type="button" onClick={() => handleAmountChange("increase")} className="border-l-2 sm:py-5 lg:py-[21.5%] w-[30%] border-primary-3">+</button>
              </div>
            </div>
          </div>
        )}
        {selectedCrypto && selectedCurrency && amount !== null && (
          <div className="lg:p-[15px] mt-3 bg-primary-2 rounded-2xl flex flex-col sm:p-3">
            <div className="flex justify-between">
              <h2 className="font-bold capitalize text-secondary-1 lg:text-base sm:text-md">Rate</h2>
              <h2 className="flex items-center gap-x-2">
                <span className="uppercase text-primary-4 font-bold lg:text-base sm:text-md">1 {selectedCrypto.abs}</span>
                <span>/</span>
                <span className="uppercase text-primary-4 font-bold">{selectedCurrency.title}</span>
              </h2>
            </div>
            <div className="flex justify-between mt-2">
              <h2 className="font-bold capitalize text-secondary-1 lg:text-base sm:text-md">Total Payout</h2>
              <h2 className="uppercase text-primary-4 font-bold">{selectedCrypto.abs} {amount}</h2>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Sell;
