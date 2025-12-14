import { useEffect, useRef, useState } from "react"


export default function SourcePropCard({setTextState}){

    return (
      <div className="source-prop">
        <p>PROCURAR:</p>
        <input type="text" onChange={(e)=>{setTextState(e.target.value)}}/>
        </div>
    )
    
}