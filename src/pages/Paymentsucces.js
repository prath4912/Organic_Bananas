import React from "react";
import useQuery from "../hooks/useQuery";

export default function Paymentsucces() {
  const query = useQuery();
  const ref = query.get("referance");
  return (
    <div className="mt-40">
      <div className="text-center border-2 shadow-lg shadow-black mx-32 mb-10 p-2">
        <h3 className="font-bold text-2xl">Order Completed </h3>
        <p className="p-3 text-dark fw-bold ">Payment ID : {ref}</p>
      </div>
    </div>
  );
}
