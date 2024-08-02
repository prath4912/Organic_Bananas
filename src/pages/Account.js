import React, { useContext, useEffect, useState } from "react";
import Fruitcontext from "../context/Fruitcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import user from "../images/user.jpg";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Profile() {
  const a = useContext(Fruitcontext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setname] = useState({ first: "", last: "" });

  useEffect(() => {
    if (a.profileData) {
      setname({ first: a.profileData.firstName, last: a.profileData.lastName });
    }
  }, []);

  const history = useHistory();
  const handlelogout = () => {
    localStorage.removeItem("token");
    a.setpdata(null);
    history.push("/login");
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const openModal = () => setIsOpen(true);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${a.BaseUrl}/api/auth/update`,
      { firstName: name.first, lastName: name.last },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(response) ;
    a.setpdata(response.data.pdata);
    setIsOpen(false);
  };

  const changeHandle = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setname({ ...name, [key]: value });
  };

  return (
    <div className="pt-20 lg:pt-40 mx-2 lg:mx-32 bg-stone-100 p-1 lg:px-4 lg:h-screen min-h-screen">
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="block w-72">
          <form onSubmit={handleUpdate} action="">
            <div className="flex flex-col ">
              <label htmlFor="first">Enter First name</label>
              <input
                onChange={changeHandle}
                name="first"
                value={name.first}
                className="border-2 mb-2"
                type="text"
                id="first"
              />
              <label htmlFor="last">Enter Last name</label>
              <input
                onChange={changeHandle}
                value={name.last}
                name="last"
                className="border-2"
                type="text"
                id="last"
              />
              <br />
              <button
                className="bg-black rounded text-white active:scale-90 transition-all"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <h1 className="font-bold my-4 text-lg lg:text-2xl ">My Account</h1>
      <div className="flex flex-wra ">
        <div className="flex flex-col lg:gap-5">
          <div className="lg:w-48">
            <img
              className="rounded-full inline w-6 me-2"
              width=""
              src={user}
              alt=""
            />
            <div className="inline ">
              <h3 className="inline font-semibold ">
                {!a.profileData ? "" : a.profileData.firstName  }
              </h3>
            </div>
          </div>

          <ul className="border-2 py-2 lg:ps-2 rounded">
            <li className="border-b-2 py-2 ">Profile Information</li>

            <li className="border-b-2 py-2 ">
              <Link to="/orders">My Orders</Link>
            </li>
            <li className="border-b-2 py-2 cursor-pointer ">
              <Link to="/wishlist">Wishlist</Link>
            </li>

            <li onClick={handlelogout} className=" py-2 cursor-pointer ">
              Logout
            </li>
          </ul>
        </div>

        <div className="grow ms-3 lg:ms-16">
          <h3 className="font-bold inline  ">Your Profile</h3>
          <p
            onClick={openModal}
            className="inline bg-zinc-200 border-2 border-neutral-600 p-0.5 rounded float-right me-8 "
          >
            Edit <FontAwesomeIcon className="" size="" icon={faPen} />
          </p>

          <ul className="indent-4">
            <li className="mt-2">
              {!a.profileData ? "" : a.profileData.firstName +" "+ a.profileData.lastName}{" "}
            </li>
            <li className="mt-2">
              Email : {!a.profileData ? "" : a.profileData.email }{" "}
            </li>
            <li className="mt-2">
              Mobile Number : {!a.profileData ? "" : a.profileData.contact}{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
