import { useParams } from "react-router-dom"
import PartidosAPI from "@/apis/partidosAPI";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import style from "@/styles/partidos.module.css";

import SiglaIcon from "@/assets/Tag Window.svg";
import SituacaoIcon from "@/assets/Graph.svg";
import LeaderIcon from "@/assets/Leader.svg";
import MembersInPossessionIcon from "@/assets/People.svg";
import TotalMembres from "@/assets/Management.svg";

export default function Partido(){
    const {id} = useParams();
    const partidosAPI = new PartidosAPI();
    const [data,setData] = useState();

    useEffect(()=>{
        async function loadData(){
            const data = await partidosAPI.getPartido(id);
            setData(data.dados);
        }
        loadData()
    },[])
    console.log(data)
    return (
        <>
            {data ? (
                <>
                <div className={style["partido-apresentacao"]}>
                    <h2>{data.nome}</h2>
                    <img src={data.urlLogo} alt="Partido Logo" />
                </div>
                <div className={style["partido-descricao-container"]}>
                    <div className={style["partido-descricao"]}>
                        <img src={SiglaIcon} alt="Sigla Partido"/>
                        <div className={style["partido-descricao-info"]}>
                            <strong>Sigla</strong>
                            <p>{data?.sigla}</p>
                        </div>
                    </div>
                    <div className={`${style['partido-descricao']} ${style['background-gray']}`}>
                        <img src={SituacaoIcon} alt="Situação Partido" />
                        <div className={style["partido-descricao-info"]}>
                            <strong>Situação</strong>
                            <p>{data?.status?.situacao}</p>
                        </div>
                    </div>
                    <div className={`${style['partido-descricao']}`}>
                        <img src={LeaderIcon} alt="Lider do Partido"/>
                        <div className={style['partido-descricao-info']}>
                            <strong>Lider</strong>
                            <p>{data?.status?.lider?.nome}</p>
                        </div>
                    </div>
                    <div className={`${style['partido-descricao']} ${style['background-gray']}`}>
                        <img src={MembersInPossessionIcon} alt="Membros em Posse" />
                        <div className={style['partido-descricao-info']}>
                            <strong>Membros em Posse</strong>
                            <p>{data?.status?.totalPosse}</p>
                        </div>
                    </div>
                    <div className={`${style['partido-descricao']}`}>
                        <img src={TotalMembres} alt="Total de Membros"/>
                        <div className={`${style['partido-descricao-info']}`}>
                            <strong>Total de Membros</strong>
                            <p>{data?.status?.totalMembros}</p>
                        </div>
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