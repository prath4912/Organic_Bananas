import React from 'react'
import Clock from "../images/time-check.png"

export default function Advantages() {

    const arr = [{
        title : "Quality" ,
        subtitle : "You can trust",
        icon : Clock
    },
    {
        title : "On time" ,
        subtitle : "Guarantee",
        icon : Clock
    },
    {
        title : "Free" ,
        subtitle : "Delivery",
        icon : Clock
    },
    {
        title : "Return Policy" ,
        subtitle : "No Question asked",
        icon : Clock
    }]
  return (
    <div className='bg-white py-2'>
        <hr />
      <h1 className='font-bold text-lg text-center my-3 underline' >Why choose Organic Banana?</h1>
      <div className='flex p-1 justify-center gap-6   w-4/5  mx-auto'>
            {
                arr.map((ele)=>{
                    return <div className=' bg-gray-100  text-center basis-1/4 pb-1' >
                        <div className='p-3'>
                        <img className='mx-auto bg-white p-2 rounded-full' src={ele.icon} width={"60px"} alt="" /></div>
                        <h2 className='font-bold pb-0.5' >{ele.title}</h2>
                        <h3 className='p-1 '>{ele.subtitle}</h3>
                    </div>
                })
            }
      </div>
    </div>
  )
}
