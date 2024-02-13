import React, { useContext, useState } from "react";
import axios from "axios";
import Fruitcontext from "../context/Fruitcontext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Error from "../components/Error"
import Modal from 'react-modal';
import Spinner from "../components/Spinner";
import Success from "../components/Success";

export default function Forgotpassword() {
const [modalIsOpen, setIsOpen] = useState(false);
  const [flag1, setflag] = useState(false);
  const [email, setemail] = useState();
  const a = useContext(Fruitcontext);
const [message,setmessage] = useState(null) ;
const [error,seterror] = useState(null) ;


  const handlepass = async (e) => {
    setIsOpen(true);
    e.preventDefault();
    const url = `${a.BaseUrl}/api/auth/forgot`;
    try {
      const response = await axios.post(url, {
        email: email,
      });
      console.log("er") ;

      console.log(response) ;
      console.log("er") ;
      if (response.status == 200) {
        setflag(true);
        setmessage("Password Resent Link Sent to your email")
      }else {
        seterror(response.data.error)
      }
    } catch (error) {
      seterror(error.response.data.error)
    }finally{
        setIsOpen(false);

    }
  };

  const onchand = (e) => {
    setmessage(null) ;
    seterror(null); 
    setemail(e.target.value);
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
  

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="mt-40">
          <Modal
        isOpen={modalIsOpen}
        style={customStyles}
      >
        <div className="">
         <Spinner/>
        </div>
        
      </Modal>
      <div className="flex flex-col items-center justify-center mb-20">
        <form onSubmit={handlepass} action="">
          <div className="rounded border-2 p-4 w-80 shadow-lg shadow-slate-900">
            <div className="mb-3">
              <label className="block mb-1 text-sm font-medium " htmlFor="mail">
                Enter mail
              </label>
              <input
                className="border-2 border-neutral-400 w-full rounded ps-1 p-0.5"
                value={email}
                onChange={onchand}
                type="text"
                id="mail"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-300 border-neutral-200 w-full rounded-md px-4 active:scale-90 transition-all"
            >
              Change Password
            </button>
            {/* {flag1 ? (
              <div className="shadow-md shadow-green-400 my-4 p-2 flex items-center border-2 ">
                <div className="me-2">
                  <img src={check} width={30} alt="" />
                </div>{" "}
                Password Resent Link Sent to your email{" "}
              </div>
            ) : (
              <p> </p>
            )} */}
            <Success message={message} />
          </div>
        </form>
        <div className=" mt-4 text-sm">
          Go Back To Login{" "}
          <span>
            <Link className="text-blue-500 underline" to="/login">
              Login
            </Link>
          </span>
        </div>
        <Error error={error} />
      </div>
      <div>
     
      </div>
    </div>
  );
}
