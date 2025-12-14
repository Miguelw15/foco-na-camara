import { useState,useRef,useEffect } from "react";

export default function Search(){
    const [text, setText] = useState(null);
        const timeout = useRef(null);
    
        useEffect(()=>{
            if (!text) return;
    
            clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                console.log("Pesquisou")
            }, 1000);
        },[text])
    
    return (
        <div>
            <input type="text"/>
            <input type="submit" value="PESQUISAR"/>
        </div>
    )
}