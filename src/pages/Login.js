import React from "react";
import { Link ,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import Fruitcontext from "../context/Fruitcontext";

const Login = (props) => {
    const a = useContext(Fruitcontext);
    const [credentials, setCredentials] = useState({  email: "", password: "" }) 
    let history = useHistory();

    const handlelogin = async (e)=>{

        e.preventDefault();

            const data = await axios.post(`${a.BaseUrl}/api/auth/login` ,{

         email : credentials.email , password : credentials.password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }}) ;

        const json = await data.data
        if(json.success==3)
        {
            alert("Message Sent to Email Plese VErify") ;
        }
        else if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            props.setcount(props.count+1) ;
            history.push("/home");
        }
        else{
            alert("Invalid credentials");
        }
    }
  

    const onChange1 = (e)=>{
        const temp = {
            email : e.target.value ,
            password : credentials.password
        }
        setCredentials(temp) ;
    }
    const onChange2 = (e)=>{
        const temp = {
            email : credentials.email ,
            password : e.target.value
        }

        setCredentials(temp) ;    }
    return (
        <div className="d-flex justify-content-center ld1">
           
            <form onSubmit={handlelogin } >
                <div className="w-100">
                {/* <div className=" position-absolute top-50 start-50 translate-middle  "> */}
                    <div className="rounded-3 bg-warning p-4">
                        <h5>{props.title}</h5>
                <div className="mb-3 ">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        onChange={onChange1}
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        onChange={onChange2}
                        className="form-control"
                        id="password"
                        name="password"
                    />
                </div>
               
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                </div>
                <div className="text-dark">New To Organic Bananas?<p><Link to="/signup"> Create an Acoount</Link></p></div>
                <div className="text-dark"><p><Link to="/forgotpassword">Forgot Paaword</Link></p></div>

                </div>
            </form>
        </div>
    );
};

export default Login;
