import React from "react";
import ship from "../images/ship.png";
import ftoc from "../images/ftoc2.png";
import as from "../images/as.jpg";
import fresh from "../images/fresh.jpg";
import org from "../images/org.png";
import Map from "./Map";
import Plant from "../images/bananaplant.webp";

export default function Home() {
  const arr = [
    { img: ftoc, title: "Farmers to customer" },
    { img: as, title: "Affordable Price & Safety" },
    { img: fresh, title: "Quality Fresh Products" },
    { img: org, title: "Organic & chemical Free" },
    { img: ship, title: "Free Shipping" },
  ];
  return (
    <div className="bg-stone-200  ">
      <div className="  ">
        <h1 className="text-center bg-stone-500 text-5xl py-4 text-white font-bold">
          We Offer
        </h1>
        <div className=" flex flex-wrap justify-center gap-1 lg:gap-3  bg-opacity-90 py-4   bg-gray-200 ">
          {arr.map((element, index) => {
            return (
              <div
                key={index}
                className="bg-white w-44 rounded overflow-hidden shadow-lg border border-black hover:scale-105   transition-all"
              >
                <div className="w-36 mx-auto p-1 h-44 " >
                <img src={element.img} className=" overflow-hidden  hover:scale-105 transition-all" alt="image" /></div>
                <div className="p-2 my-2">
                  <h5 className="text-center hover:font-bold transition-all">{element.title}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex flex-wrap-reverse lg:flex-none  lg:mx-4 bg-white my-4">
          <div className="lg:w-1/2	 p-1">
            <h1 className="text-center font-bold text-6xl py-2">About Us</h1>
            <p className="lg:px-4 mt-2  lg:text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed quisquam obcaecati corrupti officia autem esse? Explicabo necessitatibus doloremque ullam laudantium distinctio quisquam pariatur, sed inventore ipsa assumenda nesciunt odio similique nihil sequi quibusdam vel. Molestiae reiciendis quae quo, qui libero, blanditiis facere quos officiis cum illo saepe ullam unde quas non, rem dolore. Eaque earum atque accusamus illum dolores eligendi praesentium maxime vel fugit iure laborum deleniti aut rerum tempora eos libero, beatae laudantium rem mollitia iste nobis doloremque voluptatibus commodi officia. Nisi officia consectetur dolores adipisci nobis eveniet, in at inventore nam soluta expedita dolorum dolorem repellat asperiores explicabo rerum repellendus tempora earum saepe. Quos perferendis reiciendis numquam reprehenderit voluptatem dolorum rem minima repellendus tenetur facilis. Voluptas asperiores maiores, temporibus aspernatur tempore porro distinctio aliquam qui sed eius facilis sit ipsam officia aut quam accusamus. Perferendis, modi iure eius, sit asperiores, neque a voluptate ratione fugit eos dolore! Delectus, nulla! In harum illum voluptas et totam odit voluptate doloribus voluptatum minima aliquid esse accusamus, eligendi enim a repellat dolores, reiciendis pariatur. Laboriosam dolores cupiditate iusto obcaecati dolorum dolore assumenda esse ullam necessitatibus rem. Laboriosam commodi officiis cumque dolorum optio, placeat, eaque minus adipisci magni perferendis, et labore consectetur vitae.</p>
          </div>
          <div className="w-1/2 m-auto">
          <img className="  mt-3 lg:w-2/5 m-auto hover:scale-125 transition-all" src={Plant} alt="" />
          </div>
        </div>
      </div>
      <Map />
      {!localStorage.getItem("token") ? (
        <div
          className=" pt-4 pb-2 "
        >
          <div className="flex flex-row  justify-around">
            <div>
              <h3>Sign Up For News Letter</h3>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
            </div>
            <div className="pt-2">
              <input
                className="p-2 px-5"
                placeholder="Enter Email"
                type="email"
                name="mail"
                id="mail"
              />
              <button className="bg-warning p-2 px-5">Sign Up</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
