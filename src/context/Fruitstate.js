import React, {  useEffect, useState } from 'react'
import Fruitcontext from './Fruitcontext'
import axios from "axios";
import { toast } from "react-hot-toast";
import l1 from "../images/ORGABIC.png" ;

// import dotenv from "dotenv" ;


export default function Fruitstate(props) {


  // dotenv.config({path : "./config/config.env"}) ;

  const BaseUrl = process.env.REACT_APP_BASE_URL ;
  
  const [product_list , setproduct_list] = useState([]) ; 
  const [wishlist , setwishlist] = useState([]) ; 

  const [q1 , setq1] = useState(0) ;

  // const[total_page  , settotalpage] = useState(0) ;

  const[total_fruits , settf] = useState(0) ;
  const[total_fruits1 , settf1] = useState(0) ;

  const[cart , setcart] = useState([]) ;

  const[s1 , sets1] = useState() ;
  const[s11 , sets11] = useState() ;

  const[fi1 , setfi1] = useState(10000000) ;
  const[fi11 , setfi11] = useState(10000000) ;

  const [category , setcat] = useState([]) ;
  const [category1 , setcat1] = useState([]) ;


  const [page ,setpage] = useState(0) ;
  const [page1 ,setpage1] = useState(0) ;

  const [profileData , setpdata] =useState (null) ;

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
  
    const fetchData1 = (async()=>{
     try
     {
      console.log("IN FEtch")
      const url = `${BaseUrl}/api/wishlist/getwishlist` ;
      const data1 = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json' ,
          'auth-token': localStorage.getItem("token") 
        }}) ;

        const data = data1.data ;
        var temp =(JSON.parse(data.f1));
        let temp1 =data.count ;
        settf1(temp1) ;
        setwishlist(temp) ;
        console.log(wishlist) ;
        console.log(total_fruits) ;
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
  const addwishlist = async (product_id)=>{
      const data1 =  await axios.post(`${BaseUrl}/api/wishlist/insert` ,{
        product: product_id ,
        },{
                headers: {
                  'Content-Type': 'application/json' ,
                  'auth-token': localStorage.getItem("token") 
                }}) ;
          console.log(data1) ;
  };

const addcart =(p_id)=>{

  const cart1 = cart ;
  let item  ;


product_list.forEach(( element, index) => {
  if(element._id===p_id)
  {
    item = index ;
  }
});

    const temp1 = {
    product : product_list[item] ,
    user : null,
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
const deletewishlist = async(product_id) => {

    await axios.post(`${BaseUrl}/api/wishlist/remove` ,{
    product: product_id ,
    },{
            headers: {
              'Content-Type': 'application/json' ,
              'auth-token': localStorage.getItem("token") 
            }}) ;
            // console.log(data1) ;
            fetchData1() ;

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

const checkoutHandler = async(amount ,add1 ,cart)=>{

    
  const {data:{key}} = await axios.get(`${BaseUrl}/api/payment/key`) ;
const {data:{order}} = await axios.post(`${BaseUrl}/api/payment/checkout` ,{
  amount 
}) ;

const options = {
  key: key, // Enter the Key ID generated from the Dashboard
  amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",
  name: "Organic Banana",
  description: "Test Transaction",
  image:l1 ,
  order_id: order.id , //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  handler: async function (response){

    let cart1 =JSON.stringify(cart) ;
    const {data} =  await axios.post(`${BaseUrl}/api/payment/verification` ,{

razorpay_payment_id: response.razorpay_payment_id ,razorpay_order_id:response.razorpay_order_id , razorpay_signature :response.razorpay_signature , add1 , cart1 
},{
        headers: {
          'auth-token': localStorage.getItem("token") 
        }}) ;
if(data.success)
{
toast.success("Payment Succesful") ;

  localStorage.setItem("cart" , JSON.stringify([])) ;
  window.location.href = `/payment?referance=${response.razorpay_payment_id}` ;
}

},

  // prefill: {  
  //     // name: "Gaurav Kumar",
  //     // email: "gaurav.kumar@example.com",
  //     // contact: "9000090000"
  // },
  notes: {
      address: "Razorpay Corporate Office"
  },
  theme: {
      color: "#3399cc"
  }
};

var rzp1 = new window.Razorpay(options);

rzp1.on('payment.failed', function (response){
// alert(response.error.code);
// alert(response.error.description);
// toast((t) => (
//   <span>
//     <b>bold</b>
//     <p>{response.error.description}</p>
//     <button onClick={() => toast.dismiss(t.id)}>
//       Dismiss
//     </button>
//   </span>
// ));
// alert(response.error.source);
// alert(response.error.step);
// alert(response.error.reason);
// alert(response.error.metadata.order_id);
// alert(response.error.metadata.payment_id);
});

  rzp1.open();
}

const getuserdata = async ()=>{
  if(!localStorage.getItem("token") )
  {
    return ;
  }
  const {data} =  await axios.get(`${BaseUrl}/api/auth/getuser` ,{
            headers: {
              'auth-token': localStorage.getItem("token") 
            }}) ;
            console.log(data) ;
            setpdata(data) ;
}

return (

    <Fruitcontext.Provider value={{deletewishlist , addwishlist , fetchData1 ,s11 , sets11 ,fi11 , setfi11 ,category1 , setcat1 ,wishlist ,setwishlist,setpdata,profileData , getuserdata ,checkoutHandler , category , setcat,fi1,setfi1 , s1,sets1 , total_fruits , removehandle,fetchData, getcart,setcart ,page , setpage ,q1 ,addq,subq, setproduct_list, product_list , cart ,addcart ,BaseUrl }}>
        {props.children}
    </Fruitcontext.Provider>

  )
}
