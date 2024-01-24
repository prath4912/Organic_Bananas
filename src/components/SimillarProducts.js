import React, { useContext } from 'react'
import Fruitcontext from '../context/Fruitcontext';
import Product from './Product';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function SimillarProducts() {
    const a = useContext(Fruitcontext) ;
    console.log(a.product_list);
  return (
    <div>
        <hr />
        <div className='w-4/5 mx-auto bg-zinc-100 rounded p-2 my-2'>
        <Link to="/products" className='float-right pt-2 me-4 text-blue-400 underline hover:font-bold transition-all' >See More</Link>

        <h1 className='text-start text-2xl mt-3 font-bold my-2 ms-4'>Similar Products</h1>
       <div className="flex flex-wrap justify-content-start gap-2  ">
       {a.product_list.map((product, index) => {
                    if(index>8)
                    {
                        return
                    }
                    return (
                      <Product
                        key={index}
                        p_id={product._id}
                        name={product.name}
                        desc={""}
                        amount={product.amount}
                        image={product.image[0]}
                      />
                    );
                  })}
          </div>
          </div>
    </div>
  )
}
