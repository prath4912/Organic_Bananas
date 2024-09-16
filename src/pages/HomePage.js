import React, { useContext } from "react";
import Home from "../components/Home";
import arrow from "../images/right-arrow.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FeaturedProducts from "../components/FeaturedProducts";
import SpinnerLoading from "../components/SpinnerLoading";
import Fruitcontext from "../context/Fruitcontext";

export default function Hone() {
  const a = useContext(Fruitcontext) ;
  return (
    <div className="bg-fixed bgimg lg:bg-cover ">
      {a.loading && <SpinnerLoading/> }
      <div className="pt-48 h-screen">
        <div className="text-center my-auto  py-20  bg-black shadow-lg shadow-purple-300/50 bg-opacity-40 ">
          <h1
            style={{ WebkitTextStroke: "1px black", padding: "10px" }}
            className="font-extrabold   text-white my-auto  w-full text-center  text-7xl py-3 "
          >
            Delivering Natural Taste
          </h1>
          <div className=" my-2 py-3">
            <Link
              to="/products"
              className="bg-white rounded  px-4 py-2  active:scale-75 transition-all hover:bg-yellow-300 border-2 border-stone-400 "
            >
              Explore Products{"  "}
              <img className="inline " src={arrow} width={"15"} alt="" />
            </Link>
          </div>
        </div>
      </div>
      <FeaturedProducts title={"fruit"} />
      <FeaturedProducts title={"vegetable"} /> 
      <Home />
    </div>
  );
}
