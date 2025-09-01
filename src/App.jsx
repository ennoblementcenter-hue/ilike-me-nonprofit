function Contact() {
  return (
    <Section id="contact" title="Contact" intro="Let’s connect on alignment, pilots, and next steps.">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Netlify form */}
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/#thanks"
          className="rounded-2xl border bg-white p-6"
        >
          {/* Netlify needs this hidden input */}
          <input type="hidden" name="form-name" value="contact" />
          {/* Honeypot */}
          <p className="hidden">
            <label>Don’t fill this out: <input name="bot-field" /></label>
          </p>

          <div className="grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm font-medium">Full name</span>
              <input className="rounded-xl border px-3 py-2" name="name" required />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium">Email</span>
              <input className="rounded-xl border px-3 py-2" type="email" name="email" required />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium">Message</span>
              <textarea className="rounded-xl border px-3 py-2" rows="5" name="message" required />
            </label>

            {/* Optional reCAPTCHA (enable in Netlify > Forms first) */}
            {/* <div data-netlify-recaptcha="true"></div> */}

            <button className="rounded-full px-5 py-3 text-white font-semibold" style={{ backgroundColor: "#FF6A13" }}>
              Send
            </button>
          </div>
        </form>

        {/* Sidebar */}
        <div className="rounded-2xl border bg-white p-6">…your contact details…</div>
      </div>

      {/* Simple thank-you message for action="/#thanks" */}
      {typeof window !== "undefined" && window.location.hash === "#thanks" && (
        <div className="mt-6 rounded-xl border p-4 text-sm text-green-700 bg-green-50">
          Thanks—your message was sent.
        </div>
      )}
    </Section>
  );
}
