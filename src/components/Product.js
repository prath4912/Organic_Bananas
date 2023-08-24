import React, { useState } from 'react'
import ob1 from "../images/ORGABIC.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Fruitcontext from '../context/Fruitcontext'
import { useContext } from 'react';
import { useEffect } from 'react';
import { ref , getDownloadURL } from 'firebase/storage';
import storage from '../Firebase';
import toast from 'react-hot-toast';


function Product(props) {
  const [url , seturl] = useState(null) ;
  const a = useContext(Fruitcontext) ;

  
  const fun1 = async()=>{

const starsRef = ref(storage, `images/${props.name}`);

try{
// const url = await getDownloadURL(starsRef) ;
    // seturl(url) ;

} catch(error){
    alert(error) ;
  };
  
  }
  useEffect(()=>{
    fun1() ;
  },[]) ;


  return (
    <div className='my-3 mx-2 dp4'>
      <div className="">
    <div className=" card h-100">
  
      <Link to={`/${props.name}`} ><img src={url ? url : ob1} height={"300px"} className="card-img-top" alt="..."  /></Link>

      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.desc.slice(0,10)} <small><a href="">read more</a></small> </p>
      </div>
      <div className="card-footer">
        <small className="text-body-secondary">Price : {props.amount}RS</small>
        <button onClick={()=> {a.addcart(props.p_id) ; toast.success("Itam Added To Cart" ,{duration:1000, iconTheme: {
    primary: '#000',
    secondary: '#fff',
  },
})}} className='btn btn-sm btn-warning border-black float-end '>Add To Cart</button>
      </div>
 

    </div>
  </div>
    </div>
  )
}

export default Product
