import { useEffect, useState } from "react"
import DeputadosAPI from "@/apis/deputadosAPI"
import Loading from "@/components/Loading";
import CardDeputado from "./card-deputado";
import { useSearchParams } from "react-router-dom";
import NotFound from "../NotFound";

export default function Deputados(){
    const deputadosAPI = new DeputadosAPI();
    const [data,setData] = useState([]);
    const [params] = useSearchParams();
    const search = params.get("search");
    const [hasGenerate, setHasGenerate] = useState(false);

    useEffect(()=>{

        setData([]);
        setHasGenerate(false);
        
        async function loadData(){
            const deputados = search
            ? await deputadosAPI.getDeputados({nome : search}) 
            : await deputadosAPI.getDeputados({itens:15});
            setHasGenerate(true);
            setData(deputados)
        }    
        loadData();
    },[search])

    return (
            <> 
                { hasGenerate ?
                <>
                {
                    data.length > 0 ?
                    <div className="grid">
                        <div className="card-container">
                            {data.map((e)=>(
                                <CardDeputado key={e.id} data={e}/>
                            ))}
                        </div>
                    </div>
                    :
                    <NotFound/>
                    }
                </>
                
                : <Loading/>}
            </>
        )
    };