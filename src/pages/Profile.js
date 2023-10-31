import React, { useContext, useEffect, useState } from "react";
import Fruitcontext from "../context/Fruitcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import user from "../images/user.jpg";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {  useHistory } from "react-router-dom";

export default function Profile() {
  const a = useContext(Fruitcontext);

  useEffect(() => {
    a.getuserdata();
  }, []);
  

  const history = useHistory() ;
  const handlelogout = () => {
    localStorage.removeItem("token");
    // props.setcount(props.count + 1);
    a.setpdata(null) ;
    console.log(a.profileData) ;
    history.push("/login");
  };

  return (
    <div className="dd1 ">
      <div className="my-2 container d-flex " style={{ minHeight: "60vh" }}>
        <div className="px-4 p-3 bg-dark text-light d-flex flex-column">
          <div className="text-center d-flex">
            <img className="rounded-circle" width="60px" src={user} alt="" /> <span className="ms-2 fw-bold fs-4 my-auto">Hello</span>
          </div>

          {/* <h3>{!a.profileData ? "" : a.profileData.name  }</h3>  */}
          <div className="mt-2 d-flex gap-2 align-items-center ">
            <div>
              <h3 className="m-0 p-0 fs-5">Prathmesh</h3>
              <h3 className="m-0 p-0 fs-5">Pawar</h3>
            </div>
            <div className="d-inline ">
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
          <button className="mt-3 p-1 btn btn-light w-100 ">My Orders</button>
          <button className="mt-1 p-1 btn btn-light w-100 ">Temp</button>
          <button className="mt-1 p-1 btn btn-light w-100 ">TEmp</button>

          <div className=" mt-auto ">
          <button onClick={handlelogout} className="btn btn-light w-100">Logout <FontAwesomeIcon icon={faRightFromBracket} /></button>
          {/* <Link
                              onClick={handlelogout}
                              className="nav-link px-5"
                              to="/"
                            >
                              Logout
                            </Link> */}
          </div>
        </div>

        <div className="bg-secondary p-3 text-light flex-fill">
          <h3>Your Profile</h3>
          <ul className="">
            <li className="mt-2">
              Email :{!a.profileData ? "" : a.profileData.email}{" "}
            </li>
            <li className="mt-2">Mobile Number : 9096230370</li>
            <li className="mt-2">Birth Date : 15/03/2003</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
