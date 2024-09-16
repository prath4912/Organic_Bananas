import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import Fruitcontext from "../context/Fruitcontext";
import Error from "../components/Error";
import Modal from 'react-modal';
import Spinner from "../components/Spinner";

const Login = (props) => {
  const a = useContext(Fruitcontext);
  const[error , seterror] = useState(null) ;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [modalIsOpen, setIsOpen] = useState(false);

  let history = useHistory();

  const handlelogin = async (e) => {
    e.preventDefault();
    setIsOpen(true) ;
    try{

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
      a.getuserdata();
      history.push("/home");
    } else {
      seterror(json.error);
    }
}catch(error)
{
    seterror(error.response.data.error) ;
}finally{
    setIsOpen(false) ;
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
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  return (
    <div className=" pt-40">
             <Modal
        isOpen={modalIsOpen}
        style={customStyles}
      >
        <div className="">
         <Spinner/>
        </div>
        
      </Modal>
    <div className="flex flex-col items-center justify-center mb-20 ">
      <form onSubmit={handlelogin}>
          <div className="rounded border-2 p-4 w-80 shadow-lg shadow-slate-900">
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
            <button type="submit" className="bg-yellow-300 border-neutral-200 w-full rounded-md  border-2  px-4">
              Continue
            </button>
            <small className="" >By continuing, you agree to Conditions of Use and Privacy Notice.</small>
            </div>
            <div className="mt-4 text-sm">
            New To Organic Bananas?
            <p>
              <Link className="text-blue-500 underline" to="/signup"> Create an Account</Link>
            </p>
          </div>
          <div className="text-sm">
            <p>
              <Link className="text-blue-500 underline" to="/forgotpassword">Forgot Password</Link>
            </p>
          </div>
          </div>
         
      </form>
     
      <Error error={error}/>
    </div>
    </div>
  );
};

export default Login;
