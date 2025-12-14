import { useRef, useEffect } from "react";
import style from "@/styles/partidos.module.css";


export default function LogoPartido({sigla}){
    const fit_text_ref = useRef();

    useEffect(()=>{
        const el = fit_text_ref.current;
        const parent = el.parentElement;

        let maxSize = 18;
        el.style.fontSize = maxSize + "px";

        while (el.scrollWidth > parent.clientWidth){
            maxSize--;
            el.style.fontSize = maxSize + "px";
        }
    },
    [sigla])

    return ( 
        <div className={style['partido-logo']}>
            <span ref={fit_text_ref}>{sigla}</span>
        </div>
    )
}