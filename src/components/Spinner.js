import React from 'react'
import spin from "../images/spin.gif"


export default function Spinner() {
  return (
    <div className='text-center'>
      <img src={spin} alt="" width={"40px"} />
    </div>
  )
}
