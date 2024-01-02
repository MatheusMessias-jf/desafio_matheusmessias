import { ReactElement, useState } from "react"
import './style.sass'

export function Tooltip(text: string, children: ReactElement) {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div className="tooltip-container" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {isVisible && <div className="tooltip">{text}</div>}
      {children}
    </div>
  )
}