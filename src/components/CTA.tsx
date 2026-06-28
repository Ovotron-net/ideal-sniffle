import { type FormEvent, useState } from 'react'
import { useCreateConsultationRequest } from '../api/generated/endpoints'
import { SECTION } from '../config/sections'
import { ArrowIcon } from './ArrowIcon'
import { Reveal } from './Reveal'

export function CTA() {
  const mutation = useCreateConsultationRequest()
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    mutation.mutate(
      {
        data: {
          name: String(form.get('name')),
          email: String(form.get('email')),
          company: String(form.get('company')),
          message: String(form.get('message')),
        },
      },
      {
        onSuccess: () => {
          setSubmitted(true)
          e.currentTarget.reset()
        },
      },
    )
  }

  return (
    <section className="section cta" id={SECTION.contact} aria-labelledby="cta-heading">
      <div className="container">
        <Reveal className="cta-panel">
          <div className="cta-glow" aria-hidden="true" />
          <h2 id="cta-heading" className="cta-title">
            Ready to Strengthen Your Security Posture?
          </h2>
          <p className="cta-desc">
            Schedule a confidential assessment and discover where your defenses need reinforcement.
          </p>

          {submitted ? (
            <p className="cta-success" role="status">
              Request received. Our security team will contact you within one business day.
            </p>
          ) : (
            <form
              className="cta-form"
              onSubmit={handleSubmit}
              aria-describedby={mutation.isError ? 'cta-error' : undefined}
            >
              <div className="cta-form-row">
                <label htmlFor="cta-name">
                  <span>Name</span>
                  <input id="cta-name" name="name" type="text" required autoComplete="name" />
                </label>
                <label htmlFor="cta-email">
                  <span>Email</span>
                  <input id="cta-email" name="email" type="email" required autoComplete="email" />
                </label>
              </div>
              <label htmlFor="cta-company">
                <span>Company</span>
                <input
                  id="cta-company"
                  name="company"
                  type="text"
                  required
                  autoComplete="organization"
                />
              </label>
              <label htmlFor="cta-message">
                <span>Message</span>
                <textarea
                  id="cta-message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Describe your security needs…"
                />
              </label>
              {mutation.isError && (
                <p id="cta-error" className="cta-error" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={mutation.isPending}
              >
                <span>{mutation.isPending ? 'Submitting…' : 'Start a Security Assessment'}</span>
                <ArrowIcon />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}