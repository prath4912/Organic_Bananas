import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import app from "../images/apps.jpg"
import play from "../images/playas.jpg"
import visa from "../images/visa.png"

export default function Footer() {
  return (
    <div className="bg-body-secondary text-black">
      <div className="h-50 container-fluid d-flex flex-row justify-content-around pt-3">
        <div>
          <h6 className="fs-5 text-black">Contact Us</h6>
          <p className="p-0 m-0 mt-1">Address : Umbarde, Vaduj, Satara 415506</p>
          <p className="p-0 m-0 mt-1">Phone : 9096230379</p>
          <p className="p-0 m-0 mt-1">Email : bananasorganic@gmail.com</p>
         
        </div>

        <div>
          <h6 className="fs-5 text-black">About Us</h6>
         
        </div>

        <div>
          <h6 className="fs-5 text-black">Account</h6>
          
        </div>
        <div>
          
          <div className="mt-2">
            <p>Secured Payment gateway using Razorpay</p>
            <div>
              <img src={visa} alt="" />
            </div>
          </div>
        </div>
      </div>
      
      
      <div className="  text-black text-center p-2">
        © 2003-2023, organicbananas.com, Inc. or its affiliates
      </div>
    </div>



  );
}
