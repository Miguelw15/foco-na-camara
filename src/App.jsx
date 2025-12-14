import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '@/styles/index.css'
import TopBar from '@/components/TopBar'
import Footer from '@/components/BottomBar'
import Principal from '@/components/Principal'
import Proposicoes from '@/components/proposicoes/proposicoes'
import Proposicao from '@/components/proposicoes/proposicao'
import Partidos from '@/components/partidos/partidos'
import Partido from '@/components/partidos/partido'
import Deputados from '@/components/deputados/deputados'
import Deputado from '@/components/deputados/deputado'
import Eventos from '@/components/eventos/eventos'
import Evento from '@/components/eventos/evento'

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
      <Footer></Footer>
    </BrowserRouter>
);
