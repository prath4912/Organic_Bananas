import React from "react";
import ship from "../images/ship.png";
import ftoc from '../images/ftoc2.png'
import as from '../images/as.jpg'
import fresh from "../images/fresh.jpg"
import org from "../images/org.png"
import Map from "./Map";

export default function Home() {
  const arr = [
    { img: ftoc, title: "Farmers to customer" },
    { img: as, title: "Affordable Price & Safety" },
    { img: fresh, title: "Quality Fresh Products" },
    { img: org, title: "Organic & chemical Free" },
    { img: ship, title: "Free Shipping" },

  ];
  return (
    <>
    <div className="container d-flex justify-content-around my-5 flex-wrap gap-2 mt100vh">
      {arr.map((element,index) => {
        return (
          <div key={index} className="card shadow-lg border border-black" style={{width: "12rem"}}>
            <img  src={element.img} className="p-3 card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="text-center card-title">{element.title}</h5>
            </div>
          </div>
        );
      })}
    </div>
    <Map/>

    {!localStorage.getItem("token") ?<div style={{background : "azure"}} className="container-fluid pt-4 pb-2 ">
        <div className="d-flex flex-row w-100 justify-content-around">
        <div>
      <h3>Sign Up For News Letter</h3>
      <p>Get E-mail updates about our latest shop and special offers.</p>
      </div>
      <div className="pt-2">
        <input className="p-2 px-5" placeholder="Enter Email" type="email" name="mail" id="mail" /><button className="bg-warning p-2 px-5">Sign Up</button>
      </div>
      </div>
    </div> :<></> }
    </>
  );
}
