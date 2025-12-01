import PartidosAPI from "../../apis/partidosAPI"
import { useEffect,useState } from "react"
import Loading from "../loading";
import CardPartido from "./card-partido";

export default function Partidos(){
    const partidosAPI = new PartidosAPI();
    const [partidos,setPartidos] = useState([]);

    useEffect(()=>{
        async function loadPartidos(){
            const response = await partidosAPI.getPartidos();

            const partidosRes = response;

            setPartidos(partidosRes);
        }
        loadPartidos();
    },[])

    return (
        <>
            {Array.isArray(partidos) && partidos.length > 0 ? (
                <div className="card-container">
                   {partidos.map((element,index)=> (
                        <CardPartido key={`${element.id}-${index}`} data={element}/>
                    )) }
                </div>
                )
                :
                (<Loading/>)
            }
        </>
    )
};