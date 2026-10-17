import { useMemo, useReducer } from 'react'
import { AppContext } from './appContext'

// In-memory only: a page refresh resets the profile and watchlist by design.
const initialState = { profile: null, watchlist: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'completeOnboarding':
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

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(
    () => ({
      ...state,
      completeOnboarding: (profile) => dispatch({ type: 'completeOnboarding', profile }),
      addToWatchlist: (id) => dispatch({ type: 'addToWatchlist', id }),
      removeFromWatchlist: (id) => dispatch({ type: 'removeFromWatchlist', id }),
      isInWatchlist: (id) => state.watchlist.includes(id),
    }),
    [state],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
