"use client";

import { titleFont } from "@/config/fonts";
import { useUiStore } from "@/store";
import Link from "next/link";
import { IoCartOutline, IoMenuOutline, IoSearchOutline } from "react-icons/io5";

//* Navigation bar
export const TopMenu = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const openSideMenu = useUiStore((state) => state.openSideMenu);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Flower</span>
          <span className={`${titleFont.className} antialiased font-bold`}> | Clothes</span>
        </Link>
      </div>

      {/* Categories - center menu*/}
      <div className="hidden sm:block">
        <Link href="/category/men" className="m-2 p-2 rounded-sm transition-all hover:bg-slate-100">
          <span>Hombres</span>
        </Link>
        <Link href="/category/women" className="m-2 p-2 rounded-sm transition-all hover:bg-slate-100">
          <span>Mujeres</span>
        </Link>
        <Link href="/category/kids" className="m-2 p-2 rounded-sm transition-all hover:bg-slate-100">
          <span>Niños</span>
        </Link>
      </div>

      {/* Search - Cart - Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        {/* Cart */}
        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute -top-2 -right-2 px-1 text-xs font-bold text-white bg-blue-500 rounded-full">
              n
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        {/* Menu */}
        <button className="m-2 p-2 rounded-md transition-all hover:bg-slate-100" onClick={() => openSideMenu()}>
          <IoMenuOutline className="w-5 h-5 sm:hidden" />
          <span className="hidden sm:block">Menú</span>
        </button>
      </div>
    </nav>
  );
};
