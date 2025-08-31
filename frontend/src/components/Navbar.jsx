import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { ACCESS_TOKEN } from "../constants";
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { isAuthorized, setIsAuthorized } = useAuth()
  const [menubar, setMenubar] = React.useState(false);

  function menuFunction() {
    if (menubar) {
      setMenubar(false);
    } else {
      setMenubar(true);
    }
  }
  function logout() {
    localStorage.removeItem(ACCESS_TOKEN)
    setIsAuthorized(false)
    navigate("/login")
  }

  return (
    <>
      <div className="flex flex-row justify-center items-center w-[100%] bg-yellow-100 z-[100] fixed">
        <div className="w-[100%] p-[20px] flex flex-row justify-between items-center z-[60] lg:w-[976px]">
          <Link
            to="/"
            onClick={() => {
              setMenubar(false);
            }}
            className="text-red-500 font-bold text-[24px] font-inter cursor-pointer"
          >
            QuickNotes
          </Link>
          <div className="hidden flex-row justify-center items-center gap-[12px] md:flex">
            <Link
              to="/about"
              onClick={() => {
                setMenubar(false);
              }}
              className="text-red-500 font-bold text-[14px] underline cursor-pointer hover:text-gray-400 transition-all duration-[0.3s]"
            >
              About Project
            </Link>
          {
            isAuthorized ? (
              <div className="flex flex-row justify-center items-center gap-[12px]">
                <p>user</p>
                <button onClick={logout} className="px-[15px] py-[6px] rounded-[8px] bg-gray-700 text-red-500 hover:opacity-[0.8] transition-all duration-[0.3s]">Logout</button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => {
                  setMenubar(false);
                }}
                className="px-[16px] py-[6px] rounded-[8px] text-white bg-gray-700 cursor-pointer hover:opacity-[0.8] transition-all duration-[0.3s]"
              >
                Login
              </Link>
            )
          }
          </div>
          <div
            onClick={menuFunction}
            className={`flex flex-col justify-center items-center gap-[4px] w-[25px] cursor-pointer md:hidden`}
          >
            <div
              className={`w-[100%] h-[3px] bg-black rounded-[24px] transition-all duration-[0.3s] ${
                menubar ? "-rotate-45 translate-y-[5px]" : ""
              }`}
            ></div>
            <div
              className={`w-[100%] h-[3px] bg-black rounded-[24px] transition-all duration-[0.3s] ${
                menubar ? "rotate-45" : ""
              }`}
            ></div>
            <div
              className={`w-[100%] h-[3px] bg-black rounded-[24px] transition-all duration-[0.3s] ${
                menubar ? "-rotate-45 translate-y-[-9px]" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none opacity-[0] fixed z-[50] left-[0] top-[75px] bg-yellow-100 w-[100%] shadow-md border-[1px] border-yellow-400 px-[20px] py-[10px]  transition-all duration-[0.5s] md:hidden ${
          menubar
            ? "pointer-events-auto translate-y-[0px] opacity-[1]"
            : "-translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-row justify-between items-center">
          <Link
            to="/about"
            onClick={() => {
              setMenubar(false);
            }}
            className="text-red-500 font-bold text-[14px] underline cursor-pointer hover:text-gray-400 transition-all duration-[0.3s]"
          >
            About Project
          </Link>
          {
            isAuthorized ? (
              <div className="flex flex-row justify-center items-center gap-[12px]">
                <p>user</p>
                <button onClick={logout} className="px-[15px] py-[6px] rounded-[8px] bg-gray-700 text-red-500 hover:opacity-[0.8] transition-all duration-[0.3s]">Logout</button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => {
                  setMenubar(false);
                }}
                className="px-[16px] py-[6px] rounded-[8px] text-white bg-gray-700 cursor-pointer hover:opacity-[0.8] transition-all duration-[0.3s]"
              >
                Login
              </Link>
            )
          }
        </div>
      </div>
    </>
  );
};
export default Navbar;