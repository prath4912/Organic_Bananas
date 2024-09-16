import React from "react";
import ship from "../images/ship.png";
import ftoc from "../images/ftoc2.png";
import as from "../images/as.jpg";
import fresh from "../images/fresh.jpg";
import org from "../images/org.png";
import Map from "./Map";
import About from "./About";

export default function Home() {
  const arr = [
    { img: ftoc, title: "Farmers to customer" },
    { img: as, title: "Affordable Price & Safety" },
    { img: fresh, title: "Quality Fresh Products" },
    { img: org, title: "Organic & chemical Free" },
    { img: ship, title: "Free Shipping" },
  ];
  return (
    <div className="bg-stone-200  ">
      <div className="  ">
        <h1 className="text-center bg-stone-500 text-5xl py-4 text-white font-bold">
          We Offer
        </h1>
        <div className=" flex flex-wrap justify-center gap-1 lg:gap-3  bg-opacity-90 py-4   bg-gray-200 ">
          {arr.map((element, index) => {
            return (
              <div
                key={index}
                className="bg-white w-44 rounded overflow-hidden shadow-lg border border-black hover:scale-105   transition-all"
              >
                <div className="w-36 mx-auto p-1 h-44 ">
                  <img
                    src={element.img}
                    className=" overflow-hidden  hover:scale-105 transition-all"
                    alt="image"
                  />
                </div>
                <div className="p-2 my-2">
                  <h5 className="text-center hover:font-bold transition-all">
                    {element.title}
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <About />
      <Map />
      {/* {!localStorage.getItem("token") ? (
        <div className=" pt-4 pb-2 px-2 lg:px-0 ">
          <div className="flex flex-col lg:flex-row   justify-around">
            <div>
              <h3 className="font-medium">Sign Up For News Letter</h3>
              <p className="text-xs lg:text-sm">
                Get E-mail updates about our latest shop and special offers.
              </p>
            </div>
            <div className="pt-2">
              <input
                className="border p-2 px-5"
                placeholder="Enter Email"
                type="email"
                name="mail"
                id="mail"
              />
              <button className="border border-neutral-400 p-2 px-5 hover:bg-black hover:text-white ">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
}
