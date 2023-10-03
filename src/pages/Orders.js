import React from "react";
import ob from "../images/ORGABIC.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function Orders() {
  const arr = [
    { id: 1, status: "deliverd", Payment: "completed" },
    { id: 1, status: "deliverd", Payment: "completed" },
    { id: 1, status: "deliverd", Payment: "completed" },
  ];
  return (
    <div className="cd2">
      <div className="container-sm bg-dark p-1 my-1">
        <h1>Your Orders</h1>
        <hr className="text-light" />
        <div className="text-light">
          <ul className="d-flex ">
            <li className="nav-link mx-2">Orders</li>
            <li className="nav-link">Cancelled Orders</li>
          </ul>
        </div>
        <div className="p-4">
          {arr.map((ele) => {
            return (
              <div
                class="card mb-3 border border-black"
                style={{ maxWidth: "100%" }}
              >
                <div className="row g-0 bg-secondary m-0">
                  <div
                    style={{ fontSize: "0.8rem" }}
                    className="col text-light p-1"
                  >
                    <p className="p-0 m-0">Order Placed</p>
                    <p className="p-0 m-0 ">15 JAN 2003</p>
                  </div>
                  <div
                    style={{ fontSize: "0.8rem" }}
                    className="col text-light p-1"
                  >
                    <p className="p-0 m-0">Total</p>
                    <p className="p-0 m-0 ">&#8377; 400.00</p>
                  </div>
                  <div
                    style={{ fontSize: "0.8rem" }}
                    className="col text-light p-1"
                  >
                    <p className="p-0 m-0">Shipped To</p>
                    <span
                      data-tooltip-id="my-tooltip-1"
                      className="text-decoration-underline p-0 m-0 "
                    >
                      Prathmesh Pawar
                    </span>
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
                  <div
                    style={{ fontSize: "0.8rem" }}
                    className="col text-light p-1 float-end"
                  >
                    <p className="p-0 m-0">Order # 5744351</p>
                    <p className="p-0 m-0 ">
                      <Link className="text-warning">view Order Details</Link>
                      <Link className="text-warning ms-2">Invoice &#8893;</Link>
                    </p>
                  </div>
                </div>

                <div class="row g-0">
                  <div class="col-md-2 p-5">
                    <img
                      src={ob}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8 pt-5">
                    <div class="card-body">
                      <h5 class="card-title">Bananas</h5>

                      <p class="card-text">
                        <small class="text-body-secondary">
                        </small>
                      </p>
                    </div>
                  </div>
                 
                </div>
                <div class="row g-0">
                <div class="col-md-2 p-5">
                    <img
                      src={ob}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Bananas</h5>

                      <p class="card-text">
                        <small class="text-body-secondary"></small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
