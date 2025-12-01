
import style from '@/styles/partidos.module.css'
import { useNavigate } from 'react-router-dom'

export default function CardPartido({data}){
    const navigate = useNavigate();

    return (
        
    <div className={style['card-partido-container']}>
        <div className={style['card-partido']}>
            <img src={data?.dados?.urlLogo} alt="Logo" />
            <div className={style['card-partido-apresentacao']}>
                <h3>{data?.dados?.nome} ({data?.dados?.sigla})</h3>
                <p>{data?.dados?.status?.totalMembros} membros</p>
            </div>
        </div>
        <div className='view-more' onClick={()=>
            navigate(`/partidos/${data?.dados?.id}`)
        }>VER MAIS</div>
    </div>
    
    )
}