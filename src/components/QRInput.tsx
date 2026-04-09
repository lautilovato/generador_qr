import './QRInput.css'

interface QRInputProps {
  onValueChange: (value: string) => void
  value: string
}

export function QRInput({ onValueChange, value }: QRInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value)
  }

  const handleClear = () => {
    onValueChange('')
  }

  return (
    <div className="qr-input-container">
      <label htmlFor="qr-input" className="qr-label">
        Ingresa URL o texto
      </label>
      <div className="input-wrapper">
        <input
          id="qr-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="https://ejemplo.com"
          className="qr-input"
        />
        {value && (
          <button onClick={handleClear} className="clear-btn" title="Limpiar">
            ✕
          </button>
        )}
      </div>
      <p className="input-hint">
        {value.length > 0 && `${value.length} caracteres`}
      </p>
    </div>
  )
}
