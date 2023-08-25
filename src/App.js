// in  products page number is not updating on fetch
// setting products is difficult

import Header from "./components/Header"
import Products from "./pages/Products";
import Footer from "./components/Footer";
import  "./App.css" ;
import Hone from "./pages/Hone";
import axios from "axios";
import Paymentsucces from "./pages/Paymentsucces";
import l1 from "./images/ORGABIC.png" ;
import {
  BrowserRouter as Router,
  Switch,
  Route,
   
} from "react-router-dom";
import { toast } from "react-hot-toast";
import Cart from "./pages/Cart";
import Login from "./pages/Login"
import { useState } from "react";
import Signup from "./pages/Signup";
import Banana from "./Fruits/Banana";
import Fruitstate from "./context/Fruitstate";
import Dashboard from "./admin_pages/Dashboard";
import A_Header from "./admin_pages/A_Header" ;
// import Spinner from "./components/Spinner";
import Map from "./components/Map";
import { useEffect } from "react";
import Contact from "./pages/Contact_us"

function App() {


  const [items,setitem]=useState([]) ;
  const [count , setcount] = useState(0) ;
  useEffect(()=>{
    console.log("trtgr")
  } , []) ;

  const checkoutHandler = async(amount ,add1 ,cart)=>{

    // const {data:{key}} = await axios.get("http://localhost:5000/api/key") ;
    // const {data:{order}} = await axios.post("http://localhost:5000/checkout" ,{
      const {data:{key}} = await axios.get("https://ob-1.onrender.com/api/key") ;
    const {data:{order}} = await axios.post("https://ob-1.onrender.com/checkout" ,{
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
      // const {data} =  await axios.post("http://localhost:5000/paymentv" ,{
        const {data} =  await axios.post("https://ob-1.onrender.com/paymentv" ,{

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



  return (
    <>
    <Fruitstate>
      <Router>
        {/* <Spinner/> */}
      { !localStorage.getItem("admin") ? <Header count={count} setcount={setcount} /> : <A_Header count={count} setcount={setcount} /> }

     <Switch>
        <Route path="/products">
            <Products items={items} setitem={setitem} checkoutHandler = {checkoutHandler}   />
        </Route>
        <Route path="/cart">
          <Cart items={items} setitem={setitem} checkoutHandler = {checkoutHandler} />
        </Route>
         <Route path="/login">
         <Login count={count} setcount={setcount} title = {"Login"}  />
       </Route>
       <Route path="/adminlogin">
          <Login count={count} setcount={setcount} title = {"Admin Login"}  />
          
       </Route>
       <Route path="/signup">
          <Signup/>
       </Route>
       <Route path="/banana">
          <Banana/>
       </Route>
       <Route path="/payment">
          <Paymentsucces/>
        </Route>
        <Route path="/dashboard">
          <Dashboard/>
        </Route>
        <Route path="/contact_us">
          <Contact/>
        </Route>
        <Route path="/">
          <Hone />
          <Map/>
        </Route>
      
     </Switch>
     <Footer/>
     </Router>
     </Fruitstate>
    </>
  );
}

export default App;




/*
Ecommerce Website Features :
package react-top-loading-bar
react-infinite scroll cmponent
.env.local instead of config

spinner
1. FAQ
2. Search Bar
3. Product Page with exchange & return & reviews and many others things
4. Wish_List
4.Checkout
5. Order Tracking
6.Chatbot
7.availability filter'
8. Multilanguage Support

*/