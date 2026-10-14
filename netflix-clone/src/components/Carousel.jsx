import { Children, useCallback, useEffect, useRef, useState } from 'react'
import './Carousel.css'

function Chevron({ direction }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path
        d={direction === 'prev' ? 'M15 4 7 12l8 8' : 'm9 4 8 8-8 8'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Horizontal row of <li> children with arrow buttons that hide at either end.
export default function Carousel({ label, size = 'regular', children }) {
  const trackRef = useRef(null)
  const [edges, setEdges] = useState({ atStart: true, atEnd: true })
  const count = Children.count(children)

  const updateEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const atStart = track.scrollLeft <= 2
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2
    setEdges((prev) => (prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd }))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    updateEdges()
    const observer = new ResizeObserver(updateEdges)
    observer.observe(track)
    return () => observer.disconnect()
  }, [updateEdges, count])

  function scrollByPage(direction) {
    const track = trackRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className={`carousel carousel--${size}`}>
      <button
        type="button"
        className="carousel__arrow carousel__arrow--prev"
        onClick={() => scrollByPage(-1)}
        disabled={edges.atStart}
        aria-label={`Scroll ${label} back`}
      >
        <Chevron direction="prev" />
      </button>
      <ul ref={trackRef} className="carousel__track" onScroll={updateEdges} aria-label={label}>
        {children}
      </ul>
      <button
        type="button"
        className="carousel__arrow carousel__arrow--next"
        onClick={() => scrollByPage(1)}
        disabled={edges.atEnd}
        aria-label={`Scroll ${label} forward`}
      >
        <Chevron direction="next" />
      </button>
    </div>
  )
}
