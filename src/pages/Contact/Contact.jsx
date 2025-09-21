import React from "react";
import Section from "../../components/Section/Section";

export default function Contact() {
  const thanked =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("thanks") === "1";

  return (
    <Section
      id="contact"
      title="Contact"
      intro="Tell us a bit about your needs. We’ll respond with next steps within 1–2 business days."
    >
      {thanked && (
        <div className="mb-6 rounded-xl border p-4 text-green-700 bg-green-50">
          Thanks — your message was sent. We’ll be in touch shortly.
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left: Contact details */}
        <aside className="lg:col-span-1 space-y-4 rounded-2xl border bg-white p-6">
          <h3 className="text-lg font-semibold">I LIKE ME</h3>
          <p className="text-slate-600">
            Healing shame. Building resilient youth and families.
          </p>

          <div className="pt-2 space-y-2 text-sm">
            <p>
              <span className="font-medium">Email:</span>{" "}
              <a className="text-teal-700 underline" href="mailto:david@ilike-me.org">
                david@ilike-me.org
              </a>
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              <a className="text-teal-700 underline" href="tel:+1-470-210-6371">
                (470) 210-6371
              </a>
            </p>
            <p className="text-slate-600">
              Serving schools, hospitals, and community partners.
            </p>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Follow</h4>
            <div className="flex gap-3 text-sm">
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="text-teal-700 underline">Instagram</a>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="text-teal-700 underline">Facebook</a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="text-teal-700 underline">LinkedIn</a>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Book a call</h4>
            <a
              href="https://calendly.com/ilikeme/30min"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full px-5 py-2 bg-teal-600 text-white font-semibold hover:bg-teal-700"
            >
              Schedule on Calendly
            </a>
          </div>
        </aside>

        {/* Right: Form */}
        <div className="lg:col-span-2 rounded-2xl border bg-white p-6">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/?thanks=1"
            className="grid gap-4"
          >
            {/* Netlify hidden bits */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>Don’t fill this: <input name="bot-field" /></label>
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="grid gap-1">
                <span className="text-sm font-medium">Full name</span>
                <input
                  className="rounded-xl border px-3 py-2"
                  name="name"
                  required
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm font-medium">Email</span>
                <input
                  className="rounded-xl border px-3 py-2"
                  type="email"
                  name="email"
                  required
                />
              </label>
            </div>

            <label className="grid gap-1">
              <span className="text-sm font-medium">Organization</span>
              <input className="rounded-xl border px-3 py-2" name="organization" />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium">What can we help with?</span>
              <select name="topic" className="rounded-xl border px-3 py-2">
                <option>General question</option>
                <option>Program inquiry</option>
                <option>Speaking / PD</option>
                <option>Partnership</option>
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium">Message</span>
              <textarea
                className="rounded-xl border px-3 py-2"
                rows="6"
                name="message"
                placeholder="Share context, goals, and timelines…"
                required
              />
            </label>

            <div className="flex items-center gap-3 pt-2">
              <button
                className="rounded-full px-5 py-3 text-white font-semibold bg-teal-600 hover:bg-teal-700"
              >
                Send message
              </button>

              <a
                href="https://calendly.com/YOUR-CALENDLY-SLUG"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-5 py-3 font-semibold border hover:bg-slate-50"
              >
                Or book a call
              </a>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
