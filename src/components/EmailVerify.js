import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import axios from "axios";
import Fruitcontext from "../context/Fruitcontext";
import Error from "../components/Error";
import Success from "./Success";

export default function EmailVerify() {
  const a = useContext(Fruitcontext);
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  var flag = true;

  const verifyEmailUrl = async () => {
    try {
      const url = `${a.BaseUrl}/api/auth/users/${param.id}/verify/${param.token}`;
      const { data } = await axios.get(url);
      setValidUrl(true);
    } catch (error) {
      setValidUrl(false);
    }
  };
  useEffect(() => {
    if (flag) {
      verifyEmailUrl();
      flag = false;
    }
  }, [param]);

  return (
    <div className="mt-40">
      <div className="flex flex-col items-center justify-center mb-20">
        <div className="rounded border-2 p-4 w-80 shadow-lg shadow-slate-900">
          {validUrl ? (
            <div className="">
              <Success message={"Email Verified"} />
              <Link
                className="bg-yellow-300 border-neutral-200 w-full rounded-md px-4 active:scale-90 transition-all border-2"
                to="/login"
              >
                Login
              </Link>
            </div>
          ) : (
            <div>
              <Error error={"Link Expired"} />
              <div className="my-3">
                <Link
                  className="bg-yellow-300 border-2 border-neutral-200 w-full rounded-md px-4 active:scale-90 transition-all "
                  to="/signup"
                >
                  Try Again
                </Link>
              </div>
            </div>
          )}
          <div className="mt-4 text-sm">
            Go Back To{" "}
            <p className="inline">
              <Link className="text-blue-500 underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
