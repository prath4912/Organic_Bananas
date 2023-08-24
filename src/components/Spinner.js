import React from 'react'
import spin from "../images/spin.gif"


export default function Spinner() {
  return (
    <div className='text-center mt-5'>
      <img src={spin} alt="" width={"40px"} />
    </div>
  )
}
