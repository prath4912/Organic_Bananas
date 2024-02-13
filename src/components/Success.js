import React from 'react'
import check from '../images/check.png'

export default function Success(props) {
  return (
    <div>
      {props.message &&  <div className="shadow-md shadow-green-400 my-4 p-2 flex items-center border-2 ">
                <div className="me-2">
                    
                  <img src={check} width={30} alt="" />
                </div>{" "}
                {props.message}
              </div>}
    </div>
  )
}
