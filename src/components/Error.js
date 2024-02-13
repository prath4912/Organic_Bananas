import React from 'react'
import Warn from '../images/warning.png'


export default function Error(props) {
  return (
    <div>
       {props.error && <div className="border-2 mt-10 w-72  shadow-md shadow-red-600 border-red-600 p-2 flex items-center gap-3" >
        
        <div> <img src={Warn} width={30} alt="" /> </div><div><h3 className="font-semibold text-red-500" >There was a problem</h3><p className="text-sm" >{props.error}</p></div>
   </div>}
    </div>
  )
}
