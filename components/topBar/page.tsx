"use client"; // Ensures it runs on the client side

import { useState, useEffect } from "react";
import { nav } from "@/data/dummy";
import Link from "next/link";
import { IoMenuOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const TopBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="w-full hidden lg:flex">
        <div
          className={`w-full fixed top-0 z-40 inset-x-0 transition-all duration-300 ${
            isScrolled ? "bg-white shadow-md" : "bg-transparent"
          }`}
        >
          <div className="w-full flex flex-row items-center justify-between lg:px-[32px] lg:py-[20px]">
            {/* Logo and Navigation */}
            <div className="flex items-center">
              <img
                src="https://apexnetwork.co/_nuxt/logo.cb989d2d.svg"
                alt="Logo"
                width={80}
                height={43.45}
                className="lg:mr-[40px]"
              />
              <div className="flex items-center lg:space-x-[40px]">
                {nav.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    className="text-secondary-2 text-[16px] capitalize hover:text-primary-1 hover:-mt-2 hover:duration-300 active:text-primary-1"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Login and Button */}
            <div className="flex lg:space-x-[40px] items-center">
              <h2 className="capitalize font-bold text-[16px]">login</h2>
              <button className="bg-primary-1 rounded-lg text-white lg:px-[24px] lg:py-[17px] text-[16px] cursor-pointer">
                Open an Account
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full flex lg:hidden">
        <div className={`w-full flex items-center justify-between p-3 fixed top-0 left-0 z-40 inset-x-0 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}>
          <img
            src="https://apexnetwork.co/_nuxt/logo.cb989d2d.svg"
            alt="Logo"
            width={60}
            height={43.45}
            className="lg:mr-[40px]"
          />
          <div onClick={handleOpenMenu}>
            <IoMenuOutline size={40} className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Animated Side Menu */}
      <div
        className={`fixed top-0 left-0 right-0 h-full w-full bg-primary-7 z-50 transition-transform duration-500 ease-in-out transform ${
          openMenu ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="w-full p-3 flex items-center justify-between">
          <img
            src="https://apexnetwork.co/_nuxt/logo.cb989d2d.svg"
            alt="Logo"
            width={60}
            height={43.45}
            className="lg:mr-[40px]"
          />
          <div onClick={handleOpenMenu}>
            <IoMdClose size={40} className="cursor-pointer"/>
          </div>
        </div>
        <div className="flex flex-col p-3">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="text-secondary-2 text-[16px] capitalize py-3 active:text-primary-1"
            >
              {item.title}
            </Link>
          ))}
          <h3 className="text-secondary-2 text-lg font-bold capitalize py-3 active:text-primary-1">
            login
          </h3>
        </div>
        <div className="flex flex-col px-3">
          <h3 className="first-letter:capitalize mb-2 font-bold">
            download the app now
          </h3>
          <div className="flex gap-5">
            <img
              src="/svg/apple.svg"
              alt="Apple Store"
              width={150}
              height={43.45}
              className="border-2 border-primary-4 rounded-lg"
            />
            <div className="p-2 bg-white items-center justify-center border-2 border-primary-4 rounded-lg">
              <img
                src="https://apexnetwork.co/_nuxt/play.3e59dc48.png"
                alt="Google Play"
                width={140}
                height={43.45}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
