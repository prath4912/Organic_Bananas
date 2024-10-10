import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fruitcontext from "../context/Fruitcontext";
import axios from "axios";
import StarRating from "../components/StarRating";
import { Rating } from "react-simple-star-rating";
import Advantages from "../components/Advantages";
import SimillarProducts from "../components/SimillarProducts";
import toast from "react-hot-toast";
import SpinnerLoading from "../components/SpinnerLoading";

export default function Fruit() {
  const a = useContext(Fruitcontext);

  const { id } = useParams();
  const [item, setitem] = useState(null);
  const [quantity, setq] = useState(1);
  const [img, setimg] = useState(null);
  const [avgrating, setavgRating] = useState(0);
  const [total_ratingCount, settrc] = useState(0);
  const [arr, setarr] = useState([]);

  const getFruit = async () => {
    a.setloading(true);

    const url = `${a.BaseUrl}/api/product/get`;
    const response = await axios.post(
      url,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setitem(response.data.Fruit1);

    setimg(response.data.Fruit1.image[0]);
    a.setloading(false);
  };

  useEffect(() => {
    if (a.product_list.length > 0) {
    } else {
      a.fetchData();
    }
    setq(1);
    getFruit();
    getRating();
    window.scrollTo(0, 0);
    a.setloading(false);
  }, [id]);

  const getRating = async () => {
    a.setloading(true);

    const result = await axios.post(
      `${a.BaseUrl}/api/review/totalrating`,
      {
        product: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setavgRating(result.data.rating);
    settrc(result.data.total_count);
    setarr(result.data.arr);
    a.setloading(false);
  };

  return (
    <div className="pt-24 lg:pt-32  bg-white border-2 border-black">
      {/* {a.loading && <SpinnerLoading/>} */}
      {item && (
        <div className=" bg-white my-2 py-4">
          <div className="flex flex-row flex-wrap justify-center">
            <div className="flex lg:block ">
              {item.image.map((ele) => {
                return (
                  <img
                    onClick={() => setimg(ele)}
                    className="border-stone-300 my-0.5 border-2 border-collapse"
                    width={"80px"}
                    src={ele}
                  ></img>
                );
              })}
            </div>
            <div>
              <img
                src={img}
                className="w-80 lg:w-96  border-stone-400 border-2 ms-2"
                alt="..."
              />
            </div>
            <div className="mx-8 p-2 w-80  ">
              <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
              <div className="flex gap-1  ">
                <p className="mt-0.5">{avgrating}</p>
                <Rating
                  size={15}
                  allowFraction
                  SVGstyle={{ display: "inline" }}
                  initialValue={avgrating}
                  readonly={true}
                />
                <p className="text-sm mt-1">{total_ratingCount} ratings</p>
              </div>
              {item.discount > 0 && (
                <p className="text line-through">MRP - &#8377; {item.amount}</p>
              )}
              <p className="font-bold">
                Price- &#8377; {item.amount * (1 - item.discount / 100)}{" "}
                <small className="text-xs font-normal">
                  per Kg (&#8377;
                  {(item.amount * (1 - item.discount / 100)) / 1000}/1gm)
                </small>{" "}
              </p>
              {item.discount > 0 && (
                <p className="text-xs">You Save - {item.discount}% OFF</p>
              )}
              <p className=" text-xs">(inclusive of all taxes)</p>
              {/* <div className="my-2">
                <h4 className="font-semibold mb-1">Size</h4>
        
                <select className="p-1 border-2 border-black" name="" id="">
                  <option value="">500gm- 900gm</option>
                  <option value="">1000gm- 1500gm</option>
                </select>
              </div> */}
              <p className="text-sm mt-2">Units</p>
              <div className="flex flex-row gap-2 mb-2">
                <div className="flex border-collapse">
                  <span
                    onClick={() => setq(quantity + 1)}
                    className="border-black border-2 px-2 cursor-pointer select-none "
                  >
                    &#43;{" "}
                  </span>
                  <span className="border-black border-2 px-2 ">
                    {quantity}kg
                  </span>
                  <span
                    onClick={() => {
                      if (quantity > 1) setq(quantity - 1);
                    }}
                    className="border-black border-2 px-2 cursor-pointer select-none  "
                  >
                    &#8722;
                  </span>
                </div>
                <button
                  onClick={() => {
                    a.addcart(item._id, quantity);
                    toast.success("Itam Added To Cart", {
                      duration: 1000,
                      iconTheme: {
                        primary: "#000",
                        secondary: "#fff",
                      },
                    });
                  }}
                  className="btn  bg-yellow-800 text-white hover:text-black hover:bg-yellow-500 active:scale-75 transition-all w-48"
                >
                  Add To Cart
                </button>
              </div>
              <button
                onClick={() => {
                  a.addwishlist(item._id);
                  toast.success("Itam Added To WishList", {
                    duration: 1000,
                    iconTheme: {
                      primary: "#000",
                      secondary: "#fff",
                    },
                  });
                }}
                className="btn bg-yellow-500 hover:bg-yellow-800 hover:text-white active:scale-75 transition-all w-full"
              >
                &#9829; Add To Wishlist
              </button>
            </div>
          </div>
          <div className="bg-neutral-200 mt-3 mx-1 lg:mx-48 p-2">
            <h3 className=" text-lg font-semibold">Description</h3>
            <p>{item.desc}</p>
          </div>
          <div className="bg-neutral-200 my-1 mx-1 lg:mx-48 p-2">
            <h3 className="bold text-lg font-semibold">Storage Tips</h3>
            <p>{item.storage}</p>
          </div>

          <StarRating
            id={item._id}
            avgrating={avgrating}
            total_ratingCount={total_ratingCount}
            arr={arr}
          />
        </div>
      )}

      <Advantages />

      <SimillarProducts title={"Similar Products"} id={id} />
    </div>
  );
}
