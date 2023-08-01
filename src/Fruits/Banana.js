import b1 from "../images/ORGABIC.png"
import { useContext ,React} from 'react'
import Fruitcontext from "../context/Fruitcontext"

function Banana(props) {
  const a = useContext(Fruitcontext) ;


  console.log() ;
  return (
    <div className='fb1'>
      <h1 className='text-center'>{a.s1.name}</h1>
      <button onClick={a.update} >Click Me</button>
      <div><img src={b1} alt="" /></div>
      <div>
        {a.s1.map((item)=>{
          return <h1>{item}</h1>
        })
        }
      </div>
      {/* <button onClick={()=>props.itemhandle(props.index)} className='btn btn-sm btn-warning border-black float-end '>Add To Cart</button> */}
    </div>
  )
}

export default Banana
