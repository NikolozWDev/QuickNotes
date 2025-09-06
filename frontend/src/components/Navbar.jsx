import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Navbar = ({loading, setLoading}) => {
  const { isAuthorized, setIsAuthorized } = useAuth();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userMenu, setUserMenu] = React.useState(false);
  const [menubar, setMenubar] = React.useState(false);

  React.useEffect(() => {
    getUser();
    setLoading(false)
  }, []);

  async function getUser() {
    setLoading(true)
    const res = await api.get("/api/user/me/");
    setUsername(res.data.username);
    setEmail(res.data.email);
    setLoading(false)
  }

  function menuFunction() {
    if (menubar) {
      setMenubar(false);
    } else {
      setMenubar(true);
    }
  }
  function logout() {
    setLoading(true)
    localStorage.removeItem(ACCESS_TOKEN);
    setIsAuthorized(false);
    setLoading(false)
    navigate("/login");
  }

  // delete account
  async function deleteAccount() {
    setLoading(true)
    if (window.confirm("Are you sure you want to delete you'r account?")) {
      await api.delete("/api/user/delete/");
      setLoading(false)
      alert("Your account has been deleted");
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      window.location.href = "/";
    }
  }

  return (
    <>
      <div className="flex flex-row justify-center items-center w-[100%] bg-yellow-100 z-[100] fixed animate-navbar">
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
            {loading ? (
              <div className="w-[100%] flex flex-row justify-center items-center">
                <Loading />
              </div>
            ) : null}
            <Link
              to="/about"
              onClick={() => {
                setMenubar(false);
              }}
              className="text-red-500 font-bold text-[14px] underline cursor-pointer hover:text-gray-400 transition-all duration-[0.3s]"
            >
              About Project
            </Link>
            {isAuthorized ? (
              <div className="flex flex-row justify-center items-center gap-[12px] cursor-pointer group">
                <div className="relative flex flex-row justify-center items-center gap-[4px] shadow-md border-[1px] border-gray-300 bg-yellow-200 py-[2px] px-[6px] rounded-[12px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                  <p className="text-[18px]">{username}</p>
                  <div className="absolute cursor-default pointer-events-none opacity-[0] translate-y-[-30px] group-hover:pointer-events-auto group-hover:opacity-[1] group-hover:translate-y-[0px] transition-all duration-[0.6s] flex flex-col justify-start items-center z-30 top-[25px] mt-2 w-[180px] bg-white shadow-lg rounded-[12px] p-3">
                    <p className="break-words w-[100px]">
                      name: <span className="font-bold">{username}</span>
                    </p>
                    <p className="break-words w-[100px]">
                      email: <small className="font-bold">{email}</small>
                    </p>
                    <hr className="w-full my-[4px] border-gray-300" />
                    <div className="flex flex-col justify-center items-center gap-[4px] mt-[5px]">
                      <button
                        onClick={logout}
                        className="px-[15px] py-[6px] rounded-[8px] bg-gray-700 text-red-500 hover:opacity-[0.8] transition-all duration-[0.3s]"
                      >
                        Logout
                      </button>
                      <button
                        onClick={deleteAccount}
                        className="px-[15px] py-[6px] rounded-[8px] bg-gray-700 text-red-500 hover:opacity-[0.8] transition-all duration-[0.3s]"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
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
            )}
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
          {isAuthorized ? (
            <div className="flex flex-row justify-center items-center gap-[12px] cursor-pointer group">
              <div className="relative flex flex-row justify-center items-center gap-[4px] shadow-md border-[1px] border-gray-300 bg-yellow-200 py-[2px] px-[6px] rounded-[12px]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <p className="text-[18px]">{username}</p>
                <div className="absolute pointer-events-none opacity-[0] translate-y-[-30px] group-hover:pointer-events-auto group-hover:opacity-[1] group-hover:translate-y-[0px] transition-all duration-[0.6s] flex flex-col justify-start items-center z-30 top-[25px] mt-2 w-[180px] bg-white shadow-lg rounded-[12px] p-3">
                  <p className="break-words w-[100px]">
                    name: <span className="font-bold">{username}</span>
                  </p>
                  <p className="break-words w-[100px]">
                    email:{" "}
                    <small className="font-bold">
                      gasdawdsawdsawd@gmail.com
                    </small>
                  </p>
                  <hr className="w-full my-[4px] border-gray-300" />
                  <div className="flex flex-col justify-center items-center gap-[4px] mt-[5px]">
                    <button
                      onClick={logout}
                      className="px-[15px] py-[6px] rounded-[8px] bg-gray-700 text-red-500 hover:opacity-[0.8] transition-all duration-[0.3s]"
                    >
                      Logout
                    </button>
                    <button
                      onClick={deleteAccount}
                      className="px-[15px] py-[6px] rounded-[8px] bg-gray-700 text-red-500 hover:opacity-[0.8] transition-all duration-[0.3s]"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
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
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;
