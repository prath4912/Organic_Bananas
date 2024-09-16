import React, { useEffect } from "react";
import Fruitcontext from "../context/Fruitcontext";
import { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SpinnerLoading from "../components/SpinnerLoading";

function Cart() {
  var t_quantity = 0;
  var total_cost = 0;

  const a = useContext(Fruitcontext);

  useEffect(() => {
    a.getcart();
  }, []);

  return (
    <div className="mt-28 lg:mt-40 ">
      {a.loading && <SpinnerLoading />}
      <div className="p-3 lg:mx-28  bg-zinc-800" style={{ minHeight: "70vh" }}>
        <h1 className="text-2xl text-white font-bold mb-3 ">Items</h1>
        <div className="flex flex-row flex-wrap justify-aroundg">
          <div className=" grow lg:me-1 ">
            {a.cart && a.cart.length > 0 ? (
              a.cart.map((cart) => {
                total_cost = total_cost + cart.product.amount * cart.quantity;
                t_quantity = t_quantity + cart.quantity;
                return (
                  <div className="flex flex-row my-1">
                    <div className="">
                      <img
                        src={cart.product.image[0]}
                        className="rounded-start"
                        width={130}
                      />
                    </div>
                    <div className="flex flex-row bg-white w-full   justify-around items-center">
                      <div className=" w-1/4 text-center">
                        <h5 className="">
                          <b>{cart.product.name}</b>
                        </h5>
                      </div>
                      <div className="flex w-1/4 justify-center ">
                        <button
                          className="bg-yellow-400 border px-1 rounded  border-black mx-1 active:scale-90 transition-all"
                          onClick={() => {
                            a.subq(cart.product._id, cart.quantity);
                          }}
                        >
                          -
                        </button>
                        <div className="bg-white border rounded-full inline  px-2  border-black ">
                          {cart.quantity}
                        </div>
                        <button
                          onClick={() => {
                            a.addcart(cart.product._id);
                          }}
                          className="bg-yellow-400 px-1 border rounded border-black mx-1 active:scale-90 transition-all"
                        >
                          +
                        </button>
                      </div>
                      <div className="w-1/4 text-center">
                        <p className="">
                          Subtotal : {cart.quantity * cart.product.amount}RS
                        </p>
                      </div>
                      <div
                        className="w-1/4 text-center"
                        onClick={() => {
                          a.removehandle(cart.product._id);
                        }}
                      >
                        <button className="bg-yellow-400 py-1 border border-black rounded px-3 active:scale-75 transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="">
                <div className="h-50 flex flex-col justify-center items-center">
                  <p className="text-white my-2">Cart Is Empty</p>
                  <Link
                    to="/products"
                    type="button"
                    className="border-white border text-center text-white p-1 rounded  "
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            )}
          </div>

          {a.cart.length && (
            <div className=" bg-white rounded h-60 p-2 px-8   border border-black">
              <h5 className="font-semibold my-2">Cart Details</h5>
              <p className="">Total Items : {t_quantity}</p>
              <p className="">Cart Subtotal : {total_cost}</p>
              <p className=""> Shipping : Free</p>
              <p className="">Total : {total_cost}</p>

              <Link
                to={`/checkout/${total_cost}`}
                type="button"
                className=" border-black my-1 bg-black text-white p-1 rounded text-sm font-medium w-full mt-2"
              >
                Proceed To Checkout
              </Link>

              <p className="my-1 ">
                <small className="">Happy Health</small>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;

{
  /* <div
        className="h-75 modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Checkout To Buy
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="add"
                  name="add"
                  value={add1}
                  onChange={onchange}
                  placeholder=""
                  required
                />
                <label for="add">Enter Delivery Address</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary text-white bg-black active:scale-75 transition-all"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={
                  !localStorage.getItem("token")
                    ? () => {
                        alert("Login Required");
                      }
                    : () => props.checkoutHandler(total_cost, add1, a.cart)
                }
                data-bs-dismiss="modal"
                className="btn btn-primary bg-blue-500 text-white active:scale-75 transition-all"
              >
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div> */
}
