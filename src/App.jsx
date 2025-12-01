import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './styles/index.css'
import Header from './components/header'
import Footer from './components/footer'
import Principal from './components/principal'
import Proposicoes from './components/proposicoes/proposicoes'
import Proposicao from './components/proposicoes/proposicao'
import Partidos from './components/partidos/partidos'
import Partido from './components/partidos/partido'
import Deputados from './components/deputados/deputados'
import Deputado from './components/deputados/deputado'

const root = document.getElementById("root");

createRoot(root).render(
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route index element={<Principal />} />
        <Route path='/deputados' element={<Deputados/>} />
        <Route path='/deputados/:id' element={<Deputado/>}/>
        <Route path='/proposicoes' element={<Proposicoes/>} />
        <Route path='/proposicoes/:id' element={<Proposicao/>} />
        <Route path='/partidos' element={<Partidos/>} />
        <Route path='/partidos/:id' element={<Partido/>}/>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
);
