import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Fruitcontext from "../context/Fruitcontext";
import { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SpinnerLoading from "../components/SpinnerLoading";

function Products() {
  const a = useContext(Fruitcontext);
  useEffect(() => {
    a.fetchData1();
  }, []);

  return (
    <div className="pt-28 lg:pt-40 ">
      {a.loading && <SpinnerLoading />}
      <div className="  ">
        <div className="w-100">
          <div className="bg-black py-3 text-white">
            <h1 className="text-2xl font-bold ms-2">WishList</h1>
          </div>
          {a.wishlist.length > 0 ? (
            <div className="flex flex-wrap justify-center lg:justify-start gap-2  ">
              {a.wishlist.map((element, index) => {
                console.log(element);
                return (
                  <Product
                    key={index}
                    p_id={element.product._id}
                    name={element.product.name}
                    // desc={element.product.desc}
                    amount={element.product.amount}
                    title={"wishlist"}
                    image={element.product.image[0]}
                  />
                );
              })}
            </div>
          ) : (
            <div className="m-5" style={{ color: "white" }}>
              <div className="m-5 d-flex justify-content-center align-items-center">
                <Link
                  to="/products"
                  type="button"
                  className="border-white text-center btn btn-warning "
                >
                  Add Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
