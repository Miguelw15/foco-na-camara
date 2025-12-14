import EventosAPI from "@/apis/eventosAPI"
import { useEffect, useState } from "react";
import CardEvento from "./card-evento";
import style from "@/styles/eventos.module.css";
import Loading from "../Loading";



export default function Eventos(){
    const [eventos, setEventos] = useState();    

    useEffect(()=>{
        async function loadData(){
            
            const eventosAPI = new EventosAPI();
            const evs = await eventosAPI.getEventos();
            setEventos(evs);      
        }
        loadData()
    },[])

return (
     
     <>
     {eventos?
        <div className={style['card-evento-container']}>
            {eventos.map((e)=>(
                <CardEvento key={e.id} data={e} />
            ))}
        </div>
      : <Loading/>}
     </>    
    )
};