import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell from '../components/AuthShell.jsx'
import { useApp } from '../state/appContext'

function validate({ email, password }) {
  const errors = {}
  if (!email.trim()) errors.email = 'Enter your email.'
  if (!password) errors.password = 'Enter your password.'
  return errors
}

// Once signed in, PublicOnly sends the user to Home, or to onboarding if they never finished it.
export default function LogIn() {
  const { signIn } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate({ email, password })
    setErrors(nextErrors)
    const firstInvalid = ['email', 'password'].find((key) => nextErrors[key])
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }
    setSubmitting(true)
    setFormError('')
    try {
      await signIn({ email: email.trim(), password })
    } catch (error) {
      setFormError(
        error.code === 'invalid_credentials'
          ? 'Incorrect email or password.'
          : error.message || 'We couldn’t sign you in. Try again.',
      )
      setSubmitting(false)
    }
  }

  return (
    <AuthShell>
      <form className="auth-shell__panel" onSubmit={handleSubmit} noValidate>
        <h1>Sign in</h1>
        <p className="auth-shell__intro">Pick up where you left off.</p>
        <p className="auth-shell__alert" role="alert">
          {formError}
        </p>

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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && <p id="password-error" className="field__error">{errors.password}</p>}
        </div>

        <button type="submit" className="button button--primary auth-shell__submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="auth-shell__switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  )
}
