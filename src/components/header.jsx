import Search from "./Search";
import { useLocation, useNavigate } from "react-router-dom";


export default function Header(){
        
    const navigate =  useNavigate();
    const location = useLocation();

    return (
    <header>
        <nav>
            <button className={location.pathname === "/" ? "current-page" :  ""} onClick={()=>navigate('/')}>PRINCIPAL</button>
            <button className={location.pathname.startsWith("/proposicoes") ? "current-page" :  ""} onClick={()=>navigate('/proposicoes')}>PROPOSIÇÕES</button>
            <button className={location.pathname.startsWith("/eventos") ? "current-page" :  ""} onClick={()=>navigate('/eventos')}>EVENTOS</button>
            <button className={location.pathname.startsWith("/deputados") ? "current-page" :  ""} onClick={()=>navigate('/deputados')}>DEPUTADOS</button>
            <button className={location.pathname.startsWith("/partidos") ? "current-page" :  ""} onClick={()=>navigate('/partidos')}>PARTIDOS</button>

        </nav>
        <Search></Search>
    </header>
    )
}