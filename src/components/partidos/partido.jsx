import { useParams } from "react-router-dom"
import PartidosAPI from "@/apis/partidosAPI";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import style from "@/styles/partidos.module.css";

import SiglaIcon from "@/assets/Tag Window.svg";
import SituacaoIcon from "@/assets/Graph.svg";
import LeaderIcon from "@/assets/Leader.svg";
import MembersInPossessionIcon from "@/assets/People.svg";
import TotalMembres from "@/assets/Management.svg";
import LogoPartido from "./logo-partido";
import DeputadosAPI from "@/apis/deputadosAPI";
import CardDeputado from "../deputados/card-deputado";

export default function Partido(){
    const {id} = useParams();
    const partidosAPI = new PartidosAPI();
    const deputadosAPI = new DeputadosAPI();
    const [partidoData,setPartidoData] = useState();
    const [membros, setMembros] = useState();

    useEffect(()=>{
        async function loadData(){
            const data = await partidosAPI.getPartido(id);
            setPartidoData(data.dados);
        }
        loadData()
    },[])

    useEffect(()=>{
        async function loadData(){
            const data = await deputadosAPI.getDeputados(15,partidoData.sigla);
            setMembros(data);
        }

        if (partidoData?.sigla) {
            loadData();
        }

    },[partidoData])

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

                <div className={style['partido-membros-container']}>
                    <h2>Membros:</h2>
                    <div className="card-container">
                        
                    {membros.map((e)=>(
                           <CardDeputado data={e}/> 
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