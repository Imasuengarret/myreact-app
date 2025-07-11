import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { imageToBase } from "../helpers/imageToBase";
import summaryApi from "../command";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    cpassword: "",
    name: "",
    profilePic: "",
  });

  const navigate = useNavigate()
  const handOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(data.password === data.cpassword){
      const dataResponse = await fetch(summaryApi.signUp.url, {
      method: summaryApi.signUp.method,
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/login')
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
    } else {
      toast('please check password and confirmPassword');
      
    }
    
    
  };
  const handleUploadPic =async (e) =>{
    const file = e.target.files[0]
    const imgPic = await imageToBase(file)
    setData((prev) =>{
      return{
        ...prev,
        profilePic : imgPic
      }
    })
    
  }
  console.log("data login", data);

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto ">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="login icon" />
            </div>
            <form>
              <label>
                <div className="text-xs opacity-50 bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full cursor-pointer">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic}/>
              </label>
            </form>
          </div>
          <form className="pt-4 flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="name">Name : </label>
              <div className="bg-slate-100 p-2">
                <input
                  onChange={handOnChange}
                  name="name"
                  value={data.name}
                  required
                  type="text"
                  placeholder="enter full name"
                  className="w-full h-full outline-none"
                />
              </div>
            </div>
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
                  required
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
            </div>
            <div className="">
              <label htmlFor="cpassword">Confirm Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  onChange={handOnChange}
                  name="cpassword"
                  required
                  value={data.cpassword}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  className="w-full h-full outline-none"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className=" bg-red-600 hover:bg-red-800 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4">
              Signup
            </button>
          </form>
          <p className="my-5">
            already have account ?{" "}
            <Link to="/login" className="hover:text-red-700 hover:underline">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
