import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import './QRDisplay.css'

interface QRDisplayProps {
  value: string
  size?: number
}

export function QRDisplay({ value, size = 256 }: QRDisplayProps) {
  const qrRef = React.useRef<HTMLDivElement>(null)
  const [showCopyMessage, setShowCopyMessage] = React.useState(false)


  const handleDownload = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (svg) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      const svgData = new XMLSerializer().serializeToString(svg)
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = `qr-code-${Date.now()}.png`
        link.click()
        URL.revokeObjectURL(url)
      }
      img.src = url
    }
  }

  const handleCopy = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (svg) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      const svgData = new XMLSerializer().serializeToString(svg)
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ])
            setShowCopyMessage(true)
            setTimeout(() => setShowCopyMessage(false), 3000)
          }
        })
        URL.revokeObjectURL(url)
      }
      img.src = url
    }
  }

  if (!value) {
    return (
      <div className="qr-display-empty">
        <p>Ingresa un texto o URL para generar un código QR</p>
      </div>
    )
  }

  return (
    <div className="qr-display-container">
      <div className="qr-wrapper" ref={qrRef}>
        <QRCodeSVG
          value={value}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>
      <div className="qr-actions">
        <button onClick={handleDownload} className="btn btn-primary">
          📥 Descargar
        </button>
        <button onClick={handleCopy} className="btn btn-secondary">
          📋 Copiar
        </button>
      </div>
      {showCopyMessage && (
        <p style={{ color: '#10b981', fontWeight: 'bold', margin: '10px 0' }}>
          ✨ ¡Código QR copiado al portapapeles!
        </p>
      )}
      <p className="qr-value-hint">Contenido: {value}</p>
    </div>
  )
}
