import React from 'react'
import ob1 from "../images/ORGABIC.png"
// import Fruitcontext from '../context/Fruitcontext';

import {
  Link ,useHistory ,useLocation
} from "react-router-dom";
// import { useState } from 'react';


export default function Header(props) {

  // const [q1 , setq1] = useState(0) ;

  // const a = useContext(Fruitcontext) ;

  // a.cart.map((item)=>{
  //   setq1(q1+item.quantity) ;
  // }) ; 

  let location = useLocation() ;
  const history = useHistory() ;

  const handlelogout = ()=>{
    localStorage.removeItem("token") ;
    localStorage.removeItem("admin") ;
    props.setcount(props.count+1) ;
    history.push("/login"); 
  }


  return (
    <div>
    <div className='dh1'>
    <nav className="m-0 p-0 navbar d-flex flex-row ">
  <div className="m-0 hn1 container-fluid">
    
    <a className="navbar-brand " id='a1' href="#">
      <img src={ob1} alt="Logo" width="60" height="60" className="d-inline-block align-text-center mx-3"/>
      ORGANIC BANANAS
    </a>
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-warning btn-sm text-white" type="submit">Search</button>
    </form>
    
    <div className='m-0 dh2'>
    <ul className="dh7 d-flex flex-row justify-content-around">
        <li className={`nav-item ${location.pathname==="/" ? "c1":""}`}>
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className={`nav-item ${location.pathname==="/products" ? "c1":""}`}>
          <Link className="nav-link " to="/products">Products</Link>
        </li> 
        <li className={`nav-item ${location.pathname==="/dashboard" ? "c1":""}`}>
          <Link className="nav-link " to="/dashboard">DashBoard</Link>
        </li> 
        <li className={`nav-item ${location.pathname==="/cart" ? "c1":""}`}> 
          <Link className="nav-link" to="/cart">Order <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="pb-1 bi bi-cart3" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg> 
  </Link> 
        </li>
        
        {!localStorage.getItem("token") ?  <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>:<li onClick={handlelogout} className="nav-item">
          <Link className="nav-link" to="/">Logout</Link>
        </li>}
       
      </ul></div>
  </div>

</nav>       

      </div>
      
    </div>
  )
}


