import React, { useContext, useState } from "react";
import axios from "axios";
import Fruitcontext from "../context/Fruitcontext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Error from "../components/Error";
import Modal from 'react-modal';
import Spinner from "../components/Spinner";
import Success from "../components/Success";

export default function Forgotpassword() {
  const [error, seterror] = useState(null);
  const [flag1, setflag] = useState(false);
  const param = useParams();
  const [password, setpass] = useState();

  const a = useContext(Fruitcontext);

  const handlepass = async (e) => {
    try {
        seterror(null) ;
        setflag(false) ;
        setIsOpen(true) ;
      e.preventDefault();
      const url = `${a.BaseUrl}/api/auth/users/${param.id}/forgot/${param.token}`;
      const response = await axios.post(url, {
        password: password,
      });

      setflag(true);
    } catch (error) {
      seterror(error.response.data.error);
    }finally{
        setIsOpen(false) ;

    }
  };
  const onchangehand = (e) => {
    setpass(e.target.value);
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
              <label className="block mb-1 text-sm font-medium" htmlFor="mail">
                Enter New paaword
              </label>
              <input
                className="border-2 border-neutral-400 w-full rounded ps-1 p-0.5"
                value={password}
                name="pasword"
                onChange={onchangehand}
                type="text"
                id="mail"
                required
                minLength={5}
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-300 border-neutral-200 w-full rounded-md px-4 active:scale-90 transition-all"
            >
              Change Password
            </button>
            {flag1 && (
              <div className="mt-4 text-sm">
                <Success message={"Password Changed Successfully"} />
                <div className="mt-1 text-sm">
                  Go Back To Login{" "}
                  <span>
                    <Link className="text-blue-500 underline" to="/login">
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            )}
            <Error error={error} />
          </div>
        </form>
      </div>
    </div>
  );
}
