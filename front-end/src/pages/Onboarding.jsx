import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell.jsx'
import { GENRES, REGIONS } from '../data/movies'
import { useApp } from '../state/appContext'
import './Onboarding.css'

function validate({ name, age, genres, region }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Enter your name.'
  const ageNumber = Number(age)
  if (!age) errors.age = 'Enter your age.'
  else if (!Number.isInteger(ageNumber) || ageNumber < 1 || ageNumber > 120)
    errors.age = 'Enter a whole number from 1 to 120.'
  if (genres.length === 0) errors.genres = 'Pick at least one genre.'
  if (!region) errors.region = 'Pick a region.'
  return errors
}

// Order matches the form so focus lands on the first problem a reader would hit.
const FIRST_FIELD = {
  name: 'name',
  age: 'age',
  genres: `genre-${GENRES[0]}`,
  region: `region-${REGIONS[0].id}`,
}

export default function Onboarding() {
  const { profile, completeOnboarding } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState(profile?.name ?? '')
  const [age, setAge] = useState(profile?.age ? String(profile.age) : '')
  const [genres, setGenres] = useState(profile?.genres ?? [])
  const [region, setRegion] = useState(profile?.region ?? '')
  const [errors, setErrors] = useState({})
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)

  function clearError(key) {
    setErrors((current) => {
      if (!current[key]) return current
      const { [key]: _removed, ...rest } = current
      return rest
    })
  }

  function toggleGenre(genre) {
    clearError('genres')
    setGenres((current) =>
      current.includes(genre) ? current.filter((g) => g !== genre) : [...current, genre],
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate({ name, age, genres, region })
    setErrors(nextErrors)
    const firstInvalid = Object.keys(FIRST_FIELD).find((key) => nextErrors[key])
    if (firstInvalid) {
      document.getElementById(FIRST_FIELD[firstInvalid])?.focus()
      return
    }
    setSaving(true)
    setSaveError('')
    try {
      await completeOnboarding({ name: name.trim(), age: Number(age), genres, region })
      navigate('/home')
    } catch {
      setSaveError('We couldn’t save your profile. Check your connection and try again.')
      setSaving(false)
    }
  }

  return (
    <AuthShell>
      <form className="auth-shell__panel" onSubmit={handleSubmit} noValidate>
        <h1>Set up your profile</h1>
        <p className="auth-shell__intro">Tell us a little about you and we’ll fill your home screen.</p>
        <p className="auth-shell__alert" role="alert">
          {saveError}
        </p>

        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              clearError('name')
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="field__error">{errors.name}</p>}
        </div>

        <div className="field field--age">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            inputMode="numeric"
            min="1"
            max="120"
            value={age}
            onChange={(e) => {
              setAge(e.target.value)
              clearError('age')
            }}
            aria-invalid={Boolean(errors.age)}
            aria-describedby={errors.age ? 'age-error' : undefined}
          />
          {errors.age && <p id="age-error" className="field__error">{errors.age}</p>}
        </div>

        <fieldset className="field" aria-describedby={errors.genres ? 'genres-error' : undefined}>
          <legend>Genres you like</legend>
          <div className="chips">
            {GENRES.map((genre) => (
              <label key={genre} className="chip">
                <input
                  id={`genre-${genre}`}
                  type="checkbox"
                  checked={genres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
          {errors.genres && <p id="genres-error" className="field__error">{errors.genres}</p>}
        </fieldset>

        <fieldset className="field" aria-describedby={errors.region ? 'region-error' : undefined}>
          <legend>What do you want to watch?</legend>
          <div className="regions">
            {REGIONS.map((option) => (
              <label key={option.id} className="region">
                <input
                  id={`region-${option.id}`}
                  type="radio"
                  name="region"
                  value={option.id}
                  checked={region === option.id}
                  onChange={() => {
                    setRegion(option.id)
                    clearError('region')
                  }}
                />
                <span className="region__body">
                  <span className="region__label">{option.label}</span>
                  <span className="region__blurb">{option.blurb}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.region && <p id="region-error" className="field__error">{errors.region}</p>}
        </fieldset>

        <button type="submit" className="button button--primary auth-shell__submit" disabled={saving}>
          {saving ? 'Saving…' : 'Start watching'}
        </button>
      </form>
    </AuthShell>
  )
}
