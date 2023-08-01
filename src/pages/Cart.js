import React, { useEffect, useState } from 'react'
import b1 from "../images/ORGABIC.png"
import Fruitcontext from '../context/Fruitcontext';
import { useContext } from 'react';

function Cart(props) {

  const [add1 ,setadd] = useState("") ;
  const onchange = (e)=>{
    // const add2 = add1 + e.target.value ;
    setadd(e.target.value) ;
  }

  const handlep = ()=>{


  }
const a = useContext(Fruitcontext) ;

  const [count ,setc] = useState(1) ;
  const removehandle = (index)=>{

   a.cart.splice(index,1) ;
   localStorage.setItem("cart" , JSON.stringify(a.cart)) ;

   inc() ;
  }

  const inc = ()=>{
    setc(count+1); 

  }

  useEffect(()=>{

  },[count])

  var total_cost =0 ;
  return (

    <div className='cd2'>
      <div className='p-3 container bg-dark'>
      <h1 className='w-100'>Items </h1>
        { a.cart.length ? a.cart.map((cart,index)=>{

          total_cost = total_cost+cart.product.amount*cart.quantity ;

          return <div className=" card mb-3" style={ {maxWidth : "75%"}}>
          <div className="row g-0">
            <div className="col-md-2">
              <img src={b1} className="img-fluid rounded-start" alt="..."/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{cart.product.name}</h5>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
              </div>
              <div><button className='btn-sm' onClick={()=>{a.subq(index) ; inc()}}>-</button>{cart.quantity  }<button onClick={()=>{a.addq(index) ; inc()}} className='btn-sm'>+</button> </div>
              <button onClick={()=>removehandle(index)} className='btn btn-sm btn-warning border-black mx-2 '>Remove</button>
            </div>
          </div>
        </div> ;
        }) : <div style={{color:"white"}}>Cart Is Empty </div>  } ;
      </div>

      {/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Proceed To Buy
</button>

{/* <!-- Modal --> */}
<div className="h-75 modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Checkout To Buy</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

          <div onSubmit={handlep} class="form-floating mb-3">
                <input type="text" class="form-control" id="add" name='add' value={add1} onChange={onchange} placeholder=""/>
              <label for="add">Enter Delivery Address</label>
              </div>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit"  onClick={!localStorage.getItem("token")? ()=>{alert("Login Required")}     : ()=>props.checkoutHandler(total_cost , add1)} data-bs-dismiss="modal" className="btn btn-primary">Proceed To Payment</button>
          </div>
    </div>
  </div>
</div>
      {/* <button className='btn btn-primary cd1'  onClick={!localStorage.getItem("token")? ()=>{alert("Login Required")}     : ()=>props.checkoutHandler(total_cost)}>Proceed To Buy</button> */}
    </div>
  )
}

export default Cart
