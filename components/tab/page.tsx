'use client'

import { useState } from "react";

interface TabProps {
  content1: React.ReactNode;
  content2: React.ReactNode;
  content3: React.ReactNode;

  title1: string;
  title2: string;
  title3: string;
}

const Tab: React.FC<TabProps> = ({ content1, content2, content3, title1, title2, title3 }) => {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");

  return (
    <div className="w-full">
      {/* Tab Header */}
      <div className="w-full flex bg-primary-2 rounded-tr-4xl rounded-tl-4xl overflow-hidden">
        {[{ id: "tab1", title: title1 }, { id: "tab2", title: title2 }, { id: "tab3", title: title3 }].map((tab, index, arr) => (
          <h1
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "tab1" | "tab2" | "tab3")}
            className={`flex-1 text-center lg:p-4 border-r-2 border-white cursor-pointer capitalize font-bold lg:text-[16px] transition-all 
              ${activeTab === tab.id ? "text-white bg-primary-1" : "text-secondary-1 hover:text-white"}
              ${index === 0 ? "rounded-tl-4xl" : ""} 
              ${index === arr.length - 1 ? "rounded-tr-4xl" : ""}
            `}
          >
            {tab.title}
          </h1>
        ))}
      </div>

      {/* Tab Content */}
      <div className="outlet w-full bg-white lg:p-[16px] sm:p-[8px] rounded-b-4xl">
        {activeTab === "tab1" && <div className="duration-500">{content1}</div>}
        {activeTab === "tab2" && <div>{content2}</div>}
        {activeTab === "tab3" && <div>{content3}</div>}
      </div>
    </div>
  );
};

export default Tab;
