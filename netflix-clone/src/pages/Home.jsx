import Navbar from '../components/Navbar.jsx'
import { useApp } from '../state/appContext'
import './Home.css'

export default function Home() {
  const { profile } = useApp()

  return (
    <>
      <Navbar />
      <main className="home">
        <h1 className="home__title">{profile.name}’s potential next watches</h1>
      </main>
    </>
  )
}
