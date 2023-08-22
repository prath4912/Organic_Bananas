import React, { useEffect, useState } from "react";
import Fruitcontext from "../context/Fruitcontext";
import { useContext } from "react";
import bg1 from "../images/ORGABIC.png"

function Cart(props) {

  const [add1, setadd] = useState("");
  var t_quantity = 0 ;
  var total_cost = 0;

  
  const onchange = (e) => {
    setadd(e.target.value);
  };


  const a = useContext(Fruitcontext);
  
  useEffect(() => {    a.getcart() ;
  }, [a.cart]);

  
  return (
    <div className="cd2">
      <div className="p-3 container bg-dark">
        <h1>Items </h1>

        <div className="row">    
        <div className="col-9">
        {a.cart.length ? (
          
          a.cart.map((cart, index) => {
            total_cost = total_cost + cart.product.amount * cart.quantity;
            t_quantity = t_quantity + cart.quantity ;
            

            return (
              <div className=" card mb-3" style={{ maxWidth: "100%" }}>
                <div className="row g-0">
                  <div className="col-md-2">
                    <img
                      src={bg1}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-10">
                    <div className="card-body">
                      <h5 className="card-title"> <b>{cart.product.name}</b> </h5>
                    </div>
                    <div className="d-flex pt-5">
                    <div className="me-3 ms-2" >
                      <button
                        className="btn btn-warning  btn-sm rounded-circle border-black mx-1"
                        onClick={() => {
                          a.subq(index);
                        }}
                      >
                        -
                      </button>
                      <div className="d-inline border px-2 py-1 border-black ">
                      {cart.quantity}</div>
                      <button
                        onClick={() => {
                          a.addq(index);
                        }}
                        className="btn btn-warning  btn-sm rounded-circle border-black mx-1"
                      >
                        +
                      </button>{" "}
                    </div>
                    <button
                      onClick={() => {a.removehandle(index) } }
                      className="btn btn-sm btn-warning border-black mx-2 "
                    >
                      Remove
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div style={{ color: "white" }}>Cart Is Empty </div>
        )}</div> 
        
        <div className="col  ">
          <div className="card px-4 pb-5 border border-black" >
            <div className="card-body">
              <h5 className="card-title">Cart Details</h5>
              <p className="card-text">Total Items : {t_quantity}</p>
              <p className="card-text">Total Price : {total_cost}</p>
              <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Proceed To Buy
                </button>
              <p className="mt-2 card-text"><small className="text-body-secondary">Happy Health</small></p>
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
