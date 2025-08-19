import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import NewMemory from './pages/NewMemory'

function App(){
  return (
    <BrowserRouter>
      <div style={{padding:20}}>
        <h1>Memory Jar — Starter</h1>
        <nav><Link to='/new'>New Memory</Link> | <a href='/api/ping'>API Ping</a></nav>
        <Routes>
          <Route path='/new' element={<NewMemory/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App/>)
