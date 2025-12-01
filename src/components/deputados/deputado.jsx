import { useParams } from "react-router-dom"
import style from "@/styles/deputados.module.css";
import { useEffect, useState } from "react";
import DeputadosAPI from "@/apis/deputadosAPI";
import Loading from "../loading";

//Midias Sociais
import FacebookIcon from "@/assets/Facebook.png";
import YoutubeIcon from "@/assets/YouTube.png";
import InstagramIcon from "@/assets/Instagram.png";
import XIcon from "@/assets/X.png";

export default function Deputado(){
    const {id} = useParams();
    const [data,setData] = useState([]);
    const deputadosAPI = new DeputadosAPI();

    useEffect(()=>{
        async function loadData(){
            const newData = await deputadosAPI.getDeputado(id);

            setData(newData)
        }
        loadData()
    },[id])

    return (
        <>
        {data ? 
            
            <div className={style['deputado-container']}>
                <div className={style['deputado-apresentacao']}>
                    <h3>{data.nomeCivil}</h3>
                    <img src={data.ultimoStatus?.urlFoto} alt="Foto Deputado" />
                </div>

                <div className={style['deputado-details-container']}>
                    <h3>DETALHES</h3>
                    <div className={style['deputado-details']}>
                        <div className={style['deputado-detail']}>
                            <strong>Partido:</strong>
                            <p>{data.ultimoStatus?.siglaPartido}</p>
                        </div>
                        <div className={style['deputado-detail']}>
                            <strong>Data nascimento:</strong>
                            <p>{(data.dataNascimento)}</p>
                        </div>
                        <div className={style['deputado-detail']}>
                            <strong>Escolariedade:</strong>
                            <p>{data.escolaridade}</p>
                        </div>
                        <div className={style['deputado-detail']}>
                            <strong>Local de nascimento:</strong>
                            <p>{`${data.municipioNascimento} - ${data.ufNascimento}`}</p>
                        </div>
                        <div className={style['deputado-detail']}>
                            <strong>Situação:</strong>
                            <p>{data.ultimoStatus?.situacao}</p>
                        </div>
                    </div>
                </div>

                <div className={style['deputado-contatos-container']}>
                    <h3>CONTATO</h3>
                    <div className={style['deputado-contatos']}>
                        <div className={style['deputado-contato']}>
                            <strong>Gabinete:</strong>
                            <p>{`Sala ${data.ultimoStatus?.gabinete?.sala} em prédio número ${data.ultimoStatus?.gabinete?.predio} no ${data.ultimoStatus?.gabinete?.andar}º andar.`}</p>
                        </div>
                        <div className={style['deputado-contato']}>
                            <strong>Telefone:</strong>
                            <p>{`${data.ultimoStatus?.gabinete?.telefone}`}</p>
                        </div>
                        <div className={style['deputado-contato']}>
                            <strong>Email:</strong>
                            <p>{`${data.ultimoStatus?.gabinete?.email}`}</p>
                        </div>
                        {
                            data.redeSocial && data.redeSocial.length > 0 ?                                 
                            <div className={style['deputado-midias-sociais']}>

                            {data.redeSocial.map((e)=>{
                                return (

                                    <div className={style['deputado-midia-social']}>
                                        <a href={e}>
                                            {
                                                e.includes('twitter') ?
                                                
                                                    <img src={XIcon} alt="Twitter Icon" />
                                                : ""
                                            }
                                            {
                                                e.includes('facebook') ?
                                                <img src={FacebookIcon}/>
                                                : ""
                                            }
                                            {
                                                e.includes('instagram') ?
                                                <img src={InstagramIcon}/>
                                                : ""
                                            }
                                            {
                                                e.includes('youtube') ?
                                                <img src={YoutubeIcon}/>
                                                :""
                                            }
                                        </a>
                                        
                                    </div>
                                
                                )
                            })}
                            </div>  
                            : ""
                        }
                        
                    </div>
                </div>
            </div>
         :
         <Loading/>   
        }
        </>
    )
}