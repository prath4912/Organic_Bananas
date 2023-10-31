import React, { useContext, useState } from 'react'
import axios from "axios" 
import Fruitcontext from '../context/Fruitcontext';
import { useParams } from "react-router-dom";
import { Link  } from 'react-router-dom/cjs/react-router-dom.min'

export default function Forgotpassword() {

    const[flag1 , setflag ] = useState(false) ;
    const param = useParams() ;
    const [password , setpass] = useState();

    const a = useContext(Fruitcontext) ;

    const handlepass = async (e)=>{
        try{

        
        e.preventDefault() ;
        const url = `${a.BaseUrl}/api/auth/users/${param.id}/forgot/${param.token}`;
        const response  = await axios.post(url , {
            password : password ,
        }) ;
        console.log(response) ;

        setflag(true) ;
    }
    catch(error)
    {
        alert("error")
    }
    }
const onchangehand = (e)=>{
    setpass(e.target.value) ;
}
  return (
    <div className='dd1 mt-4'>
        <div className='container bg-warning p-5'>
            <form onSubmit={handlepass}  action="">
                <div className=''>
                    <label className='me-2 ' htmlFor="mail">Enter New paaword</label>
                    <input value={password} name = "pasword" onChange={onchangehand} type="text" id='mail' />
                </div>
                <button  type='submit' className='my-3 btn btn-primary'>Change Password</button>
            </form>
            {flag1 ? <div>Password Changed Successfully <br />
                        <div className="text-dark mb-2" >Go Back To Login <span><Link to="/login">Login</Link></span></div>
                       
             </div> : <div>
                </div>}
        </div>
    </div>
  )
}
