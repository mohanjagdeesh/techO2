import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import EditUserPopup from "./EditUserPopup";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [inputs, setInputs] = useState({
    input: false,
    editUser: false,
    editableUser: {},
  });
  let userDetails = localStorage.getItem("userDetails");
  userDetails = JSON.parse(userDetails);
  let totalUsers = localStorage.getItem("registeredUsers");
  totalUsers = JSON.parse(totalUsers);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) {
      navigate("/register");
    }
  }, [inputs]);

  const logOut = () => {
    localStorage.removeItem("userDetails");
    setInputs({ ...inputs, input: !inputs.input });
  };

  return (
    <div>
      {userDetails?.type === "admin" ? (
        <div>
          <div className="flex w-2/5 gap-3 justify-center mx-auto my-10">
            <h1 className="text-[25px] font-bold text-red-600">
              User Dashboard
            </h1>
            <h1 className="text-[25px] font-bold">
              Type :- {userDetails?.type.toUpperCase()}
            </h1>
            <button
              onClick={logOut}
              className=" bg-[#474BCA] w-fit rounded-md text-white font-bold p-2"
            >
              Logout
            </button>
          </div>
          <table className="table-auto max-w-[95%] text-start mx-auto">
            <thead className="border-b-2">
              <tr>
                <th className="text-start p-2">First Name</th>
                <th className="text-start p-2">Last Name</th>
                <th className="text-start p-2">Email</th>
                <th className="text-start p-2">Phone</th>
                <th className="text-start p-2">Type</th>
                <th className="text-start p-2">Delete</th>
                <th className="text-start p-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {totalUsers.map((user) => {
                const deleteUser = () => {
                  const deletableUsesr = totalUsers.filter(
                    (every) => user.email === every.email
                  );
                  const deleteFiltration = totalUsers.filter(
                    (every) => user.email !== every.email
                  );

                  if (deletableUsesr[0].type === "admin") {
                    alert(
                      "You are not allowed to delete an Admin even if you are an Admin"
                    );
                    return;
                  }
                  localStorage.setItem(
                    "registeredUsers",
                    JSON.stringify(deleteFiltration)
                  );
                  setInputs({ ...inputs, input: !inputs.input });
                };

                const editUser = () => {
                  setInputs({ ...inputs, editableUser: user, editUser: true });
                };
                return (
                  <tr
                    className="border-b-2 break-all max-w-full"
                    key={user.email}
                  >
                    <td className="p-2">{user?.firstName}</td>
                    <td className="p-2">{user?.lastName}</td>
                    <td className="p-2">{user?.email}</td>
                    <td className="p-2">{user?.phone}</td>
                    <td className="p-2">{user?.type.toUpperCase()}</td>
                    <td className="p-2">
                      <MdDelete
                        className=" cursor-pointer"
                        onClick={deleteUser}
                      />
                    </td>

                    <td className="p-2">
                      <MdEdit onClick={editUser} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div className="flex w-2/5 gap-3 justify-center mx-auto my-10">
            <h1 className="text-[25px] font-bold text-red-600">
              User Dashboard
            </h1>
            <h1 className="text-[25px] font-bold">
              Type :- {userDetails?.type.toUpperCase()}
            </h1>
          </div>
          <table className="table-auto max-w-[95%] text-start mx-auto">
            <thead className="border-b-2">
              <tr>
                <th className="text-start p-2">First Name</th>
                <th className="text-start p-2">Last Name</th>
                <th className="text-start p-2">Email</th>
                <th className="text-start p-2">Phone</th>
                <th className="text-start p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">{userDetails?.firstName}</td>
                <td className="p-2">{userDetails?.lastName}</td>
                <td className="p-2">{userDetails?.email}</td>
                <td className="p-2">{userDetails?.phone}</td>
                <td className="p-2">{userDetails?.type.toUpperCase()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {inputs.editUser && (
        <EditUserPopup
          userDetails={inputs.editableUser}
          inputs={inputs}
          setInputs={setInputs}
        />
      )}
    </div>
  );
};

export default Dashboard;
