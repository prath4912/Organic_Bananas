import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Fruitcontext from "../context/Fruitcontext";
import { useContext } from "react";
import Error from "../components/Error";
import Modal from 'react-modal';
import Spinner from "../components/Spinner";
import Success from "../components/Success";

function Signup() {
  const a = useContext(Fruitcontext);
  const[error , seterror] = useState(null) ;
  const[message , setmessage] = useState(null) ;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlesignup = async (e) => {
    setIsOpen(true) ;
    setmessage(null) ;
    seterror(null) ;
        e.preventDefault();
    try{
    const url = `${a.BaseUrl}/api/auth/createuser`;
    const data = await axios.post(
      url,
      {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json =  data.data;
    if (json.success) {
        setmessage("Verify Link is sent to your email. Please Verify.")
    } else {
      seterror("Invalid credentials");
    }
}catch(error)
{
    seterror(error.response.data.error) ;
}finally{
    setIsOpen(false) ;
}
  };

  const onChange1 = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
  
  const [modalIsOpen, setIsOpen] = useState(false);

  
  return (
    <div className="mt-40">
              <Modal
        isOpen={modalIsOpen}
        // onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="">
         <Spinner/>
        </div>
        
      </Modal>
      <div className="flex flex-col items-center justify-center mb-20  ">
        <form onSubmit={handlesignup} className="">
          <div className="rounded border-2 p-4 w-80 shadow-lg shadow-slate-900">
           
              <h3 className="font-bold text-2xl my-2">Sign Up</h3>
              <div className="mb-3">
              <label htmlFor="name" className="block mb-1 text-sm font-medium">Enter First Name</label>
                <input
                  type="text"
                  className="border-2 border-neutral-400 w-full rounded ps-1 p-0.5"
                  id="name"
                  onChange={onChange1}
                  value={credentials.name}
                  name="name"
                  placeholder="name"
                  required
                  minLength={3}
                />
              </div>
             
              <div className="mb-3">
              <label className="block mb-1 text-sm font-medium" htmlFor="email">Enter Email</label>

                <input
                  type="email"
                  className="border-2 border-neutral-400 w-full rounded ps-1 p-0.5"
                  id="email"
                  onChange={onChange1}
                  value={credentials.email}
                  name="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="mb-3">
              <label className="block mb-1 text-sm font-medium" htmlFor="password">Enter Password</label>

                <input
                  type="password"
                  className="border-2 border-neutral-400 w-full rounded ps-1 p-0.5"
                  id="pasword"
                  onChange={onChange1}
                  value={credentials.password}
                  name="password"
                  placeholder=""
                  required
                  minLength={5}
                />
              </div>
            

              <button type="submit" className=" bg-yellow-300 border-neutral-200 w-full rounded-md  border-2  px-4">
                Verify Email
              </button>
              <small className="" >By continuing, you agree to Conditions of Use and Privacy Notice.</small>

              <Success message = {message}/>

              <div className="mt-4 text-sm">
              Exiting User{" "}
              <p>
                <Link className="text-blue-500 underline"  to="/login">Login</Link>
              </p>
            </div>
            
            </div>

           
        </form>
       <Error error={error} />
      </div>
    </div>
  );
}

export default Signup;
