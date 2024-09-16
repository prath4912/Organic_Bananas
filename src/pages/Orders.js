import React, { useContext, useEffect, useState } from "react";
import ob from "../images/Pineapple.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Fruitcontext from "../context/Fruitcontext";
import axios from "axios";

export default function Orders() {
  const a = useContext(Fruitcontext);

  useEffect(() => {
    getorders();
  }, []);
  const [arr, setarr] = useState([]);

  const getorders = async () => {
    const result = await axios.post(
      `${a.BaseUrl}/api/order/get`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(result);
    setarr(result.data);
  };

  // const arr = [
  //   { id: 1, status: "deliverd", Payment: "completed", products: ["ac", "e"] },
  //   { id: 1, status: "deliverd", Payment: "completed", products: ["ac", "e"] },
  //   {
  //     id: 1,
  //     status: "deliverd",
  //     Payment: "completed",
  //     products: ["ac", "e", "rw"],
  //   },
  // ];
  return (
    <div className="mt-28 lg:mt-40 lg:mx-32">
      <div className="">
        <h1 className="font-bold text-lg my-4">Your Orders</h1>
        <hr className="" />
        {/* <ul className="flex gap-8 my-2 ms-3">
          <a className="underline">Orders</a>
          <a className="underline">Cancelled Orders</a>
        </ul> */}
        <div className="p-4">
          {arr.map((ele) => {
            return (
              <div className=" mb-3 border border-black">
                <div className="flex text-xs gap-2 justify-around p-2 bg-stone-200">
                  <div>
                    <p className="">Order Placed</p>
                    <p className="text-sm">
                      {new Date(ele.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p>Total</p>
                    <p className="text-sm">&#8377; {ele.amount}</p>
                  </div>
                  <div>
                    <p className="" >Status</p>
                    <p>{ele.status}</p>
                  </div>
                  {/* <div className="text-xs">
                    <p className="">Shipped To</p>
                    <p
                      data-tooltip-id="my-tooltip-1"
                      className="text-sm text-blue-400 underline "
                    >
                      Prathmesh Pawar
                    </p>
                    <ReactTooltip id="my-tooltip-1" place="bottom">
                      <p>
                        PRATHMESH SUNIL PAWAR <br />
                        Anna pawar vasti,umbarde <br />
                        Umbarde <br />
                        VADUJ, MAHARASHTRA 415506 <br />
                        India <br />
                        Phone: 9096230379{" "}
                      </p>
                    </ReactTooltip>
                  </div>
                  <div className="text-xs float-right">
                    <p className="">Order # 5744351</p>
                    <p className="text-sm">
                      <Link className="text-blue-400 underline">
                        View order details
                      </Link>
                      <span> | </span>
                      <Link className="text-blue-400 underline">
                        Invoice &#8893;
                      </Link>
                    </p>
                  </div> */}
                </div>

                {ele.products.map((item) => {
                  return (
                    <>
                      <div className="flex my-1 items-center">
                        <div className="">
                          <img
                            src={item.product.image[0]}
                            alt="Product Image"
                            width={"70px"}
                          />
                        </div>
                        <div className="grow text-center">
                          <h5 className="">{item.product.name}</h5>
                        </div>
                        <div className=" text-center grow ">
                          <p>{item.quantity} kg</p>
                        </div>
                        <div className=" text-center grow ">
                          <p>{(item.product.amount * (1 - item.product.discount / 100))*item.quantity} Rs</p>
                        </div>
                        <div className="grow text-center">
                          <Link
                            to={`/fruits/${item.product.name}/${item.product._id}`}
                            className=" text-xs font-medium border-2 rounded-lg px-3 p-1"
                          >
                            Write a Product Review
                          </Link>
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
