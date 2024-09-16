import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import checkoutbgimg from "../images/checckout.jpg"

import Fruitcontext from "../context/Fruitcontext";

export default function Checkout() {
  const { total_cost } = useParams();

  const a = useContext(Fruitcontext);
  const [address, setAddress] = useState("");
  const [notes, setnotes] = useState("");


  const changeHandle = (e) => {
    setAddress(e.target.value);
  };

  const noteschangeHandle = (e) => {
    setnotes(e.target.value);
  };

  const handle = (e) => {
    if (!localStorage.getItem("token")) {
      alert("Login Required");
      return;
    }

    e.preventDefault();
    a.checkoutHandler(total_cost, address, a.cart);
  };

  return (
    <div className="checkoutbgimg lg:mt-28 flex   justify-center  ">
      <div className=" bg-white p-10">
        <h1 className="font-bold my-2 text-lg ">Checkout To Buy</h1>
        <form onSubmit={handle} action="">
          <div className="flex flex-col w-96 ">
            <label htmlFor="first">Enter Delivery Address</label>
            <textarea
              rows={6}
              onChange={changeHandle}
              name="address"
              value={address}
              className="border-2 mb-2"
              type="text"
              id="address"
              required
            />
            <label htmlFor="first">Enter Order Notes(Optional)</label>
            <textarea
              rows={6}
              onChange={noteschangeHandle}
              name="address"
              value={notes}
              className="border-2 mb-2"
              type="text"
              id="address"
              required
            />
            <br />
            <button
              className="bg-black rounded text-sm py-1 text-white active:scale-90 transition-all"
              type="submit"
            >
              Proceed To Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
