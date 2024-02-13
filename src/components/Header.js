import React, { useContext, useEffect } from "react";
import ob1 from "../images/brand.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import Fruitcontext from "../context/Fruitcontext";
import Sidebar from "./Sidebar";

export default function Header(props) {
  const a = useContext(Fruitcontext);
  const [isSmallDevice, setisSmallDevice] = useState(false);

  const [isMenuOn, setisMenuOn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  function closeMobileNavOnResize() {
    if (window.innerWidth < 768) {
      setisSmallDevice(true);
    } else {
      setisSmallDevice(false);
    }
  }

  window.onresize = closeMobileNavOnResize;

  const tog = () => {
    setisMenuOn(!isMenuOn);
  };

  useEffect(() => {
    closeMobileNavOnResize();
  }, []);

  let location = useLocation();

  const history = useHistory();

  const handlelogout = () => {
    localStorage.removeItem("token");
    props.setcount(props.count + 1);
    a.setpdata(null);
    history.push("/login");
  };

  return (
    <div>
      <div
        className={`sidebar bg-light ${showSidebar ? "open" : ""}`}
        onClick={closeSidebar}
      >
        <Sidebar count={props.count} setcount={props.setcount} />
      </div>

      <div className="fixed top-0  w-screen z-20  ">
        <div className=" bg-lime-300 text-right text-xs pt-0.5 pe-2 text-black">
          <a
            className="text-blue-700 me-2"
            href="mailto: organicbananas@gmail.com"
          >
            organicbananas@gmail.com
          </a>
          9096230379 | 8007437075{" "}
        </div>

        <div className=" bg-green-100 border-b-2 border-black">
          <nav className="relative top-2 lg:top-6 mx-1 lg:mx-10   overflow-visible border-2 border-black    bg-green-900 ">
            <div className="  flex h-20 lg:h-24 justify-between px-2 lg:px-0 lg:justify-around items-center">
              <Link to="/home">
                <div className="  flex flex-row justify-between hover:scale-90 transition-all active:scale-90 hover:text-yellow-400">
                  <img
                    src={ob1}
                    alt="Logo"
                    width="50"
                    height="50"
                    className=" "
                  />
                  <p className="font-bold text-white  hover:text-yellow-400 my-auto ms-2 lg:ms-3 text-lg lg:text-3xl overflow-visible">
                    Organic Bananas
                  </p>
                </div>
              </Link>

              {isSmallDevice === false ? (
                <div className=" dh2">
                  <ul className=" flex flex-row justify-around dh7">
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
                        Fruits
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === "/cart" ? "c1" : ""
                      }`}
                    >
                      <Link className="nav-link" to="/cart">
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
                        <Link className="nav-link" to="/login">
                          Login
                        </Link>
                      </li>
                    ) : (
                      <div className="nav-item text-white">
                        <Link to="/user/account">
                          <li className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="27"
                              height="27"
                              fill="white"
                              className="bi bi-person-circle me-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                              <path
                                fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                              />
                            </svg>
                            {a.profileData && a.profileData.name.slice(0, 8)}...
                          </li>
                        </Link>
                      </div>
                    )}
                  </ul>
                </div>
              ) : (
                <div className="text-light" style={{ height: "6vh" }}>
                  <div className="">
                    <div className="text-center mb-2">
                      {!isMenuOn ? (
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
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
      {isMenuOn && (
        <div className="fixed z-40 top-0 h-full w-full block bg-white overflow-x-visible text-center">
          <svg
            onClick={tog}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="black"
            className="bi bi-x-lg ms-auto m-2"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
          <ul className="flex flex-col gap-3 ">
            <li className={`  ${location.pathname === "/" ? "text-green-600 font-bold text-lg" : ""}`}>
              <Link onClick={tog} className="" to="/">
                Home
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/products" ? "text-green-600 font-bold text-lg" : ""
              }`}
            >
              <Link onClick={tog} className="nav-link " to="/products">
                Fruits
              </Link>
            </li>
            <li
              className={` ${
                location.pathname === "/cart" ? "text-green-600 font-bold text-lg" : ""
              }`}
            >
              <Link onClick={tog} className="" to="/cart">
                Cart
              </Link>
            </li>
            {!localStorage.getItem("token") ? (
              <li  className={` ${
                location.pathname === "/login" ? "text-green-600 font-bold text-lg" : ""
              }`}>
                <Link onClick={tog}  className="" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <div className="flex flex-col gap-3">
                <Link onClick={tog}  className={` ${
                location.pathname === "/user/account" ? "text-green-600 font-bold text-lg" : ""
              }`} to="/user/account">
                  Profile
                </Link>

                <Link onClick={handlelogout} className="" to="/">
                  Logout
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
