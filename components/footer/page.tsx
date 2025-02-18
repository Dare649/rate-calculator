

'use client'
import React from 'react'
import { footer } from '@/data/dummy'

const Footer = () => {
    const getCopyrightYear = (startYear?: number): string => {
        const currentYear = new Date().getFullYear();
        return `© ${currentYear}`;
    };
    
    // Example usage:
    console.log(getCopyrightYear(2020)); // "© 2020 - 2024"
    console.log(getCopyrightYear()); // "© 2024"
    
  return (
    <div className='w-full bg-secondary-2 lg:pt-[70px] lg:px-[120px] lg:pb-[48px] sm:p-3'>
        <div className='w-full flex item-center gap-10 lg:flex-row sm:flex-col'>
            <div className='flex-1 flex-col'>
                <img
                    src="https://apexnetwork.co/_nuxt/logo.cb989d2d.svg"
                    alt="Logo"
                    width={80}
                    height={43.45}
                />
                <p className='font-body text-[#A0A0A2] leading-[1.5rem] md:leading-[1.3125rem] text-[0.9375rem] md:text-[0.875rem] font-normal py-3'>
                    The most trustworthy cryptocurrency exchange platform 
                    <br className='hidden md:block'/>
                    available. Where you can have quick access to your 
                    <br className='hidden md:block'/>
                    money whenever you desire. 
                </p>
                <img
                    src="https://apexnetwork.co/_nuxt/NDPR.c9a83fb9.webp"
                    alt="Logo"
                    width={80}
                    height={43.45}
                />
            </div>
            <div className='flex-1 flex-grow flex-col'>
                <div className='grid lg:grid-cols-4 sm:grid-cols-1 gap-x-10 gap-y-5'>
                    {
                        footer.map((item, id) => (
                            <div key={id} className='text-white'>
                                <h2 className='capitalize font-bold'>{item.heads}</h2>
                                <div className='mt-3'>
                                    {item.sub.map((subItem, index) => (
                                        <h6 key={index} className='capitalize'>{subItem}</h6>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-col lg:float-end mt-14'>
                    <h3 className='first-letter:capitalize text-white mb-2'>download the app now</h3>
                    <div className='flex gap-5 '>
                        <img
                            src="/svg/apple.svg"
                            alt="Logo"
                            width={110}
                            height={43.45}
                        /> 
                        <div className='p-2 rounded-lg bg-white items-center justify-center'>
                            <img
                                src="https://apexnetwork.co/_nuxt/play.3e59dc48.png"
                                alt="Logo"
                                width={100}
                                height={43.45}
                            /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='py-5'>
            <hr className='w-full bg-primary-6 h-0.5'/>
        </div>
        <div className='w-full lg:px-3 flex lg:flex-row items-center justify-between sm:flex-col-reverse sm:justify-center text-white lg:pt-3 lg:pb-3 sm:pt-3 sm:pb-[40%] gap-y-5'>
            <div className='flex-1'>
                <p className='capitalize'>copyright {getCopyrightYear()} apex. all right reserved.</p>
            </div>
            <div className='flex items-center gap-5 lg:flex-row'>
                <img
                    src="/svg/x.svg"
                    alt="Logo"
                    width={20}
                    height={10}
                    className='invert'
                /> 
                <img
                    src="/svg/linkedin.svg"
                    alt="Logo"
                    width={20}
                    height={10}
                    className='invert'
                /> 
                <img
                    src="/svg/facebook.svg"
                    alt="Logo"
                    width={20}
                    height={10}
                    className='invert'
                /> 
                <img
                    src="/svg/insta.svg"
                    alt="Logo"
                    width={20}
                    height={10}
                    className='invert'
                /> 
            </div>
        </div>
    </div>
  )
}

export default Footer