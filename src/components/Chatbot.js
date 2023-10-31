import React ,{useState ,useEffect} from "react";
import "./Chatbot.css";


// Pop up on clicking chatbot icon done
// send using icon 
// scroll done
// left crossing box done
//meesges out of box done

const Chatbot = (props) => {

const data = props.data ;
const[arr , setarr]=useState([]) ;

const[text , settext]=useState("") ;
const[text1 , settext1]=useState("k") ;

function containsOnlySpaces(str) {
    return str.trim().length === 0;
  }

function getBotResponse(input) {
  // Loop through the intents
  for (let i = 0; i < data.intents.length; i++) {
    const intent = data.intents[i];
    // Loop through the patterns of the current intent
    for (let j = 0; j < intent.patterns.length; j++) {
      const pattern = intent.patterns[j];
      // Check if the user input matches the current pattern
      if (input.toLowerCase().includes(pattern.toLowerCase())) {
        // Return a random response from the responses of the current intent
        const responses = intent.responses;
        const response = responses[Math.floor(Math.random() * responses.length)];
        return response ;
        
      }
    }
  }
  // If no match is found, return a default response
  return "I'm sorry, I didn't understand what you're asking.";
}

const updatearr=()=>{
    if(text==="")
    {

    }
    else
    {
    settext1(text) ;
    settext("")
    }
  }

  const updatearr1 = ()=>{
   
    if(containsOnlySpaces(text1))
    {
    }else
    {
    let reb = getBotResponse(text1) ;
    console.log(reb) ;
    setarr(arr.concat(
      {
        userd : text1 ,
        botd : reb
      }));
      settext1("") ;
    //   if(arr.length>4)
    //   document.getElementById("ctextinput").scrollIntoView(true);

    }
  }

  useEffect(()=>{
    updatearr1() ;
  },[text1]) ;


const onc = (event)=>{   
    settext(event.target.value)
  }
// var flag = true ;
  const cnum = ()=>{
    if( document.getElementById("ctb1").style.visibility =="visible")
    {
    document.getElementById("ctb1").style.visibility = "hidden" ;
    }else
    {     setTimeout(() => {
      document.getElementById("ctb1").style.visibility = "visible" ;

    }, 500);
    }
  }



  return (
    <>
          
<p  className="cbtn1" >
  <a className="btn btn-warning" id="ctb1" style={{visibility :"visible"}}  data-bs-toggle="collapse" onClick={cnum}  href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(93, 0, 93)" className="bi bi-chat-right-fill" viewBox="0 0 16 16">
  <path d="M14 0a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
</svg>
  </a>
</p>
      <div className="collapse bg1" id="collapseExample">
    <div className="cb1">
      <div className="chh1">
      <div>
  <a className="l1" data-bs-toggle="collapse" href="#collapseExample" onClick={cnum} role="" aria-expanded="false" aria-controls="collapseExample">
  <h1 className="ch1"> Ask ME</h1>
  </a>

</div>
      </div>
      <div className="achat">
        {/* <p className='prath' >How are You ?</p>
            <p className='bot'>I am Fine. What about You ?</p> */}
        <div id="cb3">
        {arr.map((element, index) => {
          return (
            <div key={index}>
              {index && element !== "" ? (
                <div className="cb5">
                    <p  className='prath' >{element.userd}</p>
                    <p className='bot' >{element.botd}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      </div>
      </div>

      <div className="cb2">
        <input onChange={onc} placeholder="Enter Here" type="text" value={text}/>
        <div className="ibtn" onClick={updatearr}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-send-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
</svg></div>
      </div>
    </div>
    </>
    
  );
};

export default Chatbot;
