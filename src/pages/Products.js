import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Fruitcontext from "../context/Fruitcontext";
import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";

function Products() {
  
  const a = useContext(Fruitcontext);
  const[ count ,setc] = useState(0) ;
  const [formdata , setfd] = useState({fruit : false , vegetable : false}) ;
  
  useEffect(() => {
    if (a.product_list.length > 0) {
    } else {
      a.fetchData();
    }
  }, [a.s1, a.fi1 , count]);

  const update = (ele) => {
    if (a.s1 === ele) {
    } else {
      a.sets1(ele);
      a.setpage(0);
      a.setproduct_list([]);
    }
  };
  const update1 = (ele) => {
    if (a.fi1 === ele) {
    } else {
      a.setfi1(ele);
      a.setpage(0);
      a.setproduct_list([]);
    }
  };

  
  const changeHandler = (event)=>{
   update1(event.target.value) ;
}
const changeHandler1 = (event)=>{
  // setc(count+1);
  const{name , checked  } = event.target ;
  setfd( prev=>{
    return{ ...prev , [name] : checked }
  }) ;
  const arr = a.category ;
  if(checked)
  {
    arr.push(name) ;
  }else
  {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === name) {
          arr.splice(i, 1);
      }
  }
  }
  a.setcat(arr) ;
  a.setpage(0);
  a.setproduct_list([]);
  setc(count+1) ;
}
  return (
    <div className="bgd1 dp1">
      <div className="dp2 container-fluid d-flex  ">
        <div
          style={{ minWidth: "200px" }}
          className="bg-dark me-1 text-light p-3"
        >
          <h3 className="">Filters</h3>
          <div>
            <h5 className="">Category</h5>
            <div className="ms-1" style={{ listStyle: "none" }}>
              <li>
                <input onChange={changeHandler1} name="fruit"  id="fruit" type="checkbox" checked={formdata.fruit} />{" "}
                <label htmlFor="fruit">Fruits</label>
              </li>
              <li>
                <input onChange={changeHandler1} name="vegetable" id="Vegetable" type="checkbox" checked={formdata.vegetable} />{" "}
                <label htmlFor="Vegetable">Vegetables</label>
              </li>
            </div>
          </div>

          <div className="my-3">
            <h5 className="">Price</h5>
            <div className="ms-1" style={{ listStyle: "none" }}>
              <li>
                <input value={50} onChange={changeHandler} id="price1" type="radio" name="ch1" />{" "}
                <label htmlFor="price1">Below 50</label>
              </li>
              <li>
                <input value={100} onChange={changeHandler} id="price2" type="radio" name="ch1" />{" "}
                <label htmlFor="price2">Below 100</label>
              </li>
              <li>
                <input value={200} onChange={changeHandler} id="price3" type="radio" name="ch1" />{" "}
                <label htmlFor="price3">Below 200</label>
              </li>
              <li>
                <input value={300} onChange={changeHandler} id="price4" type="radio" name="ch1" />{" "}
                <label htmlFor="price4">Below 300</label>
              </li>
              <li>
                <input value={10000000} onChange={changeHandler} id="price5" type="radio" name="ch1" />{" "}
                <label htmlFor="price5">All Items</label>
              </li>
            </div>
          </div>
        </div>
        <div className="w-100">
          <div className="w-100 d-flex dp21 bg-dark of ">
            <h1 className="w-100 ">Products <p className="p-0 m-0 small  " style={{display:"inline",fontSize:"1rem"}}>(showing 1-{a.product_list.length} items of {a.total_fruits})</p></h1>
            <div className="dropdown dn of">
              <button
                className="btn btn-secondary dropdown-toggle mt-2 me-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort By
              </button>

              <ul className="dropdown-menu">
                <li
                  onClick={() => {
                    update("amount");
                  }}
                >
                  <a className="dropdown-item" href="#">
                    Price(Lowest)
                  </a>
                </li>
                <li
                  onClick={() => {
                    update("-amount");
                  }}
                >
                  <a className="dropdown-item" href="#">
                    Price(Highest)
                  </a>
                </li>
                <li
                  onClick={() => {
                    update("name");
                  }}
                >
                  <a className="dropdown-item" href="#">
                    A-Z
                  </a>
                </li>
                <li
                  onClick={() => {
                    update("-name");
                  }}
                >
                  <a className="dropdown-item" href="#">
                    Z-A
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown dn">

      

            
            </div>
          </div>
          <div>
            <InfiniteScroll
              dataLength={a.product_list.length} //This is important field to render the next data
              next={a.fetchData}
              hasMore={a.product_list.length < a.total_fruits}
              loader={<Spinner />}
              endMessage={
                
                  <p className="m-0 p-0 text-center fw-bold mt-2 p-3 bg-dark text-light">
                    You are done with all Products!!
                  </p>
              
              }
            >
              <div className="mad">
                <div className="d-flex flex-wrap justify-content-start gap-4">
                  {a.product_list.map((product, index) => {
                    return (
                      <Product
                        key={index}
                        p_id={product._id}
                        name={product.name}
                        desc={product.desc}
                        amount={product.amount}
                        image = {product.image}
                      />
                    );
                  })}
                </div>
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
