import './LoadingScreen.css'

// Shown while a stored session is being confirmed, so a refresh doesn't flash the sign-in screen.
export default function LoadingScreen() {
  return (
    <main className="loading-screen" aria-busy="true">
      <p className="loading-screen__logo" aria-hidden="true">
        NETFLIX
      </p>
      <p role="status" className="visually-hidden">
        Loading your profile…
      </p>
    </main>
  )
}
