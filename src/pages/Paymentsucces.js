import React from 'react'
import useQuery from '../hooks/useQuery'

export default function Paymentsucces() {
    const query = useQuery() ;
    const ref = query.get("referance") ;
    console.log('evavf');
  return (
    <div>
        <div className='text-center bg-warning' style={{paddingTop : "16vh"}}>
        <h3 className=' bg-dark  text-light  p-3 text-center'>Order Completed </h3>
        <button className='btn btn-dark my-5'>view Order</button>
        <p className='p-3 text-dark fw-bold '>Payment ID : {ref}</p>
        </div>
    </div> 
  )
}
