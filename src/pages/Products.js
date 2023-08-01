import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import Fruitcontext from '../context/Fruitcontext';
import { useContext } from 'react';

export default function Products(props) {

  const a = useContext(Fruitcontext) ;


 const [count,setcount] = useState(5) ;

  useEffect(()=>{
  } , [count]) ;

  const sort_fun1 = ()=>{
    let new_list = a.product_list.sort( (a,b)=>{
      if(a.name>b.name)
      {
        return 1 ;
      }else if(a.name<b.name)
      {
        return -1 ;
      }else{
        return 0 ;
      }
     
    }) ;
    a.setlist(new_list) ;
    setcount(count+1) ;
  }
  const sort_fun2 = ()=>{
      let new_list = a.product_list.sort( (a,b)=>{
        if(a.name>b.name)
        {
          return -1 ;
        }else if(a.name<b.name)
        {
          return 1 ;
        }else{
          return 0 ;
        }
      }) ;
    

    a.setlist(new_list) ;
    setcount(count+1) ;
  };
  const sort_fun3 = ()=>{
    let new_list = a.product_list.sort( (a,b)=>{
      if(a.amount>b.amount)
      {
        return -1 ;
      }else if(a.amount<b.amount)
      {
        return 1 ;
      }else{
        return 0 ;
      }
    }) ;
  a.setlist(new_list) ;
  setcount(count+1) ;
};

const sort_fun5 = ()=>{

  const fun_filter = (item)=>{
    return item.amount<=50 ;
  }

  let new_list = a.product_list.filter(fun_filter); 
  a.setlist(new_list) ;
  setcount(count+1) ;
}

const sort_fun4 = ()=>{
  let new_list = a.product_list.sort( (a,b)=>{
    if(a.amount>b.amount)
    {
      return 1 ;
    }else if(a.amount<b.amount)
    {
      return -1 ;
    }else{
      return 0 ;
    }
  }) ;


a.setlist(new_list) ;
setcount(count+1) ;
};


  return (
    <div className='bgd1 dp1'>
      
    <div className='dp2 container'>
      <div className='d-flex dp21'>
        <h1 className='w-100'>Products </h1>
        <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Sort By
  </button>
  
  <ul className="dropdown-menu">
    <li><a onClick={sort_fun4} className="dropdown-item" href="#">Price(Lowest)</a></li>
    <li><a onClick={sort_fun3}className="dropdown-item" href="#">Price(Highest)</a></li>
    <li><a onClick={sort_fun1}className="dropdown-item" href="#">A-Z</a></li>
    <li><a onClick={sort_fun2}className="dropdown-item" href="#">Z-A</a></li>

  </ul>
  </div>
  <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Fliter
  </button>
  
  <ul className="dropdown-menu">
    <li><a onClick={sort_fun5} className="dropdown-item" href="#">Below 50</a></li>
    <li><a onClick={sort_fun5}className="dropdown-item" href="#">Below 100</a></li>
    {/* <li><a onClick={sort_fun1}className="dropdown-item" href="#">A-Z</a></li>
    <li><a onClick={sort_fun2}className="dropdown-item" href="#">Z-A</a></li> */}

  </ul>
  </div>
</div>
        <div className=" row row-cols-1 row-cols-md-3 g-4">
      {a.list.map((product , index)=>
               <Product p_id = {product.id} name={product.name} amount ={product.amount}  /> 

      )}
     

</div>
    </div>
    </div>
  )
}










