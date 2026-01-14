import Search from "@/components/Search";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@/assets/Menu.png"
import { useEffect, useRef, useState } from "react";

export default function TopBar(){
    const [menuOpen,setMenuOpen] = useState(false);
    const navigate =  useNavigate();
    const location = useLocation();
    const menuRef = useRef();

    useEffect(()=>{
        if (menuOpen){ menuRef.current.classList.add("open"); document.body.style.overflow = "hidden";}
        if (!menuOpen) {menuRef.current.classList.remove("open"); document.body.style.overflow = "";}
    },[menuOpen])

    return (
    <header>
        
        
        
        <div className="menu" onClick={()=>{
            setMenuOpen(prev => !prev);
        }}>
            <img src={MenuIcon} alt="Menu Icon" />
        </div>
        <div ref={menuRef} className={`hidden-menu-overlay`}>
            
            <div className={`hidden-menu ${menuOpen? "open" : ""}`}>
                    <button className={location.pathname === "/" ? "current-page" :  ""} onClick={()=>navigate('/')}>PRINCIPAL</button>
                    <button className={location.pathname.startsWith("/proposicoes") ? "current-page" :  ""} onClick={()=>navigate('/proposicoes')}>PROPOSIÇÕES</button>
                    {/*<button className={location.pathname.startsWith("/eventos") ? "current-page" :  ""} onClick={()=>navigate('/eventos')}>EVENTOS</button>*/}            <button className={location.pathname.startsWith("/deputados") ? "current-page" :  ""} onClick={()=>navigate('/deputados')}>DEPUTADOS</button>
                    <button className={location.pathname.startsWith("/partidos") ? "current-page" :  ""} onClick={()=>navigate('/partidos')}>PARTIDOS</button>
                </div>
        </div>

        
        <nav>
            <button className={location.pathname === "/" ? "current-page" :  ""} onClick={()=>navigate('/')}>PRINCIPAL</button>
            <button className={location.pathname.startsWith("/proposicoes") ? "current-page" :  ""} onClick={()=>navigate('/proposicoes')}>PROPOSIÇÕES</button>
            {/*<button className={location.pathname.startsWith("/eventos") ? "current-page" :  ""} onClick={()=>navigate('/eventos')}>EVENTOS</button>*/}            <button className={location.pathname.startsWith("/deputados") ? "current-page" :  ""} onClick={()=>navigate('/deputados')}>DEPUTADOS</button>
            <button className={location.pathname.startsWith("/partidos") ? "current-page" :  ""} onClick={()=>navigate('/partidos')}>PARTIDOS</button>
        </nav>
            
        <Search></Search>
    </header>
    )
}