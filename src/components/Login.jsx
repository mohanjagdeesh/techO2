import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Logo from "../assets/logo.jpeg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    passwordVisibility: false,
  });
  const { register, reset, handleSubmit } = useForm();

  const navigate = useNavigate();

  const existedUser = localStorage.getItem("userDetails");

  const captureUserDetails = (data) => {
    const { email, password: checkingPassword } = data;
    const usersList = localStorage.getItem("registeredUsers");
    if (usersList) {
      let totalUsers = JSON.parse(usersList);
      const loggedInUser = totalUsers.filter((each) => email === each.email);
      if (loggedInUser.length === 1) {
        const { password } = loggedInUser[0];
        if (password === checkingPassword) {
          localStorage.setItem("userDetails", JSON.stringify(loggedInUser[0]));
          reset();
          navigate("/");
        } else {
          alert("Password Mismatched Enter Correctly");
        }
      } else {
        alert(
          "You Dont have an account register first or Enter correct Email Id"
        );
      }
    } else {
      alert("No Users Here Register Your Identity First");
      reset();
      navigate("/register");
    }
  };

  useEffect(() => {
    if (existedUser) {
      navigate("/");
    }
  });
  return (
    <div>
      <h1 className=" font-bold text-[30px] mt-0 text-center">
        User Login Form
      </h1>
      <div className="flex justify-between items-center">
        <div className="w-2/5 flex flex-col items-center">
          <img className=" h-[300px] w-[300px] mb-0" src={Logo} alt="logo" />
        </div>
        <div className="w-2/5 mx-auto">
          <form
            onSubmit={handleSubmit(captureUserDetails)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-1 md:gap-2">
              <label
                htmlFor="email"
                className="font-bold text-[15px] md:text-[20px]"
              >
                Email
              </label>
              <input
                id="email"
                className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
                placeholder="Enter your email id"
                type="email"
                {...register("email")}
                required
              />
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <label
                htmlFor="password"
                className="font-bold text-[15px] md:text-[20px]"
              >
                Password
              </label>
              <div className=" bg-[#FFA3BE] w-full p-2 rounded-md flex justify-between items-center">
                <input
                  id="password"
                  className=" bg-transparent w-11/12 outline-none text-black"
                  placeholder="Enter your password"
                  type={inputs.passwordVisibility ? "text" : "password"}
                  {...register("password")}
                  required
                />
                <button type="button">
                  {inputs.passwordVisibility ? (
                    <BsEyeSlashFill
                      className=" h-[25px] w-[25px]"
                      onClick={() =>
                        setInputs({
                          ...inputs,
                          passwordVisibility: !inputs.passwordVisibility,
                        })
                      }
                    />
                  ) : (
                    <BsEyeFill
                      className=" h-[25px] w-[25px]"
                      onClick={() =>
                        setInputs({
                          ...inputs,
                          passwordVisibility: !inputs.passwordVisibility,
                        })
                      }
                    />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className=" bg-[#474BCA] w-full rounded-md text-white font-bold p-2"
            >
              Login
            </button>
            <h1 className="text-center">
              You Don't have account{" "}
              <Link to="/register">
                <span className="text-blue-600 underline">Register Here.</span>
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
