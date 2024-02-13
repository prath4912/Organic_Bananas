import React, { useContext } from 'react'
import Fruitcontext from '../context/Fruitcontext';
import SPcard from './SPcard';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function FeaturedProduct(props) {
    const a = useContext(Fruitcontext) ;
  return (
    <div  >
        <div className='w-full lg:w-4/5 lg:mx-auto bg-zinc-100 rounded p-0.5 lg:p-2 my-2'>
        <Link to="/products" className='float-right pt-2 me-4 text-blue-400 underline hover:font-bold transition-all' >See More</Link>

        <h1 className='text-start text-2xl mt-3 font-bold my-2 ms-1 lg:ms-4'>{props.title}</h1>
       <div className="flex whitespace-nowrap overflow-auto  lg:w-full lg:flex-wrap lg:justify-start gap-1 lg:gap-2  ">
       {a.product_list.map((product, index) => {
                    if( index>8 || product._id==props.id )
                    {
                      return
                    }
                    return (
                      <SPcard
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
