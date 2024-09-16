import React from "react";
import spin from "../images/spin.gif";

export default function SpinnerLoading() {
  return (
    <div className="fixed top-0 w-screen h-screen text-center flex justify-center items-center bg-opacity-90 bg-slate-100 z-50 ">
      <img src={spin} alt="" className=" w-10 h-10" />
    </div>
  );
}
