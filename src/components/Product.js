import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Fruitcontext from "../context/Fruitcontext";
import { useContext } from "react";
import { useEffect } from "react";
import wishsym from "../images/bookmark.png";
import cartsym from "../images/trolley.png";
import toast from "react-hot-toast";
import RemoveSym from "../images/delete.png";

function Product(props) {
  const a = useContext(Fruitcontext);

  useEffect(() => {}, []);

  return (
    <div className="my-3 w-44  lg:mx-2  lg:w-60 shadow-lg bg-stone-100  shadow-black/50 hover:scale-105 transition-all ">
      <div className="flex flex-col overflow-hidden ">
        <Link to={`/fruits/${props.name}/${props.p_id}`}>
          <img
            src={props.image}
            height={"300px"}
            className="hover:scale-105 transition-all  "
            alt="Not Available"
          />
        </Link>

        <div className="text-black py-3 bg-white  ">
          <h5 className="text-center font-bold text-lg ">{props.name}</h5>
          {props.desc && (
            <p className="">
              {props.desc.slice(0, 10)}
              <small>
                <a href="">read more</a>
              </small>
            </p>
          )}
        </div>
        <div className="bg-stone-100 border-t-2 border-zinc-300 text-black grow my-auto ">
          <div className="flex justify-around items-center py-2">
            <small className="">Price: {props.amount}RS</small>
            {props.title == "wishlist" ? (
              <button
                onClick={() => {
                  a.deletewishlist(props.p_id);
                  toast.success("Item Removed From WishList", {
                    duration: 1000,
                    iconTheme: {
                      primary: "#000",
                      secondary: "#fff",
                    },
                  });
                }}
                className="bg-yellow-400 p-1  lg:block rounded border border-stone-500 float-end me-1 active:scale-75 transition-all  "
              >
                <img width={"20px"} className="" src={RemoveSym} alt="" />
              </button>
            ) : (
              <button
                onClick={() => {
                  a.addwishlist(props.p_id);
                  toast.success("Itam Added To WishList", {
                    duration: 1000,
                    iconTheme: {
                      primary: "#000",
                      secondary: "#fff",
                    },
                  });
                }}
                className="bg-yellow-400 p-1 hidden lg:block rounded border border-black float-end me-1 active:scale-75 transition-all "
              >
                <img className="" src={wishsym} width={"20px"} alt="" />
              </button>
            )}
            <button
              onClick={() => {
                a.addcart(props.p_id);
                toast.success("Itam Added To Cart", {
                  duration: 1000,
                  iconTheme: {
                    primary: "#000",
                    secondary: "#fff",
                  },
                });
              }}
              className="bg-yellow-400 p-0.5 rounded border border-black float-end active:scale-75 transition-all text-sm lg:px-1 "
            >
              Add To{" "}
              <img
                className="inline mb-1 "
                src={cartsym}
                width={"20px"}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
