import { useState } from 'react'
import './App.css'

// Import Komponen
import VirtualTour from './components/VirtualTour'
import ChatBox from './components/ChatBox'

function App() {
  return (
    <div className="app-wrapper">
      <h1>AI & Virtual Tour Platform</h1>
      <p>Integrasi React.js + Pannellum (Tour) + OpenAI (Chat)</p>

      <div className="container">
        
        {/* BAGIAN KIRI: VIRTUAL TOUR */}
        <div className="tour-section">
          <VirtualTour />
        </div>

        {/* BAGIAN KANAN: CHAT AI */}
        <div className="chat-section">
          {/* Panggil Komponen Chat Disini */}
          <ChatBox />
        </div>

      </div>
    </div>
  )
}

export default App