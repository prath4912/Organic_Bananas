import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState , useContext} from "react";


import Header from "./components/Header";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import "./App.css";
import Paymentsucces from "./pages/Paymentsucces";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Banana from "./Fruits/Banana";
import Contact from "./pages/Contact_us";
import Fruitcontext from "./context/Fruitcontext";
import Home from "./components/Home";
import Hone from "./pages/Hone";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import WishList from "./pages/WishList";
import EmailVerify from "./components/EmailVerify";
import Fruit from "./pages/Fruit";
import Forgotpaasword from "./pages/Forgotpassword";
import Forgotpassword1 from "./pages/Forgotpassword1";

function App() {

  const a = useContext(Fruitcontext);
  const [count, setcount] = useState(0);


  return (
    <>
      <Router>
      <Header count={count} setcount={setcount} />

        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/cart">
            <Cart checkoutHandler={a.checkoutHandler} />
          </Route>
          <Route path="/login">
            <Login count={count} setcount={setcount} title={"Login"} />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/forgotpassword">
            <Forgotpaasword />
          </Route>
          <Route path="/banana">
            <Banana />
          </Route>
          <Route path="/payment">
            <Paymentsucces />
          </Route>
          <Route path="/contact_us">
            <Contact />
          </Route>
          <Route path="/user/:name">
            <Profile />
          </Route>
          <Route path="/wishlist">
            <WishList />
          </Route>
          <Route path="/users/:id/verify/:token">
            <EmailVerify />
          </Route>
          <Route path="/users/:id/forgot/:token">
            <Forgotpassword1 />
          </Route>
          <Route path="/fruits/:name/:id">
            <Fruit />
          </Route>
          <Route path="/">
            <Hone />
            <Home />
          </Route>
        </Switch>
       
      </Router>
   

        <Footer />
    </>
  );
}

export default App;

/*
Ecommerce Website Features :
package react-top-loading-bar

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
