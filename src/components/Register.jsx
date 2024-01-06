import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    passwordVisibility: false,
    confirmPasswordVisibility: false,
  });
  const { register, reset, handleSubmit } = useForm();

  const existedUser = localStorage.getItem("userDetails");

  const navigate = useNavigate();

  const captureUserDetails = (data) => {
    const {
      password,
      confirmPassword,
      firstName,
      lastName,
      email,
      phone,
      type,
    } = data;
    if (password === confirmPassword) {
      let usersExisted = localStorage.getItem("registeredUsers");
      if (usersExisted) {
        let registeredUsersList = JSON.parse(usersExisted);
        const newUser = { firstName, lastName, email, phone, type, password };
        const isUserExisted = registeredUsersList.filter(
          (each) => each.email === email
        );
        if (isUserExisted.length > 0) {
          alert(
            `User Already Existed With ${email} Change Email And Try Again`
          );
          navigate("/login");
        } else {
          registeredUsersList.push(newUser);
          localStorage.setItem(
            "registeredUsers",
            JSON.stringify(registeredUsersList)
          );
          alert("User Registered Successfully");
          navigate("/login");
        }
      } else {
        let firstUser = [];
        const newUser = { firstName, lastName, email, phone, type, password };
        firstUser.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(firstUser));
        alert("User Registered Successfully");
        navigate("/login");
        reset();
      }
    } else {
      alert("Both Passwords Mismatched Check Once");
    }
  };

  useEffect(() => {
    if (existedUser) {
      navigate("/");
    }
  });
  return (
    <div className="flex justify-between items-center">
      <div className="w-2/5 flex flex-col items-center">
        <img className=" h-[300px] w-[300px] mb-0" src={Logo} alt="logo" />
        <h1 className=" font-bold text-[30px] mt-0">User Registration Form</h1>
      </div>
      <div className="w-2/5 mx-auto">
        <form
          onSubmit={handleSubmit(captureUserDetails)}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col gap-1 md:gap-2">
            <label
              htmlFor="firstName"
              className="font-bold text-[15px] md:text-[20px]"
            >
              First Name
            </label>
            <input
              id="firstName"
              className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
              placeholder="Enter your email id"
              type="text"
              {...register("firstName")}
              required
            />
          </div>
          <div className="flex flex-col gap-1 md:gap-2">
            <label
              htmlFor="lastName"
              className="font-bold text-[15px] md:text-[20px]"
            >
              Last Name
            </label>
            <input
              id="lastName"
              className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
              placeholder="Enter your email id"
              type="text"
              {...register("lastName")}
              required
            />
          </div>
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
              htmlFor="type"
              className="font-bold text-[15px] md:text-[20px]"
            >
              Type
            </label>
            <select
              id="type"
              className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
              {...register("type")}
              required
            >
              <option value="">Select Type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 md:gap-2">
            <label
              htmlFor="phone"
              className="font-bold text-[15px] md:text-[20px]"
            >
              Phone Number
            </label>
            <input
              id="phone"
              className=" bg-[#FFA3BE] w-full p-2 rounded-md outline-none text-black"
              placeholder="Enter your email id"
              type="text"
              {...register("phone")}
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
              <button>
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
          <div className="flex flex-col gap-1 md:gap-2">
            <label
              htmlFor="confirmPassword"
              className="font-bold text-[15px] md:text-[20px]"
            >
              Confirm Password
            </label>
            <div className=" bg-[#FFA3BE] w-full p-2 rounded-md flex justify-between items-center">
              <input
                id="confirmPassword"
                className=" bg-transparent w-11/12 outline-none text-black"
                placeholder="Enter your password"
                type={inputs.confirmPasswordVisibility ? "text" : "password"}
                {...register("confirmPassword")}
                required
              />
              <button>
                {inputs.confirmPasswordVisibility ? (
                  <BsEyeSlashFill
                    className=" h-[25px] w-[25px]"
                    onClick={() =>
                      setInputs({
                        ...inputs,
                        confirmPasswordVisibility:
                          !inputs.confirmPasswordVisibility,
                      })
                    }
                  />
                ) : (
                  <BsEyeFill
                    className=" h-[25px] w-[25px]"
                    onClick={() =>
                      setInputs({
                        ...inputs,
                        confirmPasswordVisibility:
                          !inputs.confirmPasswordVisibility,
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
            Register
          </button>
          <h1 className="text-center">
            Already have an account{" "}
            <Link to="/login">
              <span className="text-blue-600 underline">Login Here</span>
            </Link>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Register;
