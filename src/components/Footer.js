import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Footer() {
  return (
    <div className='bg-body-secondary text-black'>
      <div className='h-50 container-fluid '>
         <div className='fd1 p-3'>
            <h4 className='text-black'>Links</h4>
            <li><a className='text-black' href="#"><img src="" alt="" />InstaGram</a></li>
            <li><a className='text-black' href="#"><img src="" alt="" />Linkedin</a></li>
            <li><a className='text-black' href="#"><img src="" alt="" />Whatsapp</a></li>
            <Link className='link-primary m-0 p-0 ' to="/contact_us" >Contact US</Link>

         </div>

         <div className='  text-black text-center p-2'>© 1996-2023, Amazon.com, Inc. or its affiliates</div>
         <div className='position-relative bottom-0 end-0'>
          <Link className='link-primary m-0 p-0 ' to="/adminlogin" >Admin Login</Link>
         </div>
      </div>
    </div>
  )
}
