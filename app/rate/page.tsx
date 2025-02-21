'use client';
import Tab from '@/components/tab/page';
import Buy from './buy/page';
import Sell from './sell/page';
import Crypto from './cryto/page';

const RateCalculator = () => {
  return (
    <section className="w-full h-screen flex">
      {/* Static 40% width section */}
      <div className="lg:w-[40%] sm:hidden lg:flex bg-primary-1 h-full flex-shrink-0 bg-[url(https://apexnetwork.co/_nuxt/backgroundpattern.015223cf.svg)]">
        <div className='fixed bottom-[10%] lg:ml-[8%]'>
          <h2 className='capitalize font-bold tracking-wider leading-relaxed text-white text-[20px]'>trade your giftcards & crypto</h2>
          <h1 className='py-3 font-bold capitalize text-gray-300 text-[36px]'>easy with speed</h1>
          <p className="text-[#ffffff] text-base font-aeonikregular text-start mt-4 tracking-wide w-[38%]">
            Start trading now to enjoy the best rates. We provide the best and fastest service across the world in swapping e-currencies.
          </p>
        </div>
      </div>


      {/* Scrollable 60% width section */}
      <div className="lg:w-[60%] sm:w-full bg-white lg:px-20 sm:px-3 sm:py-0 lg:py-10 overflow-y-auto custom-scrollbar-container h-full">
        <div className="w-full">
          <a href="https://twjhub.com/" target="_blank" rel="noopener noreferrer" className='mb-10 text-secondary-1 font-medium'>
            Go back to website
          </a>
          <div className="w-full py-10">
            <h2 className="font-bold lg:text-[30px] sm:text-xl capitalize text-secondary-1">Guided Checkout</h2>
            <p className='text-lg font-medium tracking-wider leading-relaxed text-secondary-1'>
              Quickly start trading, through the guided checkout. Scared of how trading online feels so insecure? Well, we set a guided checkout that leads you straight to us.
            </p>
          </div>
        </div>

        <div className="w-full py-10">
          <Tab
            title1="Crypto Exchange"
            title2="Gift Card Sell"
            title3="Gift Card Buy"
            content1={<Crypto />}
            content2={<Sell />}
            content3={<Buy />}
          />
        </div>

        <div className="w-full lg:py-10 sm:py-5">
          <button className="w-full cursor-pointer bg-primary-1 text-white font-bold capitalize py-5">
            Continue on WhatsApp
          </button>
        </div>

        <h1 className=" font-aeonikregular text-lg font-medium tracking-wider leading-relaxed text-secondary-1">
          Trading on the website directs you to our official WhatsApp contact at
          <span className="text-black font-aeonikbold"> +2349071504491 </span>. Please be aware of scammers, and kindly confirm the phone number is the same on our contact page. The website you are currently on should be{' '}
          <span className="font-aeonikbold">www.majorlink.co/checkout</span>.
        </h1>
      </div>
    </section>
  );
};

export default RateCalculator;
