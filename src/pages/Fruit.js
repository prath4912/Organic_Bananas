import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fruitcontext from "../context/Fruitcontext";
import axios from "axios";
import StarRating from "../components/StarRating";
import { Rating } from 'react-simple-star-rating'
import Advantages from "../components/Advantages";
import SimillarProducts from "../components/SimillarProducts";


export default function Fruit() {
  const { id } = useParams();
  const [item, setitem] = useState(null);
  const [quantity ,setq] = useState(1); 
  const a = useContext(Fruitcontext);
  const [dis , setdis] = useState("");
  const [img,setimg] = useState(null) ;
  const [avgrating, setavgRating] = useState(0) ;
  const [total_ratingCount , settrc] = useState(0) ;
  const [arr ,setarr] = useState([]) ;

  const getFruit = async () => {
    const url = `${a.BaseUrl}/api/product/get`;
    const response = await axios.post(
      url,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setitem(response.data.Fruit1);
    
    setimg(response.data.Fruit1.image[0]) ;

  };

  useEffect(() => {
    setq(1) ;
    getFruit();
    getRating() ;

  }, []);

  
  const getRating = async()=>{
    const result = await axios.post(`${a.BaseUrl}/api/review/totalrating` ,{
      product : id , 
      },{
              headers: {
                'Content-Type': 'application/json' ,
              }}) ;
              setavgRating(result.data.rating) ;
              settrc(result.data.total_count) ;
              setarr(result.data.arr) ;
  }

  return (
    <div className="pt-32  bg-white border-2 border-black">

      {item && (  <div className=" bg-white my-2 py-4">
        <div className="flex justify-center">
            <div className=" ">
            {item.image.map((ele)=>{
              return <img onClick={()=>setimg(ele)} className="border-stone-300 my-0.5 border-2 border-collapse" width={"80px"} src={ele} ></img>
            })}
            </div>
            <div>
            <img
              src={img}
              className="w-96  border-stone-400 border-2 ms-2"
              alt="..."
            />
            </div >
            <div className="mx-8 p-2 w-80  ">
              <h1 className="text-3xl font-bold mb-2" >{item.name}</h1>
              <div className="flex gap-1  " >
                <p className="mt-0.5" >{avgrating}</p>
                  <Rating          
                    size={15}
                    allowFraction
                    SVGstyle={ { 'display':'inline' } }
                    initialValue = {avgrating}
                    readonly ={true}
                  />
                  <p className="text-sm mt-1" >{total_ratingCount} ratings</p>
            </div>
              <p className="text line-through" >MRP - &#8377; {item.amount}</p>
              <p className="font-bold" >Price-  &#8377; {item.amount*0.9} <small className="text-xs font-normal" >(&#8377;5.334/1gm)</small> </p>
              <p className="text-xs">You Save - 10%  OFF</p>
              <p className=" text-xs">(inclusive of all taxes)</p>
              <div className="my-2">
                <h4 className="font-semibold mb-1">Size</h4>
        
                <select className="p-1 border-2 border-black" name="" id="">
                  <option value="">500gm- 900gm</option>
                  <option value="">1000gm- 1500gm</option>
                </select>
              </div>
              <p className="text-sm mt-2" >Units</p>
              <div className="flex flex-row gap-2 mb-2">
                  <div className="flex border-collapse" >
                <span onClick={()=>setq(quantity+1)} className="border-black border-2 px-2 cursor-pointer select-none " >&#43;	</span ><span  className="border-black border-2 px-2 " >{quantity}</span><span onClick={()=>{if(quantity>1)setq(quantity-1)}}  className="border-black border-2 px-2 cursor-pointer select-none  " >&#8722;</span>
                </div>
                <button className="btn  bg-yellow-800 text-white hover:text-black hover:bg-yellow-500 active:scale-75 transition-all w-48" >Add To Cart</button>

              </div>
              <button className="btn bg-yellow-500 hover:bg-yellow-800 hover:text-white active:scale-75 transition-all w-full">&#9829;	 Add To Wishlist</button>

              
            </div>
        </div>
        <div className="mt-2 flex justify-center gap-3">
            <h4 onClick={()=>{setdis("desc")}} className="font-bold " >Description</h4>
            <h4 onClick={()=>{setdis("review")}} className="font-bold">Storage Tips</h4>
            <h4 onClick={()=>{setdis("storage")}} className="font-bold " >Reviews</h4>
        </div>
        <div className="">
          <p className="mx-auto w-3/4 my-2">{item[dis]}</p>
        </div>
        <StarRating id={item._id} avgrating = {avgrating} total_ratingCount = {total_ratingCount} arr = {arr} />
      </div>
      )}
            <Advantages/>

      <SimillarProducts/>
    </div>
  );
}
