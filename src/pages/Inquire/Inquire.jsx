import React from "react";
import Section from "../components/Section";

function getQueryFromHash() {
  const h = window.location.hash || "";
  const q = h.includes("?") ? h.split("?")[1] : "";
  return new URLSearchParams(q);
}

export default function Inquire() {
  const params = getQueryFromHash();
  const program = params.get("program") || "";
  const thanks = params.get("thanks") === "1";

  return (
    <Section title="Request a proposal" intro="Tell us about your goals. We’ll reply with a scope, timeline, and next steps.">
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, background: "#fff", padding: 16 }}>
        <form
          name="program-inquiry"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/#/inquire?thanks=1"
        >
          <input type="hidden" name="form-name" value="program-inquiry" />
          <p style={{ display: "none" }}><label>Don’t fill this: <input name="bot-field" /></label></p>

          <p><input name="organization" placeholder="Organization" required /></p>
          <p><input name="name" placeholder="Your name" required /></p>
          <p><input name="email" type="email" placeholder="Email" required /></p>
          <p><textarea name="needs" placeholder="What outcomes do you want?" rows="5" required /></p>
          <p><input name="program" defaultValue={program} placeholder="Program of interest" /></p>

          <button type="submit" style={btn}>Submit</button>
        </form>
      </div>

      {thanks && (
        <div style={{ marginTop: 12, padding: 12, background: "#ecfdf5", border: "1px solid #34d399", borderRadius: 12, color: "#065f46" }}>
          Thanks—your request was sent. We’ll contact you shortly.
        </div>
      )}
    </Section>
  );
}

const btn = {
  background: "#0ea5a4",
  color: "#fff",
  border: 0,
  padding: "10px 14px",
  borderRadius: 999,
  cursor: "pointer",
};
