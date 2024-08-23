import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';

import Fruitcontext from '../context/Fruitcontext';


export default function Checkout() {
  const {  total_cost} = useParams();

  

  const a = useContext(Fruitcontext) ;
  const [address, setAddress] = useState("");

  const changeHandle = (e) => {
    setAddress(e.target.value);
  };

  const handle = (e) => {
    e.preventDefault();
    console.log(total_cost , address )
    a.checkoutHandler(total_cost, address, a.cart);
  };

  return (
    <div className='lg:mt-40 mx-8' >
        <div className="lg:w-72  ">
          <h1 className="font-bold my-2 text-lg">Checkout To Buy</h1>
          <form
            onSubmit={
              !localStorage.getItem("token")
                ? () => {
                    alert("Login Required");
                  }
                : handle
            }
            action=""
          >
            <div className="flex flex-col ">
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
              <br />
              <button
                className="bg-black rounded text-sm py-1 text-white active:scale-90 transition-all"
                type="submit"
              >
                Proceed To Payment
              </button>
              <button
                className="bg-black rounded text-sm py-1 text-white active:scale-90 transition-all my-1"
              >
                Close
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}
