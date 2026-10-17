import { useEffect, useRef } from 'react'
import './Modal.css'

// The element that opened the first modal in a chain (e.g. card -> description -> watchlist),
// so focus returns there once every modal is closed.
let opener = null

// Native <dialog> + showModal(): the page behind becomes inert, focus stays inside, and Esc fires `cancel`.
export default function Modal({ labelledBy, onClose, className = '', children }) {
  const dialogRef = useRef(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const dialog = dialogRef.current
    const active = document.activeElement
    if (active && active !== document.body && !active.closest('dialog')) opener = active
    if (!dialog.open) dialog.showModal()
    return () => {
      dialog.close()
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className={`modal ${className}`}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault()
        onCloseRef.current()
      }}
      onClick={(event) => {
        // Clicks on the dialog element itself land on the backdrop, outside the surface.
        if (event.target === event.currentTarget) onCloseRef.current()
      }}
    >
      <div className="modal__surface">
        <button type="button" className="modal__close" onClick={() => onCloseRef.current()} aria-label="Close">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </dialog>
  )
}
