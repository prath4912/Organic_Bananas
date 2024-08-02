import React, { useContext, useEffect, useState } from "react";
import Fruitcontext from "../context/Fruitcontext";
import SPcard from "./SPcard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function FeaturedProduct(props) {
  const a = useContext(Fruitcontext);

  const [category , setcategory]  = useState("fruit" );
  
  const[temp , settemp] = useState([]) ;




  useEffect(()=>{

  
    // console.log(a.fruits) ;
    if(props.title == "Featured Fruits")
      {
        if (a.fruits.length > 0) {
        } else {
          a.fetchfruits();
          
        }
        setcategory('fruit')
        settemp(a.fruits)

      }else
      {
        if (a.vegetable.length > 0) {
        } else {
          a.fetchvegetables();
        }
        setcategory('vegetable')
        console.log(a.vegetable)
        settemp(a.vegetable)

      }
  },[])
  


  return (
    <div>
      <div className="w-full  lg:w-10/12 lg:mx-auto bg-zinc-100 rounded p-0.5 lg:p-2 my-2">
        <Link
          to="/products"
          className="float-right pt-2 me-4 text-blue-400 underline hover:font-bold transition-all"
        >
          See More
        </Link>

        <h1 className="text-start text-2xl mt-3 font-bold my-2 ms-1 lg:ms-4">
          {props.title}
        </h1>
        <div className="flex whitespace-nowrap  overflow-auto  lg:w-full  lg:justify-start gap-1 lg:gap-2  ">
         {category=='fruit' ? a.fruits.map((product, index) => {
            if (index > 4 || product._id == props.id || product.category!=category) {
              return;
            }
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
          }) :
          a.vegetable.map((product, index) => {
            if (index > 4 || product._id == props.id || product.category!=category) {
              return;
            }
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
          })
        }
        </div>
      </div>
    </div>
  );
}
