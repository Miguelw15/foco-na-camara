import Loading from "@/components/loading.jsx";
import { useState,useEffect } from "react";
import style from "@/styles/principal.module.css";
import { useNavigate } from "react-router-dom";
import DeputadosAPI from "@/apis/deputadosAPI.js";
import ProposicoesAPI from "@/apis/proposicoesAPI.js";
import EventosAPI from "@/apis/eventosAPI.js";
import { categoriasProposicoes } from "@/../config.js";
import CardEvento from "@/components/eventos/card-evento.jsx";
import CardDeputado from "@/components/deputados/card-deputado.jsx";
import CardProposicao from "@/components/proposicoes/card-proposicao.jsx";

export default function Principal(){
    const navigate = useNavigate();
    const [eventos,setEventos] = useState();
    const [deputados, setDeputados] = useState();
    const [proposicoes, setProposicoes] = useState();

    const deputadosAPI = new DeputadosAPI();
    const proposicoesAPI = new ProposicoesAPI();
    const eventosAPI = new EventosAPI();

    useEffect(()=>{

        async function loadData(){
            const deps = await deputadosAPI.getDeputados(3);
            const props = await proposicoesAPI.getPropsInDate(4, categoriasProposicoes.legislativas); 
            const evs = await eventosAPI.getEventos(3);

            const getFullProps = await Promise.all(
                props.map(async e=>{
                    const details = await proposicoesAPI.getProp(e.dados.id);
                    return details.dados;
                })
            )

            setEventos(evs);
            setDeputados(deps);
            setProposicoes(getFullProps);

        }
        loadData();
    },[])
    console.log(proposicoes)
    return (
        <>
        <div className={style["principal-container"]}>
            <div className={style["principal-apresentacao-grid"]}>
                <div className={style["principal-apresentacao"]}>
                    <h1>Foco na Câmara</h1>
                    <p>
                    Acompanhe em tempo real as atividades dos deputados, 
                    proposições em tramitação, eventos importantes e a atuação dos partidos políticos.
                    Informação clara e acessível para todos os cidadãos.
                    </p>
                    <div className={style["principal-apresentacao-buttons"]}>
                        <div className={style["principal-apresentacao-button"]} onClick={()=>{navigate("/proposicoes")}}>Ver Proposicoes</div>
                        <div className={style["principal-apresentacao-button"]} onClick={()=>{navigate("/deputados")}}>Ver Deputados</div>
                    </div>
                </div>
            </div>

            {deputados && eventos && proposicoes ? ( 
            <>

            <div className={`${style["principal-secao"]} grid`}>
                <h4>Eventos em alta:</h4>

                <div className="card-container">
                    {eventos.map((e)=>(
                        <CardEvento data={e} />
                    ))} 
                </div>
            </div>
            <div className={`${style["principal-secao"]} grid`}>
                <h4>Deputados em alta:</h4>

                <div className="card-container">
                    {deputados.map((e)=>(
                        <CardDeputado data={e} />
                    ))}
                </div>
            </div>
            <div className={`${style["principal-secao"]} grid`}>
                <h4>Proposições em alta:</h4>

                <div className="card-container">
                    {proposicoes.map((e)=>(
                        <CardProposicao data={e} />
                    ))}
                </div>
            </div>
            </>) : <Loading/>}
        </div>
        
        
        </>
        
    )

};