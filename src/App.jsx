import { useEffect, useState } from "react";

/* ---------- Tiny UI helpers ---------- */
function Container({ children }) {
  return <div style={{ maxWidth: 1040, margin: "0 auto", padding: "24px" }}>{children}</div>;
}
function Card({ children }) {
  return <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 16, background: "#fff" }}>{children}</div>;
}

/* ---------- Minimal hash router ---------- */
function useHashRoute() {
  const get = () => window.location.hash.replace(/^#/, "") || "/";
  const [path, setPath] = useState(get());
  useEffect(() => {
    const on = () => setPath(get());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const nav = (to) => (window.location.hash = to);
  return [path, nav];
}

/* ---------- Pages ---------- */
function Home({ nav }) {
  return (
    <Container>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>I LIKE ME</h1>
      <p>Healing shame and building resilient youth and families.</p>
      <div style={{ marginTop: 16 }}>
        <button onClick={() => nav("/programs")} style={btn}>Programs</button>
        <a href="#/contact" style={{ ...btn, marginLeft: 8 }}>Contact</a>
      </div>
    </Container>
  );
}

function Programs({ nav }) {
  const list = [
    { slug: "youth", title: "Youth Program" },
    { slug: "bedside", title: "Bedside Intervention" },
    { slug: "ipv", title: "Intimate Violence Prevention" },
    { slug: "lgbtq", title: "LGBTQ Empowerment" },
    { slug: "staff", title: "Staff & Administrator Curriculum" },
    { slug: "reentry", title: "Reentry Program" },
  ];
  return (
    <Container>
      <h2 style={{ fontSize: 28, marginBottom: 8 }}>Programs</h2>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
        {list.map(p => (
          <Card key={p.slug}>
            <h3 style={{ margin: 0 }}>{p.title}</h3>
            <div style={{ marginTop: 8 }}>
              <button onClick={() => nav(`/program/${p.slug}`)} style={btn}>Learn more</button>
              <button onClick={() => nav(`/inquire?program=${encodeURIComponent(p.title)}`)} style={{ ...btn, marginLeft: 8 }}>Request proposal</button>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}

function ProgramDetail({ slug, nav }) {
  return (
    <Container>
      <a href="#/programs" style={{ textDecoration: "none" }}>← All programs</a>
      <h2 style={{ fontSize: 28, margin: "12px 0" }}>{slug.replace(/^\w/, c => c.toUpperCase())} program</h2>
      <p>Overview coming soon. Use “Request proposal” to start a conversation.</p>
      <button onClick={() => nav(`/inquire?program=${slug}`)} style={btn}>Request proposal</button>
    </Container>
  );
}

function Contact() {
  return (
    <Container>
      <h2 style={{ fontSize: 28, marginBottom: 8 }}>Contact</h2>
      <Card>
        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/?thanks=1">
          <input type="hidden" name="form-name" value="contact" />
          <p style={{ display: "none" }}><label>Don’t fill this: <input name="bot-field" /></label></p>
          <p><input name="name" placeholder="Full name" required /></p>
          <p><input name="email" type="email" placeholder="Email" required /></p>
          <p><textarea name="message" placeholder="How can we help?" rows="5" required /></p>
          <button type="submit" style={btn}>Send</button>
        </form>
      </Card>
      {showThanksFromSearch() && <ThanksBanner />}
    </Container>
  );
}

function Inquire() {
  const params = getQueryFromHash();
  const program = params.get("program") || "";
  const thanks = params.get("thanks") === "1";
  return (
    <Container>
      <h2 style={{ fontSize: 28, marginBottom: 8 }}>Request a Proposal</h2>
      <Card>
        <form name="program-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/#/inquire?thanks=1">
          <input type="hidden" name="form-name" value="program-inquiry" />
          <p style={{ display: "none" }}><label>Don’t fill this: <input name="bot-field" /></label></p>
          <p><input name="organization" placeholder="Organization" required /></p>
          <p><input name="name" placeholder="Your name" required /></p>
          <p><input name="email" type="email" placeholder="Email" required /></p>
          <p><textarea name="needs" placeholder="Tell us about your goals" rows="5" required /></p>
          <p><input name="program" defaultValue={program} placeholder="Program of interest" /></p>
          <button type="submit" style={btn}>Submit</button>
        </form>
      </Card>
      {thanks && <ThanksBanner text="Thanks—your request was sent. We’ll contact you shortly." />}
    </Container>
  );
}

/* ---------- Shared bits ---------- */
const btn = {
  background: "#0ea5a4",
  color: "#fff",
  border: 0,
  padding: "10px 14px",
  borderRadius: 999,
  cursor: "pointer"
};

function Header({ nav }) {
  const items = [
    ["/", "Home"],
    ["/programs", "Programs"],
    ["/inquire", "Request proposal"],
  ];
  return (
    <div style={{ background: "#0ea5a4", color: "#fff" }}>
      <Container>
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <strong>I LIKE ME</strong>
          <nav style={{ display: "flex", gap: 8 }}>
            {items.map(([to, label]) => (
              <button key={to} onClick={() => nav(to)} style={{ ...btn, background: "rgba(255,255,255,0.15)" }}>
                {label}
              </button>
            ))}
            <a href="#/contact" style={{ ...btn, background: "#ff6a13" }}>Contact</a>
          </nav>
        </div>
      </Container>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ background: "#f3f4f6", marginTop: 24 }}>
      <Container>
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <span>© {new Date().getFullYear()} I LIKE ME</span>
          <a href="#/contact" style={{ textDecoration: "none" }}>Contact</a>
        </div>
      </Container>
    </div>
  );
}

function ThanksBanner({ text = "Thanks—your message was sent." }) {
  return (
    <div style={{ marginTop: 12, padding: 12, background: "#ecfdf5", border: "1px solid #34d399", borderRadius: 12, color: "#065f46" }}>
      {text}
    </div>
  );
}

/* helpers for hash query */
function getQueryFromHash() {
  const h = window.location.hash || "";
  const q = h.includes("?") ? h.split("?")[1] : "";
  return new URLSearchParams(q);
}
function showThanksFromSearch() {
  // for Contact action="/?thanks=1"
  return new URLSearchParams(window.location.search).get("thanks") === "1";
}

/* ---------- App ---------- */
export default function App() {
  const [path, nav] = useHashRoute();
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fafafa" }}>
      <Header nav={nav} />
      <main style={{ flex: 1 }}>
        {path === "/" && <Home nav={nav} />}
        {path === "/programs" && <Programs nav={nav} />}
        {path.startsWith("/program/") && <ProgramDetail slug={path.split("/")[2]} nav={nav} />}
        {path.startsWith("/inquire") && <Inquire />}
        {path === "/contact" && <Contact />}
      </main>
      <Footer />
    </div>
  );
}
