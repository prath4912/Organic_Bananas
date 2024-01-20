import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ob1 from "../images/ORGABIC.png"
import Fruitcontext from "../context/Fruitcontext";
import toast from 'react-hot-toast';
import axios from "axios";



export default function Fruit() {
    const {name, id} = useParams();
    const [item , setitem] = useState(null) ;
   const a = useContext(Fruitcontext); 
    const getFruit = async()=>{
      const url = `${a.BaseUrl}/api/product/get` ;
      const response = await axios.post(url , {id} , {
        headers : {
          'Content-Type': 'application/json' ,
        }
      }) ;
      console.log(response.data.Fruit1) ;
      setitem(response.data.Fruit1) ;
    }

    useEffect(()=>{
      getFruit() ;
    },[]) ;

  return (
    <div className="dd1">
      <div className="bg-dark text-light container">
        <div className=""> 
          <div className="my-3 mx-2 ">
           {item && <div className="d-flex">
            <div> 
              <img
                    src={item.image ? item.image : ob1}
                    className="w-25"
                    alt="..."
                  /></div>
              <div className="bg-light text-dark w-100 ">
                <div className="w-100">
                  <h5 className="">{item.name}</h5>
                  {item.desc && <p className="card-text">
                    { item.desc.slice(0, 10)}{" "}
                    <small>
                      <a href="">read more</a>
                    </small>{" "}
                  </p>}
                </div>
                <div className="">
                  <small className="text-body-secondary">
                    Price : {item.amount}RS
                  </small>
                  <button
                    onClick={() => {
                      a.addcart(item._id);
                      toast.success("Itam Added To Cart", {
                        duration: 1000,
                        iconTheme: {
                          primary: "#000",
                          secondary: "#fff",
                        },
                      });
                    }}
                    className="btn btn-sm btn-warning border-black float-end "
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => {
                      a.addwishlist(item._id);
                      toast.success("Itam Added To WishList", {
                        duration: 1000,
                        iconTheme: {
                          primary: "#000",
                          secondary: "#fff",
                        },
                      });
                    }}
                    className="btn btn-sm btn-warning border-black float-end me-1 "
                  >
                    +
                  </button>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
