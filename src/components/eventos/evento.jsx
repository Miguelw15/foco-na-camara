import EventosAPI from "@/apis/eventosAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "@/styles/eventos.module.css";
import Loading from "@/components/Loading";
import VideoIcon from "@/assets/Video.png";

export default function Evento() {
    const {id} = useParams();
    const [evento,setEvento] = useState();
    const eventosAPI = new EventosAPI();

    useEffect(()=>{
        async function loadData(){
            const data = await eventosAPI.getEvento(id);

            setEvento(data);
        }

        loadData();
    },[])
    console.log(evento)
    return (
        <>
        {evento ? 
        <div className={style["evento-container"]}>
            <div className={style["evento"]}>
                <p>{`${evento.id} - ${evento.situacao}`}</p>
                <h2>{evento.descricaoTipo}</h2>
                <p>{`${evento.descricao}`}</p>
                <p><strong>Local: </strong>{evento.localCamara.nome}</p>
                <p><strong>Inicio: </strong>{`${evento.dataHoraInicio.split("T")[0].replaceAll("-","/")} - ${evento.dataHoraInicio.split("T")[1]}`}</p>
                <p><strong>Fim: </strong>{`${evento.dataHoraFim ? `${evento.dataHoraFim.split("T")[0].replaceAll("-","/")} - `:"Indefinido"}${evento.dataHoraFim ? evento.dataHoraFim.split("T")[1].replaceAll("-","/"):""}`}</p>
                {evento.urlRegistro ? 
                <div onClick={()=>{
                    window.open(`${evento.urlRegistro}`,"_blank","noopener, noreferrer");
                }} className={style["card-evento-assistir"]}>
                    <img src={VideoIcon} alt="Video Icon" />
                    <p>Assistir Online</p>
                </div>
                : ""
                }
                
            </div>
        </div>:
        <Loading/>}
        </>
    )
}
