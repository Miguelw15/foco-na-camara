import { useParams } from "react-router-dom"
import PartidosAPI from "@/apis/partidosAPI";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import style from "@/styles/partidos.module.css";

import SiglaIcon from "@/assets/Tag Window.svg";
import SituacaoIcon from "@/assets/Graph.svg";
import LeaderIcon from "@/assets/Leader.svg";
import MembersInPossessionIcon from "@/assets/People.svg";
import TotalMembres from "@/assets/Management.svg";
import LogoPartido from "./logo-partido";
import DeputadosAPI from "@/apis/deputadosAPI";
import CardDeputado from "@/components/deputados/card-deputado";

export default function Partido(){
    const {id} = useParams();
    const partidosAPI = new PartidosAPI();
    const deputadosAPI = new DeputadosAPI();
    const [partidoData,setPartidoData] = useState();
    const [membros, setMembros] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const maxPages = 5
    useEffect(()=>{
        async function loadData(){
            const data = await partidosAPI.getPartido(id);
            setPartidoData(data.dados);
        }
        loadData()
    },[])

    useEffect(()=>{
        async function loadData(){
            
            const deputados = await deputadosAPI.getDeputados({partido: partidoData.sigla});
            const result = [];
            for (let i = 0; i < deputados.length; i+10 ){
                result.push(deputados.slice(i,i+=10));
            }
            
            setMembros(result);
        }

        if (partidoData?.sigla) {
            loadData();
        }

    },[partidoData])

    console.log(currentPage)
    return (
        <>
            {partidoData && membros ? (
                <>
                <div className={style["partido-logo-container"]}>
                    <LogoPartido sigla={partidoData?.sigla}/>
                </div>
                <div className={style["partido-descricao-container"]}>
                    <div className={style["partido-descricao"]}>
                        <img src={SiglaIcon} alt="Sigla Partido"/>
                        <div className={style["partido-descricao-info"]}>
                            <strong>Sigla</strong>
                            <p>{partidoData?.sigla}</p>
                        </div>
                    </div>
                    <div className={`${style['partido-descricao']} ${style['background-gray']}`}>
                        <img src={SituacaoIcon} alt="Situação Partido" />
                        <div className={style["partido-descricao-info"]}>
                            <strong>Situação</strong>
                            <p>{partidoData?.status?.situacao}</p>
                        </div>
                    </div>
                    <div className={`${style['partido-descricao']}`}>
                        <img src={LeaderIcon} alt="Lider do Partido"/>
                        <div className={style['partido-descricao-info']}>
                            <strong>Lider</strong>
                            <p>{partidoData?.status?.lider?.nome}</p>
                        </div>
                    </div>
                    <div className={`${style['partido-descricao']} ${style['background-gray']}`}>
                        <img src={MembersInPossessionIcon} alt="Membros em Posse" />
                        <div className={style['partido-descricao-info']}>
                            <strong>Membros em Posse</strong>
                            <p>{partidoData?.status?.totalPosse}</p>
                        </div>
                    </div>
                    <div className={`${style['partido-descricao']}`}>
                        <img src={TotalMembres} alt="Total de Membros"/>
                        <div className={`${style['partido-descricao-info']}`}>
                            <strong>Total de Membros</strong>
                            <p>{partidoData?.status?.totalMembros}</p>
                        </div>
                    </div>
                </div>

                <div className='grid' style={{rowGap:"30px"}}>
                    <div className={style["members-container"]}>
                        <h2>Membros:</h2> 
                        <div className={style["members-page"]}>
                            <span>Páginas:</span>
                            {
                                currentPage !== null ?
                                    <div style={{display:"flex",gap: "10px"}}>
                                    {membros.map((_,i)=>(
                                        <>
                                        {Math.abs(currentPage - i) <= 1 ? (<div key={i} 
                                            style={{cursor:"pointer",width: "max-content"}} onClick={(_)=>{setCurrentPage(i)}}>{currentPage == i ? <strong>{`[${i+1}]`}</strong> : i+1}</div>
                                        ) : null
                                        }
                                        </>
                                ))}
                                </div>
                                : ""
                            }
                            
                            
                        </div>
                    </div>
                    <div className="card-container">
                        
                    {membros[currentPage].map((e,i)=>(
                        <CardDeputado key={i} data={e}/> 
                    ))}

                    </div>
                </div>
                </>
                
            )
            :
            <Loading/>
            }
            
        </>
    )
}