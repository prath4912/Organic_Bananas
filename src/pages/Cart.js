import React, { useEffect, useState } from "react";
import Fruitcontext from "../context/Fruitcontext";
import { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Cart(props) {

  const [add1, setadd] = useState("");
  var t_quantity = 0;
  var total_cost = 0;

  const onchange = (e) => {
    setadd(e.target.value);
  };

  const a = useContext(Fruitcontext);

  useEffect(() => {
    a.getcart();
  }, []);

  return (
    <div className="cd2 mb-4">
      <div className="p-3 mx-28 bg-dark">
        <h1 className="text-2xl text-white font-bold mb-3 ">Items</h1>

        <div className="flex flex-row flex-wrap justify-around ">
          <div className=" grow me-1 ">

            {(a.cart && a.cart.length>0 ) ? (

              a.cart.map((cart, index) => {
                total_cost = total_cost + cart.product.amount * cart.quantity;
                t_quantity = t_quantity + cart.quantity ;

                return (
                  <div className="my-1">
                    <div className=" ">
                      <div className="flex flex-row">
                        <div className="">
                          <img
                            src={cart.product.image[0]}
                            className = " rounded-start"
                            width={130}
                          />
                        </div>
                        <div className="flex flex-row bg-white w-full  align-items-center justify-content-around
">
                          <div className="">
                            <h5 className="">
                              <b>{cart.product.name}</b>
                            </h5>
                          </div>
                          <div className="">
                            <div className="flex ">
                              <button
                                className="btn btn-warning  btn-sm rounded-circle border-black mx-1 active:scale-90 transition-all"
                                onClick={() => {
                                  a.subq(cart.product._id , cart.quantity);
                                }}
                              >
                                -
                              </button>
                              <div className="d-inline border px-2  border-black ">
                                {cart.quantity}
                              </div>
                              <button
                                onClick={() => {
                                  a.addcart(cart.product._id);
                                }}
                                className="btn btn-warning  btn-sm   rounded-circle border-black mx-1 active:scale-90 transition-all"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="">
                            <p className="">Subtotal : {cart.quantity * cart.product.amount}RS</p>
                          </div>
                          <div onClick={() => {
                                a.removehandle(cart.product._id);
                              }} >
                            <button
                              
                              className="btn btn-sm btn-warning border-black px-3 active:scale-75 transition-all"
                            >
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
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-75" style={{ color: "white" }}>
                
                <p>Cart Is Empty</p>
                <div className="h-50 d-flex justify-content-center align-items-center">
                  <Link
                    to="/products"
                    type="button"
                    className="border-white text-center btn btn-warning "
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="">
            <div className="  card px-4 pb-5 border border-black">
              <div className="card-body">
                <h5 className="card-title">Cart Details</h5>
                <p className="card-text m-2">Total Items : {t_quantity}</p>
                <p className="card-text m-2">Cart Subtotal : {total_cost}</p>
                <p className="card-text m-2"> Shipping : Free</p>
                <p className="card-text m-2 my-3">Total : {total_cost}</p>

                {a.cart.length ? (
                  <button
                    type="button"
                    className="btn btn-warning border-black btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Proceed To Buy
                  </button>
                ) : (
                  <Link
                    type="button"
                    to="/products"
                    className="border-dark btn btn-warning btn-sm"
                  >
                    Shop Now
                  </Link>
                )}
                <p className="mt-2 card-text">
                  <small className="text-body-secondary">Happy Health</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Button trigger modal --> */}

      {/* <!-- Modal --> */}
      <div
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
                />
                <label for="add">Enter Delivery Address</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
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
                className="btn btn-primary"
              >
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
