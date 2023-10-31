import React, { useContext, useEffect } from "react";
import ob1 from "../images/ORGABIC.png";
import Popover from "@mui/material/Popover";
import { Box, Button } from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import Fruitcontext from "../context/Fruitcontext";
export default function Header(props) {
  const a = useContext(Fruitcontext) ;
  const [sham, setsham] = useState(false);
  const [temp, settemp] = useState(false);
  const [hn, sethn] = useState("12vh");

  const [hl, sethl] = useState("12vh");

  function closeMobileNavOnResize() {
    if (window.innerWidth < 430) {
      sethn("8vh");
      sethl("8vh");
    }

    if (window.innerWidth < 768) {
      setsham(true);
    } else {
      setsham(false);
    }
  }

  window.onresize = closeMobileNavOnResize;

  const tog = () => {
    if (temp) {
      settemp(false);
      sethl(hn);
    } else {
      settemp(true);
      sethl("35vh");
    }
  };

  const tfal = () => {
    settemp(false);
    sethl(hn);
  };
  
  useEffect(() => {
    a.getuserdata();
    closeMobileNavOnResize();
  }, []);



  const [containerEl, setContainerEl] = useState(null);

  const handleOpen = (e) => {
    // console.log(e.currentTarget ) ;
    setContainerEl(e.currentTarget);
  };

  const handleClose = () => {
    setContainerEl(null);
  };

  const open = Boolean(containerEl);
  const id = open ? "simple-popover" : "";

  let location = useLocation();
  const history = useHistory();

  const handlelogout = () => {
    localStorage.removeItem("token");
    props.setcount(props.count + 1);
    a.setpdata(null) ;
    console.log(a.profileData) ;
    history.push("/login");
  };

  return (
    <div>
      <div className="dh1">
        <nav className="m-0 p-0 navbar  ">
          <div className="m-0 hn1 container-fluid ">
            <div
              className="d-flex flex-row justify-content-between sd1 
"
            >
              <a className="navbar1 d-flex flex-row" id="a1" href="#">
                <img
                  src={ob1}
                  alt="Logo"
                  width="50"
                  height="50"
                  className="d-inline-block align-text-center ms-1 me-2 img-fluid"
                />
                <div className="d-flex flex-row flex-wrap">
                  <p className="m-0 p-0 me-2">ORGANIC </p>
                  <p className="m-0 p-0"> BANANAS</p>
                </div>
              </a>
            </div>
            {sham === false ? (
              <div className="m-0 dh2">
                <ul className=" d-flex flex-row justify-content-around dh7">
                  <li
                    className={`nav-item ${
                      location.pathname === "/" ? "c1" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location.pathname === "/products" ? "c1" : ""
                    }`}
                  >
                    <Link className="nav-link " to="/products">
                      Products
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      location.pathname === "/cart" ? "c1" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/cart">
                      Cart{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="pb-1 bi bi-cart3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                    </Link>
                  </li>

                  {!localStorage.getItem("token") ? (
                    <li className="nav-item">
                      <Link  className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                  ) : (
                    <div className="nav-item">
                      <Button aria-describedby={id} onClick={handleOpen}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="27"
                          fill="white"
                          className="bi bi-person-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>
                      </Button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={containerEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin= {{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <Box
                          sx={{ backgroundColor: "#fad42d", color: "black" }}
                        >
                          <div className="py-3" style={{ padding: "5px" }}>
                            <Link className="nav-link px-5" onClick={handleClose} to= {`/user/${a.profileData ? a.profileData.name : " "}` }>
                              Profile
                            </Link>
                            <hr className="m-2" />
                            <Link className="nav-link px-5" onClick={handleClose} to="/wishlist">
                              WishList
                            </Link>
                            <hr className="m-2" />
                            <Link className="nav-link px-5" onClick={handleClose} to="/orders">
                              Orders
                            </Link>
                            <hr className="m-2" />
                            <Link
                              onClick={handlelogout}
                              className="nav-link px-5"
                              to="/"
                            >
                              Logout
                            </Link>
                          </div>
                        </Box>
                      </Popover>
                      {" "}
                    </div>
                  )}
                </ul>
              </div>
            ) : (
              <div className="text-light" style={{ height: "6vh" }}>
                <div className="">
                  <div className="text-center mb-2">
                  {!temp ? (
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      color="white"
                      width="30"
                      height="30"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "white" }}
                      onClick={tog}
                    >
                      <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                    </svg>
                  ) : (
                    <svg
                      onClick={tog}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="white"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                  )}
                  </div>

                  {temp ? (
                    // <div className="container d-flex flex-column justify-content-center">
                    //   <div className="mt-3"  > <Link onClick={tfal}  To="#bg">Profile</Link></div>
                    //   <div className="my-1"  > <Link onClick={tfal} To="/products">Products</Link></div>
                    //   <div className="my-1" > <Link onClick={tfal} To="/cart">Cart</Link></div>
                    //   <div className="my-1" >  <Link   className="nav-link" to="/orders">
                    //           Orders
                    //         </Link></div>
                    //   <div className="my-1" ><Link onClick={handlelogout}  className="nav-link" to="/">
                    //           Logout
                    //         </Link>{" "}</div>
                    // </div>
                    <div>
                      <ul className=" d-flex flex-column justify-content-around dh7">
                        {!localStorage.getItem("token") ? (
                          <li className="nav-item">
                            <Link className="nav-link" to="/login">
                              Login
                            </Link>
                          </li>
                        ) : (
                          <div className="nav-item">
                            <Link className="m-auto nav-link" to="/user">
                              Profile{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="27"
                                height="27"
                                fill="white"
                                className="bi bi-person-circle"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path
                                  fillRule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                />
                              </svg>
                            </Link>
                            <Link className="nav-link" to="/orders">
                              Orders
                            </Link>
                            <Link
                              onClick={handlelogout}
                              className="nav-link"
                              to="/"
                            >
                              Logout
                            </Link>
                          </div>
                        )}
                        <li
                          className={`nav-item ${
                            location.pathname === "/" ? "c1" : ""
                          }`}
                        >
                          <Link className="nav-link" to="/">
                            Home
                          </Link>
                        </li>
                        <li
                          className={`nav-item ${
                            location.pathname === "/products" ? "c1" : ""
                          }`}
                        >
                          <Link className="nav-link " to="/products">
                            Products
                          </Link>
                        </li>
                        <li
                          className={`nav-item ${
                            location.pathname === "/cart" ? "c1" : ""
                          }`}
                        >
                          <Link className="nav-link" to="/cart">
                            Cart{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="currentColor"
                              className="pb-1 bi bi-cart3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
