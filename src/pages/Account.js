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
    <div className="pt-40 mx-32 bg-stone-100 p-1 px-4 h-screen">
      <h1 className="font-bold my-4 text-2xl " >My Account</h1>
        <div className="flex " >
          <div className="flex flex-col gap-5" >
          <div className="w-48">
            <img className="rounded-full inline w-6 me-2" width="" src={user} alt="" /> 
            <div className="inline ">
            <h3 className="inline font-semibold " >{!a.profileData ? "" : a.profileData.name  }</h3> 
            </div>

          </div>


           
          <ul className="border-2 py-2 ps-2 rounded">
          <li className="border-b-2 py-2 " >Profile Information</li>

          <li className="border-b-2 py-2 " >My Orders</li>
          <li className="border-b-2 py-2 " >Wishlist</li>

          <li onClick={handlelogout} className=" py-2 cursor-pointer ">Logout</li>

        </ul>
        </div>


        <div className="grow ms-16">
          <h3 className="font-bold inline  " >Your Profile</h3>
                      <p className="inline bg-zinc-200 border-2 border-neutral-600 p-0.5 rounded float-right me-8 " >Edit <FontAwesomeIcon className="" size="" icon={faPen} /></p>

          <ul className="indent-4">
          <li className="mt-2">

               {!a.profileData ? "" : a.profileData.name}{" "}
            </li>
            <li className="mt-2">

              Email : {!a.profileData ? "" : a.profileData.email}{" "}
            </li>
            <li className="mt-2">Mobile Number : {!a.profileData ? "" : a.profileData.contact} </li>
          </ul>
        </div>
        </div>
    </div>
  );
}
