import React, { useContext, useState } from 'react'
import axios from "axios" 
import Fruitcontext from '../context/Fruitcontext';
import { Link  } from 'react-router-dom/cjs/react-router-dom.min'



export default function Forgotpassword() {

    const[flag1 , setflag ] = useState(false) ;
    const [email , setemail ] = useState() ;
    const a = useContext(Fruitcontext) ;

    const handlepass = async (e)=>{
        e.preventDefault() ;
        const url = `${a.BaseUrl}/api/auth/forgot` ;
        try{
        const response  =  await axios.post(url , {
            email : email ,
        }) ;
        console.log(response) ;
        if(response.status==400)
        {
            alert("fv ") ;
        }
        if(response.status==200)
        {
            alert("Password Reset Link Send To your Email.")
        }
        else
        {
            alert("Error Occured")
        }
        setflag(true) ;
    }catch(error)
    {
        alert("Error Occured")

    }
    }

    const onchand = (e)=>{
        setemail(e.target.value)
    }

  return (
    <div className='dd1 mt-4'>
        <div className='container bg-warning p-5'>
            <form onSubmit={handlepass}  action="">
                <div className=''>
                    <label className='me-2 ' htmlFor="mail">Enter mail</label>
                    <input className='p-2' value={email} onChange={onchand} type="text" id='mail' />
                </div> 
                <button  type='submit' className='my-3 btn btn-primary'>Change Password</button>
                { flag1 ? <p>Password Resent Link Sent to your email </p> : <p> </p> }
            </form>
            <div className="text-dark mb-2" >Go Back To Login <span><Link to="/login">Login</Link></span></div>

        </div>
    </div>
  )
}
