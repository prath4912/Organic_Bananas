import React from 'react'
import useQuery from '../hooks/useQuery'

export default function Paymentsucces() {
    const query = useQuery() ;
    const ref = query.get("referance") ;
    console.log(ref) ;
  return (
    <div>
        <div className='h-50'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quidem consequatur eum eius vero exercitationem iure nisi nemo, harum, explicabo iste. Doloribus aperiam ullam commodi, corporis tempora mollitia nesciunt nemo ipsum adipisci error quaerat, in at ad enim repellat, ex deserunt eum nihil atque architecto harum autem dolorem provident quam. Porro, delectus aliquam ipsum est, alias ipsa possimus saepe eum voluptates dolore a doloremque, libero dolorum consequatur sequi fugit quaerat.
        </div>
        <h1>Order Completed </h1>
      <div>{ref}</div>
    </div> 
  )
}
