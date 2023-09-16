import React, { useState } from 'react'
import { Link ,useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// import OTPInput, { ResendOTP } from "otp-input-react";
import axios from "axios";
import Fruitcontext from '../context/Fruitcontext';
import { useContext } from 'react';


function Signup() {
    
    const a = useContext(Fruitcontext);
    
    const [credentials, setCredentials] = useState({name : "" ,email: "", password: "" }) 
    let history = useHistory();

    const handlesignup = async (e)=>{

        e.preventDefault();

        
            const data = await axios.post( `${a.baseUrl}}/api/auth/createuser` ,{

        name : credentials.name , email : credentials.email , password : credentials.password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }}) ;
            const json = await data.data
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/home");
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange1 = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="d-flex justify-content-center ld1">

                <form onSubmit={handlesignup} className='' >
                    <div className="w-100">
                        {/* <div className=" position-absolute top-50 start-50 translate-middle  "> */}
                        <div className=" rounded-3 bg-warning p-4">
                            <h5>Sign Up</h5>
                            <div className='form-floating'>
                            <input type="text" className="form-control" id="name"  onChange={onChange1} value={credentials.name} name='name' placeholder="name@example.com" />
                             <label htmlFor="name">Enter First Name</label>
                             </div>
                             {/* <div className='form-floating mt-2'>
                             <input type="text" className="form-control" id="floatingInputValue1" placeholder="name@example.com" />
                             <label htmlFor="floatingInputValue1">Enter Last Name</label>
                             </div> */}
                             <div className='form-floating mt-2'>
                             <input type="email" className="form-control" id="email" onChange={onChange1} value={credentials.email} name='email' placeholder="name@example.com" />
                             <label htmlFor="email">Enter Email</label>

                             </div> 
                             <div className='form-floating mt-2'>
                             <input type="password" className="form-control" id="pasword" onChange={onChange1} value={credentials.password}  name='password' placeholder="name@example.com" />
                             <label htmlFor="password">Enter Password</label>

                             </div> 
                             {/* <div className='my-2'><OTPInput className="my-1" value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false}  />
                              */}
                            {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
                            {/* <button className='btn btn-primary btn-sm'>Verify</button>
                            </div> */}

                             <button type="submit" className=" btn btn-primary my-2">SignUp</button>
                        </div>
                        
                        <div className="text-dark mb-2" >Exiting User <span><Link to="/login">Login</Link></span></div>
                        </div>
                </form>
            </div>
        </div >
    
  )
}

export default Signup
