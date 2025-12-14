import style from "@/styles/eventos.module.css";
import CalendarIcon from "@/assets/Calendar.png";
import LinesEllipsis from "react-lines-ellipsis";
import { useNavigate } from "react-router-dom";
import VideoIcon from "@/assets/Video.png";

export default function CardEvento({data}){
    const navigate = useNavigate();
    return (
        <>
        <div className={style['card-evento']}>
            
            <div className={style['card-evento-data']}>
                <img src={CalendarIcon} alt="Icone de Calendário" />
                <div className={style['card-evento-data-info']}>
                    <span>Data</span>
                    <span>{`${data.dataHoraInicio.split("T")[0].split("-")[2]}/${data.dataHoraInicio.split("T")[0].split("-")[1]}/${data.dataHoraInicio.split("T")[0].split("-")[0]}`}</span>
               </div>
            </div>
            <div className={style['card-evento-description']}>
                <h3>{data.descricaoTipo}</h3>
                <LinesEllipsis text={data.descricao} maxLine={1}/>
                <div className={style["card-evento-buttons"]}>
                    <button onClick={()=>{navigate(`/eventos/${data.id}`)}} className="view-more">Ver mais</button>
                    {data.urlRegistro != null ? 
                    <div onClick={()=>{
                        window.open(`${data.urlRegistro}`,"_blank","noopener, noreferrer");
                    }} className={style["card-evento-assistir"]}>
                        <img src={VideoIcon} alt="Video Icon" />
                        <p>Assistir Online</p>
                    </div> : ""
                    }
                </div>
                
            </div>
        </div>
        </>
    )
}