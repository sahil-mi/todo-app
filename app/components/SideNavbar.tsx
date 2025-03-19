"use client";
import React, { useState } from "react";
import Image from "next/image";
import add_icon from "../../public/add-icon.png";
import img from "../../public/menu-icon.png";

const SideNavbar: React.FC = () => {
  const [navOpen, setNavOpen] = useState(true);
  const onMenuIconClick = () => {
    //pass
  };
  return (
    <>
      <div
        className={navOpen ? "bg-[#211d1e] sm:w-1/4 h-screen p-4 " : "hidden"}
      >
        <nav>
          {/* Menu icon and name */}
          <div className="flex justify-between content-center">
            <div className="cursor-pointer" onClick={onMenuIconClick}>
              <Image
                onClick={() => setNavOpen(!navOpen)}
                width="50"
                height="50"
                src={img}
                alt="menu-icon"
              />
            </div>
            <div>
              <p>Your-TODO-APP </p>
            </div>
          </div>
          {/* ----------------------------- */}

          <div>
            {/* Add new task button */}
            <div className="h-[40px] bg-[#3d3839] hover:border-2 border-sky-700 border-solid flex justify-center items-center rounded-sm mt-10 cursor-pointer">
              <span className="p-5">New Task </span>
              <Image
                width="30"
                height="30"
                src={add_icon}
                alt="add-icon"
              />{" "}
            </div>

            {/* all tasks and starred tasks */}
            <ul className="mt-10">
              <li>
                <div className="h-[40px] hover:bg-sky-700 flex items-center rounded-sm cursor-pointer">
                  <span className="p-5">All Tasks</span>
                </div>
              </li>
              <div className="h-[40px] hover:bg-sky-700  flex items-center rounded-sm cursor-pointer">
                <span className="p-5">Starred Tasks</span>
              </div>
            </ul>
          </div>
        </nav>
      </div>

      {!navOpen ? (
        <div className="flex justify-between content-center p-4 ">
          <div className="cursor-pointer" onClick={onMenuIconClick}>
            <Image
              onClick={() => setNavOpen(!navOpen)}
              width="50"
              height="50"
              src={img}
              alt="menu-icon"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SideNavbar;
