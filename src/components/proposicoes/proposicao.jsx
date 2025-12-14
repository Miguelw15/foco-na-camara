import { useParams } from "react-router-dom"
import ProposicoesAPI from "../../apis/proposicoesAPI"
import { useState, useEffect } from "react";
import Loading from "../Loading";
import CardProposicao from "./card-proposicao";

export default function Proposicao(){

    const {id} = useParams();
    const [prop, setProp] = useState(null);
    const [propAuthor, setPropAuthor] = useState(null);
    const [propRelated, setPropRelated] = useState(null);

    const PropApi = new ProposicoesAPI();

    useEffect(()=>{
        const controller = new AbortController();

        async function loadData(){
            try { 
                const [p,authors,related] = await Promise.all(
                    [
                        PropApi.getProp(id),
                        PropApi.getAuthors(id),
                        PropApi.getPropsRelated(id)
                    ]
                )   

                const relatedDetails = await Promise.all(
                    related.dados.map(async element=>{
                        const detail = await PropApi.getProp(element.id);
                        return detail.dados;
                    })
                )
                setProp(p.dados);
                setPropAuthor(authors.dados);
                setPropRelated(relatedDetails);
                }
                
            catch(error){
                if (error.name === "AborError") return;
                console.error(error.message)
            }
        }
        loadData()
    },[id]);
    return (
        <>
        { prop && propAuthor && propRelated ? 
            (
                <div className="prop-details-container">
                    <div className="prop-information-container" id={prop.id}>
                        <h1>{`${prop.siglaTipo} ${prop.numero}/${prop.ano}`}</h1>

                        <div className="prop-information">
                            <h3>Tipo:</h3>
                            <p>{`${prop.descricaoTipo}.`}</p>
                        </div>
                        <div className="prop-information">
                            <h3>Descrição:</h3>
                            <p>{`${prop.ementa} ${prop.ementaDetalhada}`}</p>
                        </div>
                        <div className="prop-information">
                            <h3>Situação:</h3>
                            <p>{`${prop.statusProposicao.descricaoSituacao} / ${prop.statusProposicao.descricaoTramitacao}.`}</p>
                        </div>
                        <div className="prop-information">
                            <h3>Data da ultima votação:</h3>
                            <p>{`${prop.statusProposicao.dataHora.split('T')[0].replaceAll('-','/')} - ${prop.statusProposicao.dataHora.split('T')[1]}.`}</p>
                        </div>
                        <div className="prop-information">
                            <h3>Data de apresentação:</h3>
                            <p>{`${prop.dataApresentacao.split('T')[0].replaceAll('-','/')} - ${prop.dataApresentacao.split('T')[1]}.`}</p>
                        </div>
                        <div className="prop-information">
                            <h3>Autores</h3>
                            <p>{`${propAuthor.map(author=>author.nome).join(', ')}.`}</p>
                        </div>
                        <div className="prop-information">
                            <h3>Texto</h3>
                            <a target="_blank" href={`${prop.urlInteiroTeor}`}>{`${prop.urlInteiroTeor}`}</a>
                        </div>
                    </div>
                    { propRelated.length > 0?

                    <div className="prop-related">
                        <h2>Proposições relacionadas</h2>
                        <div key={propRelated?.id} className="card-container">
                            {propRelated.map((element,index) =>(
                                <CardProposicao key={`${element.id}-${index}`} id={element.id} data={element}></CardProposicao>
                            ))}
                        </div>
                    </div>  
                        : null
                    }
                   
                    
                </div>
            )

            :
            <Loading></Loading>
        }
        </>
    )
}