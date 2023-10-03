import React, {  useState } from 'react'
import Fruitcontext from './Fruitcontext'
import axios from "axios";
// import dotenv from "dotenv" ;


export default function Fruitstate(props) {

  // dotenv.config({path : "./config/config.env"}) ;

  const BaseUrl = process.env.REACT_APP_BASE_URL ;
  
  const [product_list , setproduct_list] = useState([]) ; 
  const [q1 , setq1] = useState(0) ;

  // const[total_page  , settotalpage] = useState(0) ;

  const[total_fruits , settf] = useState(0) ;
  const[cart , setcart] = useState([]) ;

  const[s1 , sets1] = useState() ;
  const[fi1 , setfi1] = useState(10000000) ;
  const [category , setcat] = useState([]) ;

  const [page ,setpage] = useState(0) ;



    const fetchData = (async()=>{
      setpage(page+1) ;
      if(s1!=null)
      {
      var url = `${BaseUrl}/api/product/getproduct?amount[lte]=${fi1}&page=${page}&sort=${s1}`;
     }
     else if(category.length!==0)
     {
      var temp = JSON.stringify(category) ;
       url = `${BaseUrl}/api/product/getproduct?amount[lte]=${fi1}&category=${temp}&page=${page}&sort=${s1}`;

     }
     else
     {
         url = `${BaseUrl}/api/product/getproduct?amount[lte]=${fi1}&page=${page}` ;
     }

     console.log(url) ;
     try
     {
      const data1 = await axios.get(url,{
      }, {
        headers: {
          'Content-Type': 'application/json' ,
        }}) ;
     
        const data = (data1.data) ;
         temp = product_list ;
        temp =temp.concat(JSON.parse(data.f1));
        let temp1 =data.count ;
        settf(temp1) ;

        setproduct_list(temp) ;
        console.log(temp) ;
      }catch(error)
      {
       alert(error  + "\nYou are Offline") ;
      }
    }) ;
  
  

  const getcart = async()=>{
 
      if(localStorage.getItem("cart")) 
      {
        setcart(JSON.parse(localStorage.getItem("cart")) );
      }
    }

const addcart =(p_id)=>{

  const cart1 = cart ;
  let item  ;

  //  product_list.map((element , index)=>{

   
  // }) ;
product_list.forEach((element,index) => {
  if(element._id===p_id)
  {
    item = index ;
  }
});
  const temp1 = {
    product : product_list[item] ,
    user : null ,
    quantity : 1
  }


  let flag = true ;
  cart1.map((ele)=>{
   

    if(ele.product._id===temp1.product._id)
    {
      ele.quantity = ele.quantity+1 ;
      flag = false ;
    }
  })
  if(flag)
  {
    cart1.push(temp1) ;
  }
  localStorage.setItem("cart" , JSON.stringify(cart1)) ;

  setcart(cart1) ;
}

const removehandle = (index) => {
  const cart1 = cart ;
  cart1.splice(index , 1) ;
  localStorage.setItem("cart", JSON.stringify(cart1));
  setcart(cart1) ;
};

const addq =(index)=>{

  if(cart[index].quantity < cart[index].product.stock)
  {
    cart[index].quantity =cart[index].quantity+1 ;
    localStorage.setItem("cart" , JSON.stringify(cart)) ;

  }else
  {
    alert("Maximum Stock Reached") ;
  }
}

const subq = (index)=>{
  if(cart[index].quantity > 1 )
  {
    cart[index].quantity =cart[index].quantity-1 ;
    localStorage.setItem("cart" , JSON.stringify(cart)) ;

  }else
  {
    alert("Click On Remove") ;
  }
}

return (

    <Fruitcontext.Provider value={{category , setcat,fi1,setfi1 , s1,sets1 , total_fruits , removehandle,fetchData, getcart,setcart ,page , setpage ,q1 ,addq,subq, setproduct_list, product_list , cart ,addcart ,BaseUrl }}>
        {props.children}
    </Fruitcontext.Provider>

  )
}
