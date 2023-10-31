import React from 'react'


export default function Contact_us() {
  return (
    <div style={{paddingTop:"15vh"}}>
    <div className='mnh container-sm bg-dark my-2  mt-1 p-4 w-25 rounded-3'>
      <div className='' >
        <h3 className='text-light'>Contact Us</h3>
        <form >
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Enter Name</label>
        </div>
        <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Enter Mobile Number</label>
        </div>
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Enter Subject</label>
        </div>
        <button className='btn m-2 btn-primary '>Submit</button>
        </form>

      </div>
      </div>
    </div>
  )
}
