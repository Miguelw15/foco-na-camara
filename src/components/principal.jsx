import { createRoot } from "react-dom/client"
import Loading from "./loading"
import { useState,useEffect } from "react"
const controller = new AbortController();
var signal = controller.signal

export default function Principal(){
    const [valor,setValor] = useState();
    useEffect(()=>{
        
    },[])
    
    return (
        <>
            <button style={{margin: "100px"}} onClick={()=>{
                fetch('http://127.0.0.1:9090/api',{signal,cache:"no-store"})
                .then(res=>{return res.json()})
                .then(data=>console.log(data))
                .catch(error=>{console.log(error)})
            
            }}>FETCH</button>

            <button style={{margin:"120px"}} onClick={()=>{controller.abort()}}>ABORT</button>
        </>
        
    )

};