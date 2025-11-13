import { Link, NavLink } from "react-router";
import { IoLogoModelS } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import {IoPaw, IoLogIn, IoLogOut } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";

import { MdShoppingCart } from "react-icons/md";
import { ImBoxAdd } from "react-icons/im";
import { FaListAlt, FaClipboardList } from "react-icons/fa";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";

const NavBar = () => {
  const {user,signOutUser} = use(AuthContext);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

  useEffect(() => {
    const html = document.querySelector('html')
     html.setAttribute("data-theme", theme)
     localStorage.setItem("theme", theme)
  }, [theme])


  const handleTheme = (checked) => {
    setTheme(checked ? "dark": "light")
  }
  return (
    <div className="navbar py-0 min-h-0 z-1 shadow-sm rounded-full glass-card container m-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
            <NavLink to="/">
              <GoHomeFill /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              <MdShoppingCart /> Pets & Supplies
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink to="/add-listing">
                  <ImBoxAdd /> Add Listing
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-listing">
                  <FaListAlt /> My Listings
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-orders">
                  <FaClipboardList /> My Orders
                </NavLink>
              </li>
            </>
          )}
          </ul>
        </div>
        <Link to={"/"} className="flex items-center gap-1 text-xl font-bold">
         <IoPaw className="text-pink-500 text-3xl" /> PawMart
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex ">
         <ul className="menu menu-horizontal px-1 flex items-center gap-8 text-base font-medium">
          <li>
            <NavLink to="/">
              <GoHomeFill /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              <MdShoppingCart /> Pets & Supplies
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink to="/add-listing">
                  <ImBoxAdd /> Add Listing
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-listing">
                  <FaListAlt /> My Listings
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-orders">
                  <FaClipboardList /> My Orders
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-3">
        <div>
          <input
           onChange={(e)=> handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle"/>
        </div>
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user?.displayName}</li>
                <li className="text-xs">{user?.email}</li>
              </div>
             
              

              

              
              
              
              <li>
                <button
                  onClick={signOutUser}
                  className="btn btn-xs text-left bg-linear-to-r from-pink-500 to-red-500 text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/auth/login"}
            className="btn rounded-full border-gray-300  btn-sm bg-linear-to-r from-pink-500 to-red-500 text-white"
          >
            {" "}
            <IoLogIn /> Login
          </Link>
          
        )}
      </div>
    </div>
  );
};

export default NavBar;