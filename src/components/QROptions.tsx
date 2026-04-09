import './QROptions.css'

interface QROptionsProps {
  size: number
  onSizeChange: (size: number) => void
}

export function QROptions({ size, onSizeChange }: QROptionsProps) {
  return (
    <div className="qr-options-container">
      <div className="option-group">
        <label htmlFor="qr-size" className="option-label">
          Tamaño del QR
        </label>
        <div className="size-input-group">
          <input
            id="qr-size"
            type="range"
            min="128"
            max="512"
            step="32"
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="size-slider"
          />
          <span className="size-display">{size}px</span>
        </div>
      </div>
    </div>
  )
}
