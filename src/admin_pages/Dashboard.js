import React, { useState } from 'react'
import axios from "axios";
import {  uploadBytes ,ref } from "firebase/storage";
import storage from '../Firebase';

export default function Dashboard() {

  const [image , setimage ] =useState() ;


  const [fruit_data , setdata] = useState({name : "" , amount : 0 ,stock : 0, desc :"" , rating :"" , review : [] }) ;

    const addproducts = async (e)=>{
      e.preventDefault() ;
      // const formData = new FormData() ; 
      // formData.append("image" , image) ;
      // formData.append("name" , fruit_data.name) ;
      // formData.append("amount" , fruit_data.amount) ;
      // formData.append("desc" , fruit_data.desc) ;
      // formData.append("stock" , fruit_data.stock) ;
      const storageRef = ref(storage , `images/${fruit_data.name}`);

      uploadBytes(storageRef , image).then((snapshot) => {
        alert('Uploaded a blob or file!');
        console.log(snapshot) ;
      });
    

      const data = await axios.post("http://localhost:5000/api/admin/insert"   ,
      {name : fruit_data.name , amount : fruit_data.amount , desc : fruit_data.desc , stock : fruit_data.stock },{
        headers: {
          'Content-Type': 'application/json'
        }}) ;  
        console.log(data.data);
      }

        const onchange = (e)=>{
          setdata({...fruit_data , [e.target.name] : e.target.value}) ;
        }

      const onchange5 = (e)=>{
        setimage(e.target.files[0]) ;
      }

     
  return (
    <div className='dd1'>



{/* {image=="" || image==null ? "" :<img src={image} alt="" />
} */}
{/*  */}
{/*  */}
 {/* <!-- Button trigger modal --> */}
 <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Insert Fruit
</button>

{/* <!-- Modal --> */}
<div className="h-75 modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
    <form onSubmit={addproducts}>

      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Insert Fruit Products</h1>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

          
   <div  className="form-floating mb-3">
  <input onChange={onchange} type="text" className="form-control" id="name" name="name" value = {fruit_data.name} placeholder=""/>
  <label htmlFor="name">Enter Name</label>
</div>
<div className="form-floating mb-3">
  <input onChange={onchange} type="Number" className="form-control" id="amount" name="amount"value={fruit_data.amount} placeholder="0"/>
  <label htmlFor="amount">Enter Amount</label>
</div>
<div className="form-floating my-3">
  <textarea onChange={onchange} className="form-control" placeholder="" name="desc" id="desc" value={fruit_data.desc} style={{height: "100px"}}></textarea>
  <label htmlFor="desc">Descrption</label>
</div>
<div className="form-floating mb-3">
  <input onChange={onchange} type="Number" className="form-control" id="stock" name="stock" value={fruit_data.stock} placeholder=""/>
  <label htmlFor="stock">Enter Stock</label>
</div>
<div>

</div>
<div>
{/* <label for="file-upload" className="custom-file-upload">
    <i className="fa fa-cloud-upload"></i> Select Image
</label> */}
  <input  id="file-upload" type="file" accept='image/*' onChange={onchange5} />
 
</div>




            </div>

            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button className='btn btn-warning' type='submit'>ADD</button>

            

          </div>
          </form>
    </div>
   

  </div>
</div>




    </div>
  )
}
