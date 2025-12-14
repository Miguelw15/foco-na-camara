import { useEffect, useState } from "react"
import DeputadosAPI from "@/apis/deputadosAPI"
import Loading from "../Loading";
import CardDeputado from "./card-deputado";

export default function Deputados(){
    const deputadosAPI = new DeputadosAPI();
    const [data,setData] = useState([]);

    useEffect(()=>{

        async function loadData(){
            const deputados = await deputadosAPI.getDeputados();
        
            setData(deputados)
        }    

        loadData();
    },[])

    return (
            <> 
                
                { data.length > 0 ?
                
                <div className="card-container margin-top">
                    {data.map((e)=>(
                        <CardDeputado key={e.id} data={e}/>
                    ))}
                </div>
                    
                : <Loading/>}
            </>
        )
    };