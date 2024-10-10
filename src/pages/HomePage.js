import React, { useContext } from "react";
import Home from "../components/Home";
import arrow from "../images/right-arrow.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FeaturedProducts from "../components/FeaturedProducts";
import SpinnerLoading from "../components/SpinnerLoading";
import Fruitcontext from "../context/Fruitcontext";

export default function Hone() {
  const a = useContext(Fruitcontext);
  return (
    <div className="bg-fixed bgimg lg:bg-cover ">
      {a.loading && <SpinnerLoading />}
      <div className="pt-20 h-screen">
        <div className="text-center my-auto h-screen lg:h-auto  pt-16 lg:py-16  bg-green-900 shadow-lg shadow-green-300/50 bg-opacity-30 ">
          <h1
            style={{ WebkitTextStroke: "1px black", padding: "10px" }}
            className="font-extrabold    text-white my-auto  w-full text-center  text-7xl py-3 "
          >
            Delivering Natural Taste
          </h1>
          <div className=" my-10 py-3 ">
            <Link
              to="/products"
              className=" text-green-50 text-3xl rounded font-bold bg-green-500  px-4 py-5 mt-5  active:scale-75 transition-all hover:bg-yellow-300 border hover:text-green-800 border-white "
            >
              Explore Products{"  "}
              <img className="inline " src={arrow} width={"30"} alt="" />
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
