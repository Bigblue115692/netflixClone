import { supabase } from './supabase'

// RLS limits every query here to the signed-in user's own rows, so none of them filter by user.
// The app works with movie slugs (the ids in data/movies.js); the database keys movies by uuid.

let movieIdsBySlug = null

async function getMovieId(slug) {
  if (!movieIdsBySlug) {
    const { data, error } = await supabase.from('movies').select('id, slug')
    if (error) throw error
    movieIdsBySlug = new Map(data.map((movie) => [movie.slug, movie.id]))
  }
  const id = movieIdsBySlug.get(slug)
  if (!id) throw new Error(`Unknown movie: ${slug}`)
  return id
}

export async function fetchProfile() {
  const { data, error } = await supabase.from('users').select('name, age, genres, region').single()
  if (error) throw error
  return data
}

export async function saveProfile(userId, { name, age, genres, region }) {
  const { error } = await supabase.from('users').update({ name, age, genres, region }).eq('id', userId)
  if (error) throw error
}

export async function fetchWatchlist() {
  const { data, error } = await supabase.from('watchlists').select('movies (slug)')
  if (error) throw error
  return data.map((row) => row.movies.slug)
}

// user_id is left out on purpose: the database fills it from the session.
export async function addToWatchlist(slug) {
  const { error } = await supabase.from('watchlists').insert({ movie_id: await getMovieId(slug) })
  if (error) throw error
}

export async function removeFromWatchlist(slug) {
  const { error } = await supabase.from('watchlists').delete().eq('movie_id', await getMovieId(slug))
  if (error) throw error
}
