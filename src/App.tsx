import { useState } from 'react'
import { QRInput } from './components/QRInput'
import { QRDisplay } from './components/QRDisplay'
import { QROptions } from './components/QROptions'
import './App.css'

function App() {
  const [qrValue, setQrValue] = useState('')
  const [qrSize, setQrSize] = useState(256)

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎯 Generador de Códigos QR</h1>
        <p>Crea y descarga códigos QR fácilmente</p>
      </header>

      <main className="app-main">
        <div className="input-section">
          <QRInput value={qrValue} onValueChange={setQrValue} />
          <QROptions size={qrSize} onSizeChange={setQrSize} />
        </div>

        <div className="display-section">
          <QRDisplay value={qrValue} size={qrSize} />
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 Generador QR | Hecho con React + TypeScript</p>
      </footer>
    </div>
  )
}

export default App
