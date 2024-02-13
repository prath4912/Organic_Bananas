import React from "react";
import ob from "../images/Pineapple.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function Orders() {
  const arr = [
    { id: 1, status: "deliverd", Payment: "completed", products: ["ac", "e"] },
    { id: 1, status: "deliverd", Payment: "completed", products: ["ac", "e"] },
    {
      id: 1,
      status: "deliverd",
      Payment: "completed",
      products: ["ac", "e", "rw"],
    },
  ];
  return (
    <div className="mt-28 lg:mt-40 lg:mx-32">
      <div className="">
        <h1 className="font-bold text-lg my-4">Your Orders</h1>
        <hr className="" />
        <ul className="flex gap-8 my-2 ms-3">
          <a className="underline">Orders</a>
          <a className="underline">Cancelled Orders</a>
        </ul>
        <div className="p-4">
          {arr.map((ele) => {
            return (
              <div className=" mb-3 border border-black">
                <div className="flex text-xs gap-2 justify-around p-2 bg-stone-200">
                  <div>
                    <p className="">Order Placed</p>
                    <p className="text-sm">15 JAN 2003</p>
                  </div>
                  <div>
                    <p>Total</p>
                  <p className="text-sm">&#8377; 400.00</p>
                  </div>
                  <div className="text-xs">
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
                      <Link className="text-blue-400 underline">View order details</Link>
                      <span> | </span>
                      <Link className="text-blue-400 underline">Invoice &#8893;</Link>
                    </p>
                  </div>
                </div>

                {ele.products.map((pro) => {
                  return (
                    <>
                      <div className="flex my-1 items-center">
                        <div className="">
                          <img src={ob} alt="Product Image" width={"70px"} />
                        </div>
                        <div className="grow text-center">
                          <div className="">
                            <h5 className="">Bananas</h5>
                            <p className="">
                              <small className=""></small>
                            </p>
                          </div>
                        </div>
                        <div className="grow text-center" >
                          <button className=" text-xs font-medium border-2 rounded-lg px-3 p-1" >Write a Product Review</button>
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
