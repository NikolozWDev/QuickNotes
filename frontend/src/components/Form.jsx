import React from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Loading from "./Loading";

const Form = ({ route, method }) => {
  const { setIsAuthorized } = useAuth();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  // register/login validations
  const [validatedUsername, setValidatedUsername] = React.useState(false);
  const [validatedEmail, setValidatedEmail] = React.useState(false);
  const [validatedPassword, setValidatedPassword] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [ValidatedLogin, setValidatedLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function handleSubmit1(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(route, { email, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setIsAuthorized(true);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setValidatedLogin(true);
    } finally {
      setLoading(false);
    }
  }
  async function handleSubmit2(e) {
    e.preventDefault();
    setLoading(true);
    if (
      password !== confirmPassword ||
      validatedUsername ||
      validatedEmail ||
      validatedPassword
    ) {
      alert("Please, submit the correct information");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(route, {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setIsAuthorized(true);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-start gap-[30px] w-[100%] shadow-md bg-gray-100 px-[20px] py-[40px] rounded-[24px] border-[1px] border-gray-300 md:w-[600px]">
      <p className="text-black font-bold text-[20px]">
        {method === "login" ? "Login" : "Register"} Notes
      </p>
      {method === "login" ? (
        <form
          onSubmit={handleSubmit1}
          className="flex flex-col justify-center items-start gap-[16px] w-[100%]"
        >
          <input
            className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex flex-col justify-start items-start gap-[4px]">
            <p className="text-[16px] text-red-500">
              {ValidatedLogin ? "Email or Password is incorrect" : ""}
            </p>
            {loading ? (
              <div className="w-[100%] flex flex-row justify-center items-center">
                <Loading />
              </div>
            ) : null}
            <button
              className="w-[100%] rounded-[8px] py-[6px] text-white text-[16px] bg-red-500 md:w-[150px]"
              type="submit"
            >
              {method === "login" ? "Login" : "Register"}
            </button>
          </div>
          <p>
            {method === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link
              to={`${method === "login" ? "/register" : "/login"}`}
              className="text-blue-600 cursor-pointer hover:text-gray-500 transition-all duration-[0.3s]"
            >
              {method === "login" ? "Register" : "Login"}
            </Link>
          </p>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit2}
          className="flex flex-col justify-center items-start gap-[10px] w-[100%]"
        >
          <div className="flex flex-col justify-start items-start w-[100%] gap-[4px]">
            <input
              className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setValidatedUsername(e.target.value.length >= 20);
              }}
            />
            <p className="text-[16px] text-red-500">
              {validatedUsername ? "Username must be less then 20 words" : ""}
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-[100%] gap-[4px]">
            <input
              className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidatedEmail(e.target.value.length >= 40);
              }}
            />
            <p className="text-[16px] text-red-500">
              {validatedEmail ? "Email must be less then 40 words" : ""}
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-[100%] gap-[4px]">
            <input
              className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidatedPassword(e.target.value.length >= 20);
              }}
            />
            <p className="text-[16px] text-red-500">
              {validatedPassword ? "Password must be less then 20 words" : ""}
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-[100%] gap-[4px]">
            <input
              className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black"
              type="password"
              placeholder="Confrim Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setIsPassword(e.target.value !== password);
              }}
            />
            <p className="text-[16px] text-red-500">
              {isPassword ? "this password is not identical then first" : ""}
            </p>
          </div>
          {loading ? (
            <div className="w-[100%] flex flex-row justify-center items-center">
              <Loading />
            </div>
          ) : null}
          <button
            className="w-[100%] rounded-[8px] py-[6px] text-white text-[16px] bg-red-500 md:w-[150px]"
            type="submit"
          >
            {method === "login" ? "Login" : "Register"}
          </button>
          <p>
            {method === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link
              to={`${method === "login" ? "/register" : "/login"}`}
              className="text-blue-600 cursor-pointer hover:text-gray-500 transition-all duration-[0.3s]"
            >
              {method === "login" ? "Register" : "Login"}
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};
export default Form;