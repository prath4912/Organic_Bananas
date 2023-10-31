import React, { useContext, useEffect , useState} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from "react-router-dom";
import axios from "axios";
import Fruitcontext from "../context/Fruitcontext";


export default function EmailVerify() {
    const a = useContext(Fruitcontext) ;
    const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
    var flag = true ;
    const verifyEmailUrl = async () => {
        try {
            const url = `${a.BaseUrl}/api/auth/users/${param.id}/verify/${param.token}`;
            const { data } = await axios.get(url);
            setValidUrl(true);
            console.log(data);
        } catch (error) {
            setValidUrl(false);
            console.log(error);
        }
    };
	useEffect(() => {
		
        if(flag)
        {
            verifyEmailUrl();
            flag = false ;
        }
       
	}, [param]);

  return (
    <div className='dd1'>
        <div className='container bg-warning p-5'>
        {
            validUrl ? <div> 
                 <h1>Email Verified</h1>
                 <Link className="btn btn-primary" to="/login">
                        Login
                </Link>
                 </div> : 
            <div> 
                <h1>Email Not Verified</h1>
                <Link className="btn btn-primary" to="/signup">
                        Try Again
                </Link>
            </div>

        }
                                <div className="text-dark mb-2" >Go Back To Login <span><Link to="/login">Login</Link></span></div>

        </div>
    </div>
  )
}
