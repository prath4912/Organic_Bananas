import React from "react";
import useQuery from "../hooks/useQuery";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Paymentsucces() {
  const query = useQuery();
  const ref = query.get("referance");
  return (
    <div className="mt-28 lg:mt-40 flex justify-center items-center  min-h-64">
      <div className="text-center border-2 shadow-lg shadow-black mx-2 lg:mx-32 mb-10 p-2 ">
        <h3 className="font-bold text-2xl">Order Succesfully Completed </h3>
        <p className="p-3 text-dark fw-bold ">Payment ID : {ref}</p>
        <div className="flex flex-wrap justify-around" >
          <Link to="/orders" className="border grow border-black p-1 rounded hover:bg-black hover:text-white active:scale-90 transition-all" >Track Your Order</Link>
          <button className=" grow border border-black p-1 bg-black text-white rounded hover:bg-white hover:text-black active:scale-90 transition-all mx-1" >See Orders</button>
        </div>
      </div>
    </div>
  );
}
