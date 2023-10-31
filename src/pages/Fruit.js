import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ob1 from "../images/ORGABIC.png"
import Fruitcontext from "../context/Fruitcontext";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import toast from 'react-hot-toast';


export default function Fruit() {
    const a = useContext(Fruitcontext);
    const param = useParams();
    var index= 0 ;
    a.product_list.forEach( (ele ,in1)=>{
        if(ele.name==param.name)
        {
             index = in1;
        }
    }) ;

  return (
    <div className="dd1">
      <div className="bg-dark text-light container">
        <div className="d-flex justify-content-center align-items-center"> 
          <div className="my-3 mx-2 dp4">
            <div className="">
              <div className=" card h-100">
                <Link to={`/fruits/${param.name}`}>
                  <img
                    src={ob1}
                    height={"300px"}
                    className="card-img-top"
                    alt="..."
                  />
                </Link>

                <div className="card-body">
                  <h5 className="card-title">{param.name}</h5>
                  <p className="card-text">
                    {a.product_list[index].desc.slice(0, 10)}{" "}
                    <small>
                      <a href="">read more</a>
                    </small>{" "}
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Price : {a.product_list[index].amount}RS
                  </small>
                  <button
                    onClick={() => {
                      a.addcart(a.product_list[index]._id);
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
                      a.addwishlist(a.product_list._id);
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
