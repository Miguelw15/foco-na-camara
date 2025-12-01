import style from "@/styles/deputados.module.css";
import { useNavigate } from "react-router-dom";

export default function CardDeputado({data}){
    const navigate = useNavigate();

    return (

    <div className={style['card-deputado-container']}>
        <div className={style['card-deputado']}>
            <img className={style['card-deputado-foto']} src={data?.urlFoto} alt="Logo" />
            <div className={style['card-deputado-apresentacao']}>
                <h3>{data?.nome}</h3>
                <p>{data?.siglaPartido}</p>
                <p>{data?.email}</p>
            </div>
        </div>
        <div className='view-more' onClick={()=>
            navigate(`/deputados/${data?.id}`)
        }>VER MAIS</div>
    </div>

    )
}