import React, { useContext, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import Fruitcontext from "../context/Fruitcontext";
import profile from "../images/user.jpg";
import { MdOutlineStar } from "react-icons/md";
import ProgressBar from "@ramonak/react-progress-bar";
import SpinnerLoading from "./SpinnerLoading";

export default function StarRating(props) {
  const a = useContext(Fruitcontext);

  useEffect(() => {
    getReviews();
    let arr1 = [0, 0, 0, 0, 0];
    props.arr.forEach((ele) => {
      arr1[ele._id - 1] = ((ele.count / props.total_ratingCount) * 100).toFixed(0);
    });

    setrP(arr1);
  }, [props.id]);

  const [ratingPercentage, setrP] = useState([0, 0, 0, 0, 0]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewsMessage, setReviews] = useState([]);

  const getReviews = async () => {
    const result = await axios.post(
      `${a.BaseUrl}/api/review/getreview`,
      {
        product: props.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(result);
    setReviews(result.data.reviews);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleRating = (rate) => {
    setRating(rate);
  };

  const handle = async () => {
    console.log("in handle")
    a.setloading(true);
    const result = await axios.post(
      `${a.BaseUrl}/api/review/insert`,
      {
        review: rating,
        product: props.id,
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    a.setloading(false) ;
  };

  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  return (
    <div className="mx-4 ">
      {a.loading && <SpinnerLoading/> }
      <div className="demo w-full lg:p-8 flex rounded flex-wrap gap-3 justify-around">
        <div className="w-full px-0.5 lg:w-2/6">
          <div>
            <h1 className="font-bold lg:font-extrabold text-2xl ms-2 my-2">
              Ratings & Reviews
            </h1>
            <div className="flex justify-around items-center my-2">
              <div className="grow text-center">
                <p className="font-bold lg:font-extrabold text-3xl ">
                  {props.avgrating}
                </p>
                <Rating
                  size={15}
                  allowFraction
                  SVGstyle={{ display: "inline" }}
                  initialValue={props.avgrating}
                  readonly={true}
                />
                <p>{props.total_ratingCount} ratings</p>
              </div>
              <div className=" grow">
                {ratingPercentage.map((ele, index) => {
                  return (
                    <div className="flex items-center">
                      <p>{index + 1}</p> <MdOutlineStar className="mx-1" />{" "}
                      <ProgressBar className="grow" completed={ele} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <h1 className="font-bold lg:font-extrabold text-2xl ms-2 my-2">
            Review this Fruit
          </h1>

          <Rating
            onClick={handleRating}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
            size={50}
            transition
            showTooltip
            SVGstyle={{ display: "inline" }}
          />
          <br />
          <label htmlFor="message">Write a Review</label>
          <textarea
            className="block w-full border border-black my-2 rounded"
            onChange={handleMessage}
            value={message}
            name="message"
            id="message"
            rows="4"
          ></textarea>
          <button
            onClick={handle}
            class="border border-black p-1 rounded active:scale-90 transition-all "
          >
            Submit
          </button>
        </div>
        <div className="w-full lg:w-5/12">
          <h1 className="font-bold lg:font-extrabold text-2xl lg:ms-2 my-2">
            Reviews
          </h1>
          <div className="">
            {reviewsMessage &&
              reviewsMessage.length > 0 &&
              reviewsMessage.map((ele) => {
                const date = new Date(ele.createdAt);
                const formattedDate = date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                });
                return (
                  <div className="border-black border w-full lg:w-auto p-2 bg-stone-200 rounded my-1">
                    <div className=" ">
                      <img
                        className="rounded-full inline me-2"
                        src={profile}
                        width={"20px"}
                        alt=""
                      />
                      <p className="inline font-medium">{ele.user.name}</p>
                    </div>

                    <div>
                      <p className="text-sm">Reviewed on {formattedDate}</p>

                      <p className="font-medium lg:font-bold">{ele.message}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
