import React from "react";
import { TbBrandTelegram } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "../Images/logo.jpg"
import Privacypolicy from "./PrivacyPolicy";

const PreSaleFooter = () => {
  return (
    <div className="hidden sm:block bg-gradient-to-b from-[#000120] to-[#220056] mt-5  lg:px-28 pt-14 px-10 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
        <div>
          <h1 className="text-[#4CC9F0] font-semibold lg:text-2xl">The Instu Talent Hub</h1>
          <p className="text-white xl:w-[559px] pt-4">
            The instu talent hub is a education company that provides reward for any exams all over India.These exams conduct by government board as like school, college, competative exams.
          </p>
        </div>

        <div>


          <div className="grid-none lg:grid-cols-1 xl:grid-cols-2 grid-cols-1 md:grid-cols-1">
            <div className="flex gap-2 lg:justify-end text-white md:pt-4 pt-4 xl:pt-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white bg-[#3A0CA3] rounded-full leading-4 p-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <div>
                <p className="text-[#4CC9F0] fs-5 mb-1">Contact us at</p>
                <h3 className="fs-6">instutalenthub@gmail.com</h3>
              </div>
            </div>
          </div>

          <div className="flex lg:justify-end pt-2 gap-4 socials">

            <div className="relative overflow-hidden block footer-div cursor-pointer">
              <span className="block"><a target="_blank" href="mailto:contact@instutalenthub@gmail.com">
                <i className="social-links fa-solid fa-envelope text-white bg-[#7A7893] rounded-full leading-4 p-2 h-8 w-8"></i>
              </a></span>
            </div>
            <div className="relative overflow-hidden block footer-div cursor-pointer">
              <span className="block"><a target="_blank" href="https://www.youtube.com/@INSTUTALENTHUB">
                <i className="social-links fa-brands fa-youtube text-white bg-[#7A7893] rounded-full leading-4 p-2 h-8 w-8"></i>
              </a></span>
            </div>
            <div className="relative overflow-hidden block footer-div cursor-pointer">
              <span className="block">
                <a target="_blank" href="https://t.me/instutalenthub">
                  <TbBrandTelegram className="social-links text-white bg-[#7A7893] rounded-full leading-4 p-2 h-8 w-8" />
                </a>
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Lower footer */}
      <div className="grid lg:grid-cols-2 grid-cols-1 pt-16 md:grid-cols-1">
        <div className="md:flex justify-between text-white text-xs md:text-base flex-col lg:flex-row">
          <p>
            <Link className="footer-links text-decoration-none " to="about">About Us</Link>
          </p>
          <p>
            <Link className="footer-links text-decoration-none " to="contact">Contact</Link>
          </p>
          <p>
            <Link className="footer-links text-decoration-none " to="course">Courses</Link>
          </p>
         
          <Privacypolicy />
        </div>
        <div className="text-white lg:justify-end justify-start flex md:justify-start md:pt-4 text-xs md:text-base lg:pt-0">
          © 2022-2024, All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default PreSaleFooter;
