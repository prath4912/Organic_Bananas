import React from "react";
import Plant from "../images/bananaplant.webp";

export default function About() {
  return (
    <div>
      <div className="flex flex-wrap-reverse lg:flex-none  lg:mx-4 bg-white my-4">
        <div className="lg:w-1/2	 p-1">
          <h1 className="text-center font-bold text-6xl py-2">About Us</h1>
          <p className="lg:px-4 mt-2  lg:text-center">
            Organic Bananas is India's fastest growing online Vegitable and
            Fruit store.With over 200+ products and you will find everything you
            are looking for.right from Fresh Fruits and Vegitabls to Seasoning
            and Exotic Fruits and Vegetables-we have it all. Choose from a wide
            range of options in every category, exclusively handpicked to help
            you find the best quality available at the lowest prices. Select a
            date slot for delivery and your order will be delivered right to
            your doorstep, anywhere in Pune. You can pay online using your debit
            / credit card / UPI or by cash on delivery.​ We guarantee on time
            delivery, and the best quality with lowest price! We are a trusted
            name worldwide. We source Fresh Fruits and vegetable’s from the
            trusted farmers and suppliers of the agricultural domain and deliver
            the same to our clients. Their reasonable prices have also made them
            a leading choice of many in the market. Our company works as a
            trustworthy trader in the market. We have made it our top priority
            to meet the requirements of our clients with speed. For this, we
            maintain an adequate stock of Fruits and vegetables in our warehouse
            and ship these in a timely manner from the unit. We plan to keep
            performing in the same manner to remain the favorite of our clients
            forever. We are also inspired to constantly attain maximum
            customers' satisfaction.
          </p>
        </div>
        <div className="w-1/2 m-auto">
          <img
            className="  mt-3 lg:w-2/5 m-auto lg:hover:scale-125 transition-all"
            src={Plant}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
