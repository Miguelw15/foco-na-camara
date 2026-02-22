import ProposicoesAPI from "../../apis/proposicoesAPI.js";
import Loading from "@/components/Loading";
import { useEffect,useRef,useState } from "react";
import CardProposicao from "./card-proposicao";
import "../../styles/proposicoes.css";
import { categoriasProposicoes } from "../../../config.js";

import doc from "../../assets/Documents.svg";
import docSelect from "../../assets/DocumentsSelect.svg";
import legis from "../../assets/Legislativas.svg";
import legisSelect from "../../assets/LegislativasSelect.svg";
import req from "../../assets/Req.svg";
import reqSelect from "../../assets/ReqSelect.svg";
import SourcePropCard from "./sourcePropCards";
import { useSearchParams } from "react-router-dom";
import NotFound from "../NotFound.jsx";


export default function Proposicoes({numeroDeVotacoes=6}){

  const [props,setProps] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(categoriasProposicoes.legislativas);
  const propAPI = new ProposicoesAPI();
  const [hasGenerate,setHasGenerate] = useState(false);
  const [params] = useSearchParams();
  const search = params.get("search");
  
  //buttons
  const leg_button = useRef(null);
  const req_button = useRef(null);
  const docs_button = useRef(null);

  useEffect(()=>{

    let active = true;
    
    async function load() {
      setHasGenerate(false);
      const baseProps = search
        ? await propAPI.getPropsFromKeyword(search)
        : await propAPI.getPropsInDate(numeroDeVotacoes, currentCategory);


      const fullProps = await Promise.all(
        baseProps.map(p =>
          
          propAPI.getProp(p?.dados?.id ?? p?.id).then(r=> {return r}))
        
      );

      if (active) {
        setProps(fullProps);
        setHasGenerate(true);
      }
    }

    load();

    
    if (!search){
      leg_button.current.classList.remove("selected");
      docs_button.current.classList.remove("selected");
      req_button.current.classList.remove("selected");
    
    switch (currentCategory) {
      case categoriasProposicoes.legislativas:
        leg_button.current.classList.add("selected");
        break
      case categoriasProposicoes.outrosDocumentos:
          docs_button.current.classList.add("selected");
        break
      case categoriasProposicoes.requerimentosComunicacao:
          req_button.current.classList.add("selected");
        break
    }
    }
    return () => (active = false);

  },[search,currentCategory])

  return (
    <>
      { !search ? <>
      <div className="prop-nav-bar">
        <div className="prop-category-bar">
          <div ref={leg_button} className="category-button" id="category-button-leg" onClick={(e)=>{
              if (currentCategory != categoriasProposicoes.legislativas) {
                setCurrentCategory(categoriasProposicoes.legislativas)
              }
            }}>
            <img src={legis} alt="Proposições Legislativas"/>
            <p>Proposições Legislativas</p>
          </div>
          <div ref={req_button} className="category-button" id="category-button-req-comun" onClick={(e)=>{
              if (currentCategory != categoriasProposicoes.requerimentosComunicacao) {
                setCurrentCategory(categoriasProposicoes.requerimentosComunicacao)
              }
            }}>
            <img src={req} alt="Requerimentos/Comunicação" />
            <p>Requerimentos/Comunicação</p>
          </div>
          <div ref={docs_button} className="category-button" id="category-button-docs" onClick={(e)=>{
            if (currentCategory != categoriasProposicoes.outrosDocumentos) {
              setCurrentCategory(categoriasProposicoes.outrosDocumentos)
            }
          }}>
            <img src={doc} alt="Outros Documentos"/>
            <p>Outros Documentos</p>
          </div>
        </div>
      </div>
      {Array.isArray(props) && props.length > 0 && hasGenerate ? (
        <>
          <div className="card-container grid">
            {props.map((element, index) => (
              <CardProposicao key={`${element.id}-${index}`} data={element} />
            ))}
          </div>
          
        </>
        ) : 
          <Loading />
        }
      </>
      : 
      <>
        {Array.isArray(props) && hasGenerate ? (
          <>
            { props.length == 0 ? 
            <NotFound/>
            :
            <div className="card-container grid">
              {props.map((element, index) => (
                <CardProposicao key={`${element.id}-${index}`} data={element} />
              ))}
            </div>
            } 
            
          </>
          ) : 
            <Loading />
          }
        </>
       
      }
       

        
    </>
  )

    
};