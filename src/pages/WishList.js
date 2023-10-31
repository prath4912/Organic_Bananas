import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Fruitcontext from "../context/Fruitcontext";
import { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function Products() {

  const a = useContext(Fruitcontext);
  useEffect(() => {
      a.fetchData1();
  }, []) ;

  
 
  return (
    <div className="bgd1 dp1">
      <div className="dp2 container-fluid d-flex  ">
        <div className="w-100">
          <div className="w-100 d-flex dp21 bg-dark of ">
            <h1 className="w-100 ">WishList <p className="p-0 m-0 small  " style={{display:"inline",fontSize:"1rem"}}>(showing 1-{a.wishlist.length} items of {a.total_fruits})</p></h1>
          </div>
          {a.wishlist.length>0 ? <div>
            
              <div className="mad">
                <div className="d-flex flex-wrap justify-content-start gap-4">
                  {a.wishlist.map((element, index) => {
                    console.log(element);
                    return (
                      <Product
                        key={index}
                        p_id={element.product._id}
                        name={element.product.name}
                        desc={element.product.desc}
                        amount={element.product.amount}
                        title = {"wishlist"}
                       
                      />
                    );
                  })}
                </div>
              </div>
          </div>:
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
          }
          
        </div>
      </div>
    </div>
  );
}

export default Products;
