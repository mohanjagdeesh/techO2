import { useForm } from "react-hook-form";

const EditUserPopup = ({ inputs, setInputs, userDetails }) => {
  const { register, reset, handleSubmit } = useForm();

  const updateUserDetails = (data) => {
    let allUsers = localStorage.getItem("registeredUsers");
    allUsers = JSON.parse(allUsers);
    const userIndex = allUsers.findIndex(
      (each) => userDetails.email === each.email
    );

    allUsers[userIndex] = data;
    localStorage.setItem("registeredUsers", JSON.stringify(allUsers));
    setInputs({ ...inputs, editUser: false });
  };
  return (
    <div className="fixed bg-[#00000072] top-0 left-0 w-full h-screen  flex justify-center items-center">
      <form
        onSubmit={handleSubmit(updateUserDetails)}
        className="bg-white rounded-md w-1/2 flex flex-col gap-5 p-5"
      >
        <div className="flex justify-between w-4/5 mx-auto">
          <label className="1/3" htmlFor="firstName">
            First Name
          </label>
          <input
            defaultValue={userDetails?.firstName}
            className=" outline-none border-b-2 border-black w-2/5"
            type="text"
            id="firstName"
            {...register("firstName")}
          />
        </div>
        <div className="flex justify-between w-4/5 mx-auto">
          <label className="1/3" htmlFor="lastName">
            Last Name
          </label>
          <input
            defaultValue={userDetails?.lastName}
            className=" outline-none border-b-2 border-black w-2/5"
            type="text"
            id="lastName"
            {...register("lastName")}
          />
        </div>
        <div className="flex justify-between w-4/5 mx-auto">
          <label className="1/3" htmlFor="phone">
            Phone Number
          </label>
          <input
            defaultValue={userDetails?.phone}
            className=" outline-none border-b-2 border-black w-2/5"
            type="text"
            id="phone"
            {...register("phone")}
          />
        </div>
        <div className="flex justify-between w-4/5 mx-auto">
          <label className="1/3" htmlFor="type">
            Type
          </label>
          <input
            defaultValue={userDetails?.type}
            className=" outline-none border-b-2 border-black w-2/5"
            type="text"
            id="type"
            {...register("type")}
          />
        </div>
        <div className="flex  self-center gap-5">
          <button
            className=" bg-[#474BCA] w-fit rounded-md text-white font-bold p-2"
            onClick={() => setInputs({ ...inputs, editUser: false })}
          >
            Cancel
          </button>
          <button
            className=" bg-[#474BCA] w-fit rounded-md text-white font-bold p-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPopup;
