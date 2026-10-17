import { MOVIES, REGIONS } from './movies'

function genreOverlap(movie, genres) {
  return movie.genres.filter((genre) => genres.includes(genre)).length
}

function byOverlap(genres) {
  return (a, b) => genreOverlap(b, genres) - genreOverlap(a, genres) || b.year - a.year
}

// Three rows, matching the wireframe: picks from the chosen region and genres,
// the rest of that region, then genre matches from the other region.
export function buildHomeRows(profile) {
  const { name, genres, region } = profile
  const regionLabel = REGIONS.find((r) => r.id === region).label
  const otherLabel = REGIONS.find((r) => r.id !== region).label

  const inRegion = MOVIES.filter((m) => m.region === region).sort(byOverlap(genres))
  const picks = inRegion.filter((m) => genreOverlap(m, genres) > 0).slice(0, 10)
  // Pad thin matches so the headline row never looks empty.
  const topPicks = picks.length >= 6 ? picks : inRegion.slice(0, 6)
  const moreInRegion = inRegion.filter((m) => !topPicks.includes(m))
  const elsewhere = MOVIES.filter((m) => m.region !== region).sort(byOverlap(genres)).slice(0, 12)

  return [
    { id: 'top-picks', title: `Top picks for ${name}`, movies: topPicks, featured: true },
    { id: 'more-in-region', title: `More ${regionLabel}`, movies: moreInRegion },
    { id: 'elsewhere', title: `${otherLabel} you might like`, movies: elsewhere },
  ].filter((row) => row.movies.length > 0)
}
