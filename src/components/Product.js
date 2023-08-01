import React from 'react'
import ob1 from "../images/ORGABIC.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Fruitcontext from '../context/Fruitcontext'
import { useContext } from 'react';

function Product(props) {
  const a = useContext(Fruitcontext) ;

  return (
    <div>
      <div className="col ">
    <div className="dp4 card h-100">
      <Link to={`/${props.name}`} ><img src={ob1} className="card-img-top" alt="..." /></Link>
      <div className="card-body">
        <h5 className="card-title">{props.name}-{props.index}</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <div className="card-footer">
        <small className="text-body-secondary">Price : {props.amount}RS</small>
        <button onClick={()=> a.addcart(props.p_id)} className='btn btn-sm btn-warning border-black float-end '>Add To Cart</button>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Product
