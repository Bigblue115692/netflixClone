import { isAuthApiError } from '@supabase/supabase-js'
import { useEffect, useMemo, useReducer } from 'react'
import * as db from '../lib/db'
import { supabase } from '../lib/supabase'
import { AppContext } from './appContext'

// The signed-in user (as confirmed by Supabase Auth), their profile and their watchlist
// (movie slugs), mirrored from Supabase. Every change is written to the database first.
// status starts as 'loading' while a session stored by an earlier visit is confirmed.
const signedOutState = { status: 'signedOut', user: null, profile: null, watchlist: [] }
const initialState = { ...signedOutState, status: 'loading' }

function reducer(state, action) {
  switch (action.type) {
    case 'signedIn':
      return { status: 'signedIn', user: action.user, profile: action.profile, watchlist: action.watchlist }
    case 'signedOut':
      return signedOutState
    case 'profileSaved':
      return { ...state, profile: action.profile }
    case 'addToWatchlist':
      if (state.watchlist.includes(action.id)) return state
      return { ...state, watchlist: [...state.watchlist, action.id] }
    case 'removeFromWatchlist':
      return { ...state, watchlist: state.watchlist.filter((id) => id !== action.id) }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

async function loadUser(dispatch, authUser) {
  const [profile, watchlist] = await Promise.all([db.fetchProfile(), db.fetchWatchlist()])
  const user = { id: authUser.id, email: authUser.email }
  dispatch({ type: 'signedIn', user, profile, watchlist })
}

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Recover the user after a refresh. getUser() asks the Auth server who the stored token
  // belongs to, so an expired, revoked or tampered session counts as signed out.
  useEffect(() => {
    let active = true
    async function restore() {
      const { data, error } = await supabase.auth.getUser()
      if (!active) return
      if (!data.user) {
        // The server rejected the stored session, so drop it. A network error leaves it for next time.
        if (isAuthApiError(error)) await supabase.auth.signOut({ scope: 'local' })
        if (active) dispatch({ type: 'signedOut' })
        return
      }
      try {
        await loadUser((action) => active && dispatch(action), data.user)
      } catch {
        await supabase.auth.signOut({ scope: 'local' })
        if (active) dispatch({ type: 'signedOut' })
      }
    }
    restore()

    // Covers sessions that end outside this tab's sign-out button, such as a failed token refresh.
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') dispatch({ type: 'signedOut' })
    })
    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      // The sign-up trigger creates the profile row with this name.
      signUp: async ({ name, email, password }) => {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
        if (error) throw error
        await loadUser(dispatch, data.user)
      },
      signIn: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        await loadUser(dispatch, data.user)
      },
      // Ends this browser's session. supabase-js deletes the stored tokens, and the
      // state reset drops the profile and watchlist, even if the server can't be reached.
      signOut: async () => {
        try {
          await supabase.auth.signOut({ scope: 'local' })
        } finally {
          dispatch({ type: 'signedOut' })
        }
      },
      completeOnboarding: async (profile) => {
        await db.saveProfile(state.user.id, profile)
        dispatch({ type: 'profileSaved', profile })
      },
      addToWatchlist: async (id) => {
        if (state.watchlist.includes(id)) return
        await db.addToWatchlist(id)
        dispatch({ type: 'addToWatchlist', id })
      },
      removeFromWatchlist: async (id) => {
        await db.removeFromWatchlist(id)
        dispatch({ type: 'removeFromWatchlist', id })
      },
      isInWatchlist: (id) => state.watchlist.includes(id),
    }),
    [state],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
