import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Fruitcontext from "../context/Fruitcontext";
import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";

function Products() {
  const a = useContext(Fruitcontext);


  useEffect(() => {
    if (a.product_list.length > 0) {
    } else {
      a.fetchData();
    }
  }, [ a.s1, a.pricefilter,a.category ]);

  // const update = (ele) => {
  //   if (a.s1 === ele) {
  //   } else {
  //     a.sets1(ele);
  //     a.setpage(0);
  //     a.setproduct_list([]);
  //   }
  // };

  const priceFilterchangeHandler = (event) => {
    const ele = event.target.value;
    if (a.fi1 === ele) {
    } else {
      a.setpricefilter(ele);
      a.setpage(0);
      a.setproduct_list([]);
    }
  };

  const categoryChangeHandler = (event) => {
    const { name, checked } = event.target;

    a.setformdata( { ...a.formdata, [name]: checked } );

    // console.log(formdata) ;

    const arr = checked
    ? [...a.category, name] 
    : a.category.filter((cat) => cat !== name);

    a.setCategory(arr);
    a.setpage(0);
    a.setproduct_list([]);
  };

  return (
    <div className="pt-28 lg:pt-40  bg-zinc-100">
      
      <div className="flex  ">
        <div
          style={{ minWidth: "200px" }}
          className="bg-zinc-800 text-white me-1  p-3 rounded hidden lg:block "
        >
          <h3 className="text-lg font-bold">Filters</h3>
          <div>
            <h5 className="">Category</h5>
            <ul className="ms-1 mt-2">
              <li className="flex">
                <input
                  onChange={categoryChangeHandler}
                  name="fruit"
                  id="fruit"
                  type="checkbox"
                  checked={a.formdata.fruit}
                />
                <label className="ms-2" htmlFor="fruit">
                  Fruits
                </label>
              </li>
              <li className="flex">
                <input
                  className="p-0 m-0"
                  onChange={categoryChangeHandler}
                  name="vegetable"
                  id="Vegetable"
                  type="checkbox"
                  checked={a.formdata.vegetable}
                />
                <label className="ms-2 " htmlFor="Vegetable">
                  Vegetables
                </label>
              </li>
            </ul>
          </div>

          <div className="my-3">
            <h5 className="">Price</h5>
            <ul className="ms-1 mt-2">
              <li className="flex ">
                <input
                  value={50}
                  onChange={priceFilterchangeHandler}
                  id="price1"
                  type="radio"
                  name="ch1"
                  checked={a.pricefilter == 50}

                />
                <label className="ms-1" htmlFor="price1">
                  Below 50
                </label>
              </li>
              <li className="flex my-2">
                <input
                  value={100}
                  onChange={priceFilterchangeHandler}
                  id="price2"
                  type="radio"
                  name="ch1"
                  checked={a.pricefilter == 100}

                />
                <label className="ms-1" htmlFor="price2">
                  Below 100
                </label>
              </li>
              <li className="flex my-2">
                <input
                  value={200}
                  onChange={priceFilterchangeHandler}
                  id="price3"
                  type="radio"
                  name="ch1"
                  checked={a.pricefilter == 200}

                />
                <label className="ms-1" htmlFor="price3">
                  Below 200
                </label>
              </li>
              <li className="flex my-2">
                <input
                  value={300}
                  onChange={priceFilterchangeHandler}
                  id="price4"
                  type="radio"
                  name="ch1"
                  checked={a.pricefilter == 300}

                />
                <label className="ms-1" htmlFor="price4">
                  Below 300
                </label>
              </li>
              <li className="flex my-2">
                <input
                  value={10000000}
                  onChange={priceFilterchangeHandler}
                  id="price5"
                  type="radio"
                  name="ch1"
                  checked={a.pricefilter == 10000000}

                />
                <label className="ms-1" htmlFor="price5">
                  All Items
                </label>
              </li>
            </ul>
          </div>
          {/* <div>
            <h5 className="">Availability</h5>
            <ul className="ms-1 mt-2">
              <li className="flex">
                <input
                  name=""
                  id=""
                  type="checkbox"
                  checked={false}
                />
                <label className="ms-2" htmlFor="">Include Out Of Stock</label>
              </li>
             
            </ul>
          </div> */}
        </div>

        <div className="text-white grow">

          <div className="flex justify-between items-center px-2  bg-zinc-800  ">
            <h1 className=" text-2xl  font-bold p-2 ">
              Fresh Fruits
              <p className="text-xs lg:inline  lg:ms-2">
                (showing 1-{a.product_list.length} items of {a.total_fruits})
              </p>
            </h1>
            {/* <div className="float-right  inline text-black">
              <select
                className="rounded"
              >
                <option value="inline">Sort By</option>
                <option onClick={() => {
                    update("amount");
                  }}  value="">Price(Lowest)</option>
                   <option onClick={() => {
                    update("-amount");
                  }}  value="">Price(Highest)</option>
                   <option  onClick={() => {
                    update("name");
                  }}
                    value="">A-z</option>
                   <option onClick={() => {
                    update("-name");
                  }}value="">Z-A</option>
              </select>

             
            </div> */}
          </div>
          {a.loading && <Spinner/>}

          <div>
            <InfiniteScroll
              dataLength={a.product_list.length} //This is important field to render the next data
              next={a.fetchData}
              hasMore={a.product_list.length < a.total_fruits}
              loader={<Spinner />}
              endMessage={
                <p className="text-center font-bold mt-2 p-3 bg-zinc-800 text-white">
                  You are done with all Products!!
                </p>
              }
            >
              <div className="">
                <div className="flex flex-wrap justify-around lg:justify-start ">
                  {a.product_list.map((product, index) => {
                    return (
                      <Product
                        key={index}
                        p_id={product._id}
                        name={product.name}
                        desc={""}
                        amount={product.amount}
                        image={product.image[0]}
                      />
                    );
                  })}
                </div>
              </div>
              {/* <div className="block lg:hidden">
                <div className="flex flex-wrap justify-around lg:justify-start ">
                  {a.product_list.map((product, index) => {
                    return (
                      <SPcard
                        key={index}
                        p_id={product._id}
                        name={product.name}
                        desc={""}
                        amount={product.amount}
                        image={product.image[0]}
                      />
                    );
                  })}
                </div>
              </div> */}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
