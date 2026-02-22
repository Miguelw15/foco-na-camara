import { useState,useRef,useEffect } from "react";
import searchIcon from "@/assets/Search.svg";
import { useNavigate } from "react-router-dom";

export default function Search(){
    const [text, setText] = useState("");
    const overlayRef = useRef(null);
    const searchRef = useRef(null);
    const searchOptionsRef = useRef(null);
    const navigate = useNavigate();

    return (
        <>
        <div ref={overlayRef} className="search-options-overlay"></div>

        <div className="search-container">
            
            <div ref={searchRef} className="search">
                <input id="options" list="options" onFocus={()=>{
                    if (text.length > 0){
                        searchOptionsRef.current.style.display = "flex"
                        searchOptionsRef.current.style.zIndex = "6"
                    }
                    overlayRef.current.classList.add("open");
                    searchRef.current.style.zIndex = "5";
                    
                }} onBlur={()=>{
                    overlayRef.current.classList.remove("open");
                    searchRef.current.style.zIndex = "0";
                    searchOptionsRef.current.style.display = "none";
                    searchOptionsRef.current.style.zIndex = "0";

                }} onChange={(e)=>{
                    setText(e.target.value);
                    if (e.target.value.length != 0) {
                        searchOptionsRef.current.style.display = "flex"
                        searchOptionsRef.current.style.zIndex = "6"
                    
                    }  
                    else if (e.target.value.length==0){
                        searchOptionsRef.current.style.display = "none";
                        searchOptionsRef.current.style.zIndex = "0";
                    }
                    
                }} className="search-text" type="text"/>

                <span className="search-submit-icon"><img src={searchIcon} alt="Icon" /></span>
                
            </div>
            <div ref={searchOptionsRef} className="search-options">
                <div 
                onMouseDown={(e)=>{
                    searchRef.current.querySelector(".search-text").value = ""
                    navigate(`/proposicoes?search=${text}`);
                }} className="search-option">{text} em <span>Proposições</span></div>
                <div onMouseDown={(e)=>{
                    searchRef.current.querySelector(".search-text").value = ""
                    navigate(`/deputados?search=${text}`);
                }} className="search-option">{text} em <span>Deputados</span> </div>
                {/*<div onMouseDown={(e)=>{
                    searchRef.current.querySelector(".search-text").value = ""
                    navigate(`/partidos?search=${text}`);
                }} className="search-option">{text} em <span>Partidos</span> </div>*/}
            </div>
        </div>
        
        </>
        
    )
}