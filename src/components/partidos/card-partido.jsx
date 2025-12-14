
import style from '@/styles/partidos.module.css'
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import LogoPartido from './logo-partido';

export default function CardPartido({data}){
    const navigate = useNavigate();

    return (
        
    <div className={style['card-partido-container']}>
        <div className={style['card-partido']}>
            <LogoPartido sigla={data?.dados?.sigla} />
            <div className={style['card-partido-apresentacao']}>
                <h3>{data?.dados?.nome}</h3>
                <p>{data?.dados?.status?.totalMembros} membros</p>
            </div>
        </div>
        <div className='view-more' onClick={()=>
            navigate(`/partidos/${data?.dados?.id}`)
        }>VER MAIS</div>
    </div>
    
    )
}