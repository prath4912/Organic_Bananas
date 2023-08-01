import React, { useEffect, useState } from 'react'
import Fruitcontext from './Fruitcontext'
import axios from "axios";


export default function Fruitstate(props) {

  const product_list = [{
    "id" : 1 ,
    "name":"Banana",
    "amount":50 ,
    "desc":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer"
    ,"stock" : 10
  },{
    "id" : 2 ,

    "name":"Apple",
    "amount":50 ,
    "desc":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer"
    ,"stock" : 10
  },{
    "id" : 3 ,
    "name":"Chiku",
    "amount":50 ,
    "desc":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer"
    ,"stock" : 10
  },{
    "id" : 4 ,
    "name":"Shevaga",
    "amount":35 ,
    "desc":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer"
    ,"stock" : 10
  },{
    "id" : 5 ,
    "name":"Limbu",
    "amount":166 ,
    "desc":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer"
    ,"stock" : 10
  },{
    "id " : 6 ,
    "name":"Papai",
    "amount":20 ,
    "desc":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer"
    ,"stock" : 10
  },{
    "id" : 7 ,
    "name":"Peru",
    "amount":70 ,
    "desc":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer"
    ,"stock" : 10
  },{
    "id" : 8 ,
    "name":"Water-melon",
    "amount":10 ,
    "desc":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer"
    ,"stock" : 10
  }]

const [q1 , setq1] = useState(0) ;

  const[list , setlist] = useState(product_list) ;

  const[cart , setcart] = useState([]) ;
   
    const handlec = async()=>{

      if(localStorage.getItem("cart"))
      {
        setcart(JSON.parse(localStorage.getItem("cart")) );

      }
      // api call
      // if(localStorage.getItem("token"))
      // {
      //   const data = await axios.post("http://localhost:5000/api/cart/getcart/" ,{
       
      //     }, {
      //       headers: {
      //         'Content-Type': 'application/json' ,
      //         "auth-token" : localStorage.getItem("token") 
      //       }}) ;
      //       setcart(data.data) ;
            
      // }
      setlist(product_list) ;
    }

const addcart =(p_id)=>{

  const cart1 = cart ;

  let item  ;
   product_list.map((element , index)=>{
    if(element.id===p_id)
    {
      item = index ;
    }
  }) ;

  const temp1 = {

    product : product_list[item] ,
    user : null ,
    quantity : 1

  }
  
  let flag = true ;
  cart1.map((ele)=>{
    if(ele.product===temp1.product)
    {
      ele.quantity = ele.quantity+1 ;
      flag = false ;
    }
  })
  if(flag)
  {
    cart1.push(temp1) ;
  }
  setcart(cart1) ;
  localStorage.setItem("cart" , JSON.stringify(cart)) ;
}

    useEffect(()=>{
      handlec() ;
    } , []) ;

const addq =(index)=>{
  // alert("done") ;
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
    <Fruitcontext.Provider value={{q1,list ,addq,subq,setlist, product_list , cart ,addcart }}>
        {props.children}
    </Fruitcontext.Provider>
  )
}
