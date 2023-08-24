import React from 'react'


export default function Contact_us() {
  return (
    <div style={{paddingTop:"15vh"}}>
    <div className='mnh container-sm bg-dark my-2  mt-1 p-4 w-25 rounded-3'>
      <div className='' >
        <h3 className='text-light'>Contact Us</h3>
        <form >
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Enter Name</label>
        </div>
        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Enter Mobile Number</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Enter Subject</label>
        </div>
        <button className='btn m-2 btn-primary '>Submit</button>
        </form>

      </div>
      </div>
    </div>
  )
}
