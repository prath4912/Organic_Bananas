import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Fruitcontext from "../context/Fruitcontext";
import { useContext } from "react";
import { useEffect } from "react";
import wishsym from "../images/bookmark.png"
import cartsym from "../images/trolley.png"
import toast from "react-hot-toast";
import RemoveSym from "../images/delete.png"

function Product(props) {
  const [url, seturl] = useState(null);
  const a = useContext(Fruitcontext);

  useEffect(() => {
    if (props.image) {
      seturl(props.image);
    }
  }, []);

  return (
    <div className="my-3 mx-2 dp4 shadow shadow-blue-500/50 hover:scale-105 transition-all">
      <div className="">
        <div className=" card h-100">
          <Link to={`/fruits/${props.name}/${props.p_id}`}>
            <img
              src={url && url}
              height={"300px"}
              className="card-img-top hover:scale-105 transition-all"
              alt="Not Available"
            />
          </Link>

          <div className="card-body">
            <h5 className="text-center font-bold text-lg">{props.name}</h5>
            {props.desc && (
              <p className="card-text">
                {props.desc.slice(0, 10)}
                <small>
                  <a href="">read more</a>
                </small>
              </p>
            )}
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">
              Price : {props.amount}RS
            </small>
            <button
              onClick={() => {
                a.addcart(props.p_id);
                toast.success("Itam Added To Cart", {
                  duration: 1000,
                  iconTheme: {
                    primary: "#000",
                    secondary: "#fff",
                  },
                });
              }}
              className="btn btn-sm btn-warning border-black float-end active:scale-75 transition-all  "
            >
          Add To  <img className="inline mb-1" src={cartsym} width={"20px"} alt="" />
            </button>

            {props.title == "wishlist" ? (
              <button
                onClick={() => {
                  a.deletewishlist(props.p_id);
                  toast.success("Item Removed From WishList", {
                    duration: 1000,
                    iconTheme: {
                      primary: "#000",
                      secondary: "#fff",
                    },
                  });
                }}
                className="btn btn-sm btn-warning border-black float-end me-1 active:scale-75 transition-all  "
              >
                <img  width={"20px"} className="pb-1 " src={RemoveSym} alt="" />
              </button>
            ) : (
              <button
                onClick={() => {
                  a.addwishlist(props.p_id);
                  toast.success("Itam Added To WishList", {
                    duration: 1000,
                    iconTheme: {
                      primary: "#000",
                      secondary: "#fff",
                    },
                  });
                }}
                className="btn btn-sm btn-warning border-black float-end me-1 active:scale-75 transition-all "
              >
                <img className="pb-1" src={wishsym} width={"20px"} alt="" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
