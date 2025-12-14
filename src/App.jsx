import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '@/styles/index.css'
import TopBar from '@/components/topBar.jsx'
import BottomBar from '@/components/bottomBar.jsx'
import Principal from '@/components/principal.jsx'
import Proposicoes from '@/components/proposicoes/proposicoes.jsx'
import Proposicao from '@/components/proposicoes/proposicao.jsx'
import Partidos from '@/components/partidos/partidos.jsx'
import Partido from '@/components/partidos/partido.jsx'
import Deputados from '@/components/deputados/deputados.jsx'
import Deputado from '@/components/deputados/deputado.jsx'
import Eventos from '@/components/eventos/eventos.jsx'
import Evento from '@/components/eventos/evento.jsx'

const root = document.getElementById("root");

createRoot(root).render(
    <BrowserRouter>
      <TopBar></TopBar>
      <Routes>
        <Route index element={<Principal />} />
        <Route path='/deputados' element={<Deputados/>} />
        <Route path='/deputados/:id' element={<Deputado/>}/>
        <Route path='/proposicoes' element={<Proposicoes/>} />
        <Route path='/proposicoes/:id' element={<Proposicao/>} />
        <Route path='/partidos' element={<Partidos/>} />
        <Route path='/partidos/:id' element={<Partido/>}/>
        <Route path='/eventos' element={<Eventos/>}/>
        <Route path='/eventos/:id' element={<Evento/>}/>
      </Routes>
      <BottomBar></BottomBar>
    </BrowserRouter>
);
