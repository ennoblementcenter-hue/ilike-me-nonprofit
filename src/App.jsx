function Contact() {
  return (
    <Section id="contact" title="Contact" intro="Let’s connect on alignment, pilots, and next steps.">
      <div className="grid gap-6 md:grid-cols-2">
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/?thanks=1"   // causes a real reload, clears fields
          className="rounded-2xl border bg-white p-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden"><label>Don’t fill this: <input name="bot-field" /></label></p>

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

          <button className="mt-3 rounded-full px-5 py-3 text-white font-semibold" style={{ backgroundColor: "#FF6A13" }}>
            Send
          </button>
        </form>

        <div className="rounded-2xl border bg-white p-6">…contact details…</div>
      </div>

      {/* Thank-you banner after redirect */}
      {typeof window !== "undefined" && new URLSearchParams(window.location.search).get("thanks") === "1" && (
        <div className="mt-6 rounded-xl border p-4 text-sm text-green-700 bg-green-50">
          Thanks—your message was sent.
        </div>
      )}
    </Section>
  );
}
