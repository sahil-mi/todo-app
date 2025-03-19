"use client";
import React from "react";
import Image from "next/image";
import { MenuIconType } from "./interfaces/NavBarInterfaces";
import img from "../../public/menu-icon.png";

const MenuIcon: React.FC<MenuIconType> = ({ handleClick }) => {
  const prop = handleClick();
  console.log(prop);

  return (
    <div className="cursor-pointer">
      <Image width="50" height="50" src={img} alt="menu-icon" />
    </div>
  );
};

export default MenuIcon;
