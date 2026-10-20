import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell from '../components/AuthShell.jsx'
import { useApp } from '../state/appContext'

// Supabase's default minimum.
const MIN_PASSWORD = 6

function validate({ name, email, password }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Enter your name.'
  if (!email.trim()) errors.email = 'Enter your email.'
  else if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = 'Enter a valid email, like you@example.com.'
  if (password.length < MIN_PASSWORD) errors.password = `Use at least ${MIN_PASSWORD} characters.`
  return errors
}

// Once the account exists the user is signed in, and PublicOnly moves them on to onboarding.
export default function SignUp() {
  const { signUp } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate({ name, email, password })
    setErrors(nextErrors)
    const firstInvalid = ['name', 'email', 'password'].find((key) => nextErrors[key])
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }
    setSubmitting(true)
    setFormError('')
    try {
      await signUp({ name: name.trim(), email: email.trim(), password })
    } catch (error) {
      setFormError(
        error.code === 'user_already_exists'
          ? 'An account with this email already exists. Sign in instead.'
          : error.message || 'We couldn’t create your account. Try again.',
      )
      setSubmitting(false)
    }
  }

  return (
    <AuthShell>
      <form className="auth-shell__panel" onSubmit={handleSubmit} noValidate>
        <h1>Create your account</h1>
        <p className="auth-shell__intro">Save a watchlist that’s waiting for you every time you come back.</p>
        <p className="auth-shell__alert" role="alert">
          {formError}
        </p>

        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="field__error">{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="field__error">{errors.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : 'password-hint'}
          />
          {errors.password ? (
            <p id="password-error" className="field__error">{errors.password}</p>
          ) : (
            <p id="password-hint" className="field__hint">At least {MIN_PASSWORD} characters.</p>
          )}
        </div>

        <button type="submit" className="button button--primary auth-shell__submit" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>

        <p className="auth-shell__switch">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </form>
    </AuthShell>
  )
}
