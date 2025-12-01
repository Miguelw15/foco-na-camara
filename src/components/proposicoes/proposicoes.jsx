import ProposicoesAPI from "../../apis/proposicoesAPI";
import Loading from "../loading";
import { useEffect,useState } from "react";
import CardProposicao from "./card-proposicao";
import "../../styles/proposicoes.css";
import { categoriasProposicoes } from "../../../config";


import doc from "../../assets/Documents.svg";
import docSelect from "../../assets/DocumentsSelect.svg";
import legis from "../../assets/Legislativas.svg";
import legisSelect from "../../assets/LegislativasSelect.svg";
import req from "../../assets/Req.svg";
import reqSelect from "../../assets/ReqSelect.svg";



export default function Proposicoes({numeroDeVotacoes=6}){

  const [props,setData] = useState([]);
  const [currentCategory,setCurrentCategory] = useState(categoriasProposicoes.legislativas);
  const propAPI = new ProposicoesAPI();
  const [hasGenerate,setHasGenerate] = useState(false);

  function activeCategory(element){
    document.querySelectorAll(".category-button")
    .forEach(btn => {
    btn.classList.remove("category-button-selected");

    const img = btn.querySelector("img");
    if (btn.id === "category-button-leg") img.src = legis;
    if (btn.id === "category-button-req-comun") img.src = req;
    if (btn.id === "category-button-docs") img.src = doc;
    });

    element.classList.add("category-button-selected");

    const img = element.querySelector("img");
    if (element.id === "category-button-leg") img.src = legisSelect;
    if (element.id === "category-button-req-comun") img.src = reqSelect;
    if (element.id === "category-button-docs") img.src = docSelect;
  }

  useEffect(()=>{
    const defaultCategory = document.getElementById('category-button-leg');
    if (defaultCategory) activeCategory(defaultCategory);
  },[])

  useEffect(()=>{   

    let active = true;
    setHasGenerate(false)
    async function loadData() {
      try {
        const getProps = await propAPI.getPropsInDate(numeroDeVotacoes,currentCategory);   
        
        if (!getProps) throw new Error('Erro na requisição das proposições')

        const fullProps =  await Promise.all(
          getProps.map(async element=>{
              const details = await propAPI.getProp(element.dados.id);
              return details.dados;
          })
        )
        if (active){
          setData(fullProps);
          setHasGenerate(true)
        };

      }
      catch(error){
        console.error(error.message)
      }
        
    }
    loadData();
    return ()=>{
      active=false;
    }
  },[currentCategory])

  return (
    <>
      
      <div className="prop-nav-bar">
        <div className="prop-category-bar">
          <div className="category-button" id="category-button-leg" onClick={(e)=>{
              if (currentCategory != categoriasProposicoes.legislativas) {
                setCurrentCategory(categoriasProposicoes.legislativas)
                activeCategory(e.currentTarget)
              }
            }}>
            <img src={legis} alt="Proposições Legislativas"/>
            <p>Proposições Legislativas</p>
          </div>
          <div className="category-button" id="category-button-req-comun" onClick={(e)=>{
              if (currentCategory != categoriasProposicoes.requerimentosComunicacao) {
                setCurrentCategory(categoriasProposicoes.requerimentosComunicacao)
                activeCategory(e.currentTarget)

              }
            }}>
            <img src={req} alt="Requerimentos/Comunicação" />
            <p>Requerimentos/Comunicação</p>
          </div>
          <div className="category-button" id="category-button-docs" onClick={(e)=>{
            if (currentCategory != categoriasProposicoes.outrosDocumentos) {
              setCurrentCategory(categoriasProposicoes.outrosDocumentos)
              activeCategory(e.currentTarget)

            }
          }}>
            <img src={doc} alt="Outros Documentos"/>
            <p>Outros Documentos</p>
          </div>
        </div>
        <div className="source-prop">
          <p>PROCURAR:</p>
          <input type="text"/>
        </div>
      </div>
       {Array.isArray(props) && props.length > 0 && hasGenerate ? (
        <>
          <div className="card-container">
            {props.map((element, index) => (
              <CardProposicao key={`${element.id}-${index}`} data={element} />
            ))}
          </div>
        </>
        ) : 
          <Loading />
        }

        
    </>
  )

    
};