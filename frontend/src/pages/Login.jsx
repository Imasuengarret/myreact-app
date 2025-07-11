import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const handOnChange = (e) =>{
    const {name, value   } = e.target;
    setData ((prev) =>{
        return{
            ...prev,
            [name] : value
        }
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
  }
  console.log('data login', data);
  
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto ">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icon" />
          </div>
          <form className="pt-4 flex-col space-y-3" onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="email">Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                onChange={handOnChange}
                name="email"
                value={data.email}
                  type="email"
                  placeholder="enter email"
                  className="w-full h-full outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                onChange={handOnChange}
                name="password"
                value={data.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  className="w-full h-full outline-none"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link to="/forgot-password" className="block w-fit ml-auto hover:text-red-700 hover:underline">forgot password</Link>
            </div>
            <button className=" bg-red-600 hover:bg-red-800 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4">Login</button>
          </form>
          <p className="my-5">Don't have account ? <Link to="/sign-up" className="hover:text-red-700 hover:underline">Sign up</Link> </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
