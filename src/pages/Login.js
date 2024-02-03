import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import Fruitcontext from "../context/Fruitcontext";

const Login = (props) => {
  const a = useContext(Fruitcontext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useHistory();

  const handlelogin = async (e) => {
    e.preventDefault();
    

    const data = await axios.post(
      `${a.BaseUrl}/api/auth/login`,
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      console.log("r") ;
    console.log(data) ;
    const json = await data.data;
   if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.setcount(props.count + 1);
      history.push("/home");
    } else {
      alert(json.error);
    }
  };

  const onChange1 = (e) => {
    const temp = {
      email: e.target.value,
      password: credentials.password,
    };
    setCredentials(temp);
  };
  const onChange2 = (e) => {
    const temp = {
      email: credentials.email,
      password: e.target.value,
    };

    setCredentials(temp);
  };
  return (
    <div className="flex justify-center pt-40 mb-20 ">
      <form onSubmit={handlelogin}>
          <div className="rounded border-2 p-4 w-72 shadow-lg shadow-slate-900">
            <h3 className="font-bold text-2xl my-2" >Log In</h3>
            <div className="mb-3  ">
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email address
              </label>
              <input
                type="email"
                onChange={onChange1}
                className="border-2 border-neutral-400 w-full rounded ps-1 p-0.5 "
                id="email"
                name="email"
                required
              />
             
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block mb-1 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                onChange={onChange2}
                className="border-2 border-neutral-400 w-full rounded ps-1 p-0.5"
                id="password"
                name="password"
                minLength={5}
                required
              />
            </div>
            <div className="">
            <button type="submit" className="bg-yellow-300 border-neutral-600 rounded-md  border-2  px-4">
              Continue
            </button>
            </div>
            <div className="mt-4 text-sm">
            New To Organic Bananas?
            <p>
              <Link className="text-blue-500 underline" to="/signup"> Create an Acoount</Link>
            </p>
          </div>
          <div className="text-sm">
            <p>
              <Link className="text-blue-500 underline" to="/forgotpassword">Forgot Password</Link>
            </p>
          </div>
          </div>
         
      </form>
    </div>
  );
};

export default Login;
