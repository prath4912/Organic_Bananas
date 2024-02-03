import React, {useState } from 'react'
import Fruitcontext from './Fruitcontext'
import axios from "axios";
import { toast } from "react-hot-toast";
import l1 from "../images/ORGABIC.png" ;



export default function Fruitstate(props) {

  const BaseUrl = process.env.REACT_APP_BASE_URL ;
  
  const [product_list , setproduct_list] = useState([]) ; 
  const [wishlist , setwishlist] = useState([]) ; 

  const [q1 , setq1] = useState(0) ;


  const[total_fruits , settf] = useState(0) ;
  const[total_fruits1 , settf1] = useState(0) ;

  const[cart , setcart] = useState([]) ;

  const[s1 , sets1] = useState("") ;
  const[s11 , sets11] = useState("") ;

  const[fi1 , setfi1] = useState(10000000) ;
  const[fi11 , setfi11] = useState(10000000) ;

  const [category , setcat] = useState([]) ;
  const [category1 , setcat1] = useState([]) ;


  const [page ,setpage] = useState(0) ;

  const [profileData , setpdata] =useState (null) ;

    const fetchData = (async()=>{
      setpage(page+1) ;
      var url = `${BaseUrl}/api/product/getproduct?amount[lte]=${fi1}&page=${page}&sort=${s1}`;
     if(category.length!==0)
     {
      var temp = JSON.stringify(category) ;
      // console.log(temp); 
       url = `${BaseUrl}/api/product/getproduct?amount[lte]=${fi1}&category=${temp}&page=${page}&sort=${s1}`;
     }
     else
     {
         url = `${BaseUrl}/api/product/getproduct?amount[lte]=${fi1}&page=${page}` ;
     }

     try
     {
      const data1 = await axios.get(url,{
      }, {
        headers: {
          'Content-Type': 'application/json' ,
        }}) ;
     
        const data = (data1.data) ;
        // console.log(data) ;
         temp = product_list ;
        temp =temp.concat(JSON.parse(data.f1));
        let temp1 =data.count ;
        settf(temp1) ;
        setproduct_list(temp) ;
      }catch(error)
      {
       alert(error  + "\nYou are Offline") ;
      }
    });
  
    const fetchData1 = (async()=>{
     try
     {
      // console.log("IN FEtch")
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
       
      }catch(error)
      {
      }
    }) ;

  const getcart = async()=>{
    const data1 =  await axios.get(`${BaseUrl}/api/cart/get` ,{
              headers: {
                'Content-Type': 'application/json' ,
                'auth-token': localStorage.getItem("token") 
              }}) ;
              setcart(data1.data) ;
    }

  const addwishlist = async (product_id)=>{
      const data1 =  await axios.post(`${BaseUrl}/api/wishlist/insert` ,{
        product: product_id ,
        },{
                headers: {
                  'Content-Type': 'application/json' ,
                  'auth-token': localStorage.getItem("token") 
                }}) ;
  };

const addcart =async(p_id)=>{

  const result = await axios.post(`${BaseUrl}/api/cart/insert` ,{
    productId: p_id ,
    quantity : 1,
    },{
            headers: {
              'Content-Type': 'application/json' ,
              'auth-token': localStorage.getItem("token") 
            }}) ;
          console.log(result) ;
          getcart() ;
}

const removehandle = async(p_id) => {
  const result = await axios.post(`${BaseUrl}/api/cart/delete` ,{
    product: p_id ,
    },{
            headers: {
              'Content-Type': 'application/json' ,
              'auth-token': localStorage.getItem("token") 
            }}) ;

            console.log(result) ;
            getcart() ;
}


const deletewishlist = async(product_id) => {

    await axios.post(`${BaseUrl}/api/wishlist/remove` ,{
    product: product_id ,
    },{
            headers: {
              'Content-Type': 'application/json' ,
              'auth-token': localStorage.getItem("token") 
            }}) ;
            fetchData1() ;

};



const subq = async(p_id , qunatity)=>{
  if(qunatity>1 )
  {
    const result = await axios.post(`${BaseUrl}/api/cart/reduce` ,{
      productId: p_id ,
      quantity : 1,
      },{
              headers: {
                'Content-Type': 'application/json' ,
                'auth-token': localStorage.getItem("token") 
              }}) ;
            console.log(result) ;
            getcart() ;

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
            setpdata(data) ;
}

return (

    <Fruitcontext.Provider value={{deletewishlist , addwishlist , fetchData1 ,s11 , sets11 ,fi11 , setfi11 ,category1 , setcat1 ,wishlist ,setwishlist,setpdata,profileData , getuserdata ,checkoutHandler , category , setcat,fi1,setfi1 , s1,sets1 , total_fruits , removehandle,fetchData, getcart,setcart ,page , setpage ,q1 ,subq, setproduct_list, product_list , cart ,addcart ,BaseUrl }}>
        {props.children}
    </Fruitcontext.Provider>

  )
}
