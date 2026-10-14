import './Poster.css'

// Size the title so its longest word fits the poster width without breaking mid-word.
function titleSize(title) {
  const longestWord = Math.max(...title.split(' ').map((word) => word.length))
  return `${Math.min(15, 88 / (longestWord * 0.66)).toFixed(2)}cqi`
}

// A generated, image-free poster: a two-tone gradient from the movie's hue, with the title set as the artwork.
export default function Poster({ movie, className = '' }) {
  return (
    <div
      className={`poster ${className}`}
      style={{ '--hue': movie.hue, '--title-size': titleSize(movie.title) }}
      aria-hidden="true"
    >
      <span className="poster__year">{movie.year}</span>
      <span className="poster__title">{movie.title}</span>
    </div>
  )
}
