import Tab from "@/components/tab/page";
import Crypto from "./cryto/page";
import Buy from "./buy/page";
import Sell from "./sell/page";
import Table from "@/components/table/page";
import { table } from "@/data/dummy";

interface Column {
  key: string;
  label: string;
}


const RateCalculator = () => {
  const columns: Column[] = [
    { key: "check", label: "Crypto Assets" },
    { key: "price", label: "price" },
    { key: "chg", label: "24H Change" }
  ];
  
  
  return (
    <div className='w-full lg:pt-[80px] lg:pb-[40px] lg:px-[128px]'>
        <div className='flex items-center gap-y-[1.938rem] lg:gap-y-0 flex-col lg:min-h-screen lg:flex-row gap-x-8 container pt-[5.875rem] pb-10 xl:py-[12.875rem] 2xl:min-h-[900px]lg:px-0 sm:px-3'>
            <div className='flex-1'>
                <h2 className='capitalize lg:text-[56px] sm:text-4xl lg:text-left text-center heading-text font-heading font-bold leading-[2.3rem] md:leading-[4.025rem] mb-3 lg:mb-[1.5rem] text-header'>rate calculator</h2>
                <p className='text-center lg:text-left lg:text-content-5 leading-[1.313rem] lg:leading-[1.875rem]  lg:text-xl font-light text-secondary-1'>
                    Use our cryptocurrency rate calculator to
                    <br className='hidden lg:block'/>
                    check the exchange rates when you trade between
                    <br className='hidden lg:block'/>
                    assets
                </p>
            </div>
            <div className="lg:w-[80%] sm:w-full bg-white shadow-lg flex-grow flex-1 w-full rounded-4xl h-full">
              <Tab
              title1="crypto exchange"
              title2="gift card sell"
              title3="gift card buy"
              content1={<Crypto/>}
              content2={<Sell/>}
              content3={<Buy/>}
              />
            </div>
        </div>
        <div className="w-full lg:px-[120px] sm:px-3 rounded-2xl">
          <Table
            data={table}
            columns={columns}
            text1="market"
          />
        </div>
        <div className="hidden sm:flex">
          <div className="z-50 fixed bottom-0 bg-primary-1 w-full text-white text-center py-8 first-letter:capitalize font-bold text-md">
              open an account
          </div>
        </div>
    </div>
  )
}

export default RateCalculator