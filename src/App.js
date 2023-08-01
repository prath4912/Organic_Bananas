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
import Cart from "./pages/Cart";
import Login from "./pages/Login"
import { useState } from "react";
import Signup from "./pages/Signup";
import Banana from "./Fruits/Banana";
import Fruitstate from "./context/Fruitstate";

function App() {
  const [items,setitem]=useState([]) ;
  const checkoutHandler = async(amount ,add1)=>{

    const {data:{key}} = await axios.get("http://localhost:5000/api/key") ;
    const {data:{order}} = await axios.post("http://localhost:5000/checkout" ,{
      amount ,add1
    }) ;

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Organic Banana",
      description: "Test Transaction",
      image:l1 ,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:5000/paymentv",
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
      rzp1.open();
    console.log(order) ;
  }

  return (
    <>
    <Fruitstate>
      <Router>
      <Header/>
     <Switch>
        <Route path="/products">
            <Products items={items} setitem={setitem} checkoutHandler = {checkoutHandler}   />
        </Route>
        <Route path="/payment">
          <Paymentsucces/>
        </Route>
        <Route path="/cart">
          <Cart items={items} setitem={setitem} checkoutHandler = {checkoutHandler} />
        </Route>
         <Route path="/login">
          <Login/>
       </Route>
       <Route path="/signup">
          <Signup/>
       </Route>
       <Route path="/banana">
          <Banana/>
       </Route>
        <Route path="/">
          <Hone />
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