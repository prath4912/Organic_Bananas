import React, { useEffect, useState } from "react";
import Fruitcontext from "./Fruitcontext";
import axios from "axios";
import { toast } from "react-hot-toast";
import l1 from "../images/ORGABIC.png";

export default function Fruitstate(props) {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const[loading , setloading] = useState(false) ;
  const [product_list, setproduct_list] = useState([]);
  const [fruits, setfruits] = useState([]);
  const [vegetable, setvegetables] = useState([]);
  const [total_fruits, settf] = useState(0);

  const [wishlist, setwishlist] = useState([]);
  const [cart, setcart] = useState([]);

  const [formdata, setformdata] = useState({ fruit: false, vegetable: false });

  const [s1, sets1] = useState("");
  const [s11, sets11] = useState("");

  const [pricefilter, setpricefilter] = useState(10000000);
  const [fi11, setfi11] = useState(10000000);

  const [category, setCategory] = useState([]);
  const [category1, setcat1] = useState([]);

  const [page, setpage] = useState(0); // page number

  const [profileData, setpdata] = useState(null);


  useEffect(()=>{
    fetchfruits() ;
    fetchvegetables() ;
    getuserdata() ;
  },[]) ;

  const fetchData = async () => {
    setloading(true) ;
    console.log("in fetchdata")
    console.log(category) ;
    setpage(page + 1);
    // var url = `${BaseUrl}/api/product/getproduct?amount[lte]=${fi1}&page=${page}&sort=${s1}`;
    var url ;

    if (category.length !== 0) {
      var temp = JSON.stringify(category);
      url = `${BaseUrl}/api/product/getproduct?amount[lte]=${pricefilter}&category=${temp}&page=${page}&sort=${s1}`;
    } else {
      url = `${BaseUrl}/api/product/getproduct?amount[lte]=${pricefilter}&page=${page}`;
    }

    try {
      const response = await axios.get(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      
      temp = [...product_list , ...JSON.parse(data.products)];
      settf(data.count);
      setproduct_list(temp);
      setloading(false) ;
    } catch (error) {
      alert(error + "\nYou are Offline");
    }
  };

  const fetchfruits = async () => {
    console.log('fetchfruits')
    var url = `${BaseUrl}/api/product/getfruits`;
    try {
      const data1 = await axios.get(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = data1.data;
      var temp = fruits;
      temp = temp.concat(JSON.parse(data.f1));
      setfruits(temp);
    } catch (error) {
      alert(error + "\nYou are Offline");
    }
  };

  const fetchvegetables = async () => {
    var url = `${BaseUrl}/api/product/getvegetables`;
    try {
      const data1 = await axios.get(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = data1.data;
      var temp = vegetable;
      temp = temp.concat(JSON.parse(data.f1));
      setvegetables(temp);
    } catch (error) {
      alert(error + "\nYou are Offline");
    }
  };

  const fetchData1 = async () => {
    setloading(true );
    try {
      const url = `${BaseUrl}/api/wishlist/getwishlist`;
      const data1 = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = data1.data;
      var temp = JSON.parse(data.f1);
      let temp1 = data.count;
      setwishlist(temp);
    } catch (error) {}

    setloading(false) ;
  };

  const getcart = async () => {
    setloading(true) ;

    try {
      const data1 = await axios.get(`${BaseUrl}/api/cart/get`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setcart(data1.data);
    } catch (error) {
      console.log(error);
    }
    setloading(false) ;

  };

  const addwishlist = async (product_id) => {
    setloading(true) ;
    const data1 = await axios.post(
      `${BaseUrl}/api/wishlist/insert`,
      {
        product: product_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    setloading(false) ;
  };

  const addcart = async (p_id , quantity =1) => {
    setloading(true) ;
    try {
      if (localStorage.getItem("token")) {
        const result = await axios.post(
          `${BaseUrl}/api/cart/insert`,
          {
            productId: p_id,
            quantity
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log(result);
        getcart();
      } else {
        alert("Plese Login");
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false) ;

  };

  const removehandle = async (p_id) => {
    setloading(true) ;

    const result = await axios.post(
      `${BaseUrl}/api/cart/delete`,
      {
        product: p_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    console.log(result);
    getcart();
    setloading(false) ;

  };

  const deletewishlist = async (product_id) => {
    setloading(true) ;
    await axios.post(
      `${BaseUrl}/api/wishlist/remove`,
      {
        product: product_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    fetchData1();
    setloading(false) ;
  };

  const subq = async (p_id, qunatity) => {
    setloading(true) ;

    if (qunatity > 1) {
      const result = await axios.post(
        `${BaseUrl}/api/cart/reduce`,
        {
          productId: p_id,
          quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(result);
      getcart();
    } else {
      removehandle(p_id) ;
      // alert("Click On Remove");
    }
    setloading(false) ;

  };

  const checkoutHandler = async (amount, add1, cart) => {

    // console.log(cart) ;

    const {
      data: { key },
    } = await axios.get(`${BaseUrl}/api/payment/key`);

    const {
      data: { order },
    } = await axios.post(`${BaseUrl}/api/payment/checkout`, {
      amount,
    });

    console.log(order) ;

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Organic Banana",
      description: "Test Transaction",
      image: l1,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {

        let cart1 = JSON.stringify(cart);
        const { data } = await axios.post(
          `${BaseUrl}/api/payment/verification`,
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            address : add1 ,
            amount
          },
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (data.success) {
          toast.success("Payment Succesful");
          localStorage.setItem("cart", JSON.stringify([]));
          window.location.href = `/payment?referance=${response.razorpay_payment_id}`;
        }
      },

      // prefill: {
      //     // name: "Gaurav Kumar",
      //     // email: "gaurav.kumar@example.com",
      //     // contact: "9000090000"
      // },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
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
  };

  const getuserdata = async () => {
    try {
      if (!localStorage.getItem("token")) {
        // alert("Please Login");
        return;
      }

      const response = await axios.get(`${BaseUrl}/api/auth/getuser`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      // console.log(response.data);
      setpdata(response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with an error:", error.response.data);
        alert("An error occurred while fetching user data.");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Fruitcontext.Provider
      value={{
        formdata,
        setformdata,
        loading, 
        setloading,
        deletewishlist,
        addwishlist,
        fetchData1,
        s11,
        sets11,
        fi11,
        setfi11,
        category1,
        setcat1,
        wishlist,
        setwishlist,
        setpdata,
        profileData,
        getuserdata,
        checkoutHandler,
        category,
        setCategory,
        pricefilter,
        setpricefilter,
        s1,
        sets1,
        total_fruits,
        removehandle,
        fetchData,
        getcart,
        setcart,
        page,
        setpage,
        subq,
        setproduct_list,
        product_list,
        cart,
        addcart,
        BaseUrl,
        fruits,
        vegetable,
        fetchfruits,
        fetchvegetables,
      }}
    >
      {props.children}
    </Fruitcontext.Provider>
  );
}
