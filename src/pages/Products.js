import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import Fruitcontext from '../context/Fruitcontext';
import { useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';

 function Products() {

  const a = useContext(Fruitcontext) ;


  useEffect( ()=>{
    if(a.product_list.length > 0)
    {

    }else{
      a.fetchData() ;
    }
  },[a.s1 , a.fi1])

  const update = (ele)=>{
    if(a.s1==ele)
    {

    }else{
    a.sets1(ele) ;
    a.setpage(0) ;
    a.setproduct_list([]) ;}
    
  }
  const update1 = (ele)=>{
    if(a.fi1==ele)
    {

    }else{
    a.setfi1(ele) ;
    a.setpage(0) ;
    a.setproduct_list([]) ;}
    
  }

  return (
    <div className='bgd1 dp1'>
    <div className='dp2 container '>
      <div className='d-flex dp21 bg-dark'>
        <h1 className='w-100 '>Products </h1>
        <div className="dropdown dn">
  <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Sort By
  </button>
  
  <ul className="dropdown-menu">
    <li onClick = {()=>{ update("amount"); }} ><a className="dropdown-item" href="#">Price(Lowest)</a></li>
    <li onClick = {()=>{ update("-amount"); }} ><a className="dropdown-item" href="#">Price(Highest)</a></li>
    <li onClick = {()=>{ update("name"); }} ><a className="dropdown-item" href="#">A-Z</a></li>
    <li onClick = {()=>{ update("-name"); }} ><a className="dropdown-item" href="#">Z-A</a></li>

  </ul>
  </div>
  <div className="dropdown dn">
  <button className="btn btn-secondary dropdown-toggle mt-2 mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Fliter
  </button>
  
  <ul className="dropdown-menu">
    <li onClick = {()=>{update1(50); }} ><a  className="dropdown-item" href="#">Below 50</a></li>
    <li onClick = {()=>{ update1(100); }} ><a className="dropdown-item" href="#">Below 100</a></li>
    <li onClick = {()=>{ update1(200); }} ><a className="dropdown-item" href="#">Below 200</a></li>
    <li onClick = {()=>{ update1(300); }} ><a className="dropdown-item" href="#">Below 300</a></li>

    

  </ul>
  
  </div>
  
</div>
  <div>
  <InfiniteScroll
  dataLength={a.product_list.length} //This is important field to render the next data
  next={a.fetchData}
  hasMore={a.product_list.length < a.total_fruits }
  loader={<Spinner/>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <p className='fw-bold mt-2 p-3 bg-dark text-light'>You are done with all Products!!</p>
    </p> 
  }
  
>
  <div className='mad'>

<div className="d-flex flex-wrap justify-content-start">

      {a.product_list.map( (product , index)=>
      { 
         

       
    return <Product key={index} p_id = {product._id} name={product.name} desc ={product.desc}amount ={product.amount}  /> 


  }
      )}
      </div>

</div>

</InfiniteScroll>


</div>
    </div>
    </div>
  )
}


export default Products ;









