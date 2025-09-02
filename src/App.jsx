import React, { useEffect, useState, useRef } from "react";

/* ---------- Section wrapper ---------- */
function Section({ id, title, intro, children }) {
  return (
    <section id={id} className="py-16 px-6 md:px-12 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800">{title}</h2>
        {intro && (
          <p className="mt-3 text-lg text-center text-slate-600 max-w-3xl mx-auto">{intro}</p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/* ---------- Simple hash router ---------- */
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

/* ---------- Header ---------- */
function Header({ path, nav }) {
  const items = [
    ["/", "Home"],
    ["/programs", "Programs"],
    ["/testimonials", "Testimonials"],
    ["/gallery", "Gallery"],
    ["/shop", "Shop"],
    ["/contact", "Contact"],
  ];
  return (
    <header className="bg-teal-600 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
        <button onClick={() => nav("/")} className="flex items-center gap-3">
          <img src="/logo.png" alt="I LIKE ME logo" className="h-10 w-10 rounded" />
          <span className="text-2xl font-bold">I LIKE ME</span>
        </button>
        <nav className="ml-auto flex flex-wrap gap-2">
          {items.map(([to, label]) => (
            <button
              key={to}
              onClick={() => nav(to)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                path === to ? "bg-white text-teal-700" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ---------- Pages ---------- */
function Home() {
  return (
    <Section
      id="home"
      title="Welcome to I LIKE ME"
      intro="Healing shame, building resilient youth and families."
    >
      <div className="rounded-2xl overflow-hidden border bg-white">
        <img
          src="/images/hero.png"
          alt="Youth empowerment"
          className="w-full h-80 object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=60";
          }}
        />
      </div>
    </Section>
  );
}

const PROGRAMS = [
  { title: "I LIKE ME Youth Program", body: "Self-image, self-trust, resilience to trauma and ACEs.", img: "/images/ylp.png" },
  { title: "Bedside Intervention", body: "Reduce recidivism. Catalyze growth during vulnerable moments.", img: "/images/bedside.png" },
  { title: "Intimate Violence Prevention", body: "Trauma-informed care and healthy relationships.", img: "/images/ivp.png" },
  { title: "LGBTQ Empowerment", body: "Affirming supports for self-acceptance and resilience.", img: "/images/lgbtq.png" },
  { title: "Staff & Administrator", body: "Equip adults to reinforce the Six Pillars.", img: "/images/staff.png" },
];
function Programs() {
  return (
    <Section id="programs" title="Curriculum Pathways" intro="Tailored to schools, hospitals, churches, and community orgs.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROGRAMS.map(p=>(
          <div key={p.title} className="rounded-2xl border bg-white overflow-hidden">
            <img src={p.img} alt={p.title} className="h-48 w-full object-cover"
                 onError={(e)=>{e.currentTarget.src="https://picsum.photos/seed/ilmprog/800/600";}}/>
            <div className="p-5">
              <h3 className="text-lg font-bold text-teal-700">{p.title}</h3>
              <p className="text-slate-600 text-sm mt-1">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  const TESTIMONIALS = [
  { quote: "Students named their worth and repaired relationships.", name: "Assistant Principal", org: "Urban HS" },
  { quote: "The bedside intervention changed my son’s trajectory.", name: "Parent", org: "Children’s Hospital" },
  { quote: "Staff now share language for empathy and accountability.", name: "Program Director", org: "Community Center" },
];

  const [i, setI] = useState(0);
  const timer = useRef(null);
  useEffect(() => {
    timer.current = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer.current);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <Section id="testimonials" title="Testimonials" intro="Real outcomes in real communities.">
      <div className="rounded-3xl border bg-white p-6 md:p-10 max-w-4xl mx-auto">
        <p className="text-lg md:text-xl font-semibold leading-snug">“{t.quote}”</p>
        <div className="mt-3 text-sm text-slate-600">— {t.name}</div>
      </div>
    </Section>
  );
}

function Gallery() {
  const pics = ["/images/g1.jpg","/images/g2.jpg","/images/g3.jpg","/images/g4.jpg","/images/g5.jpg","/images/g6.jpg"];  
  return (
    <Section id="gallery" title="Gallery" intro="Moments of joy, learning, and courage.">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {pics.map((p, idx) => (
          <img
            key={idx}
            src={p}
            alt={`Gallery ${idx + 1}`}
            className="aspect-[4/3] w-full object-cover rounded-xl border bg-white"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/seed/ilm${idx}/600/450`;
            }}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------- Shop (Stripe links per item) ---------- */
const PRODUCTS = [
  { id: "ilm-workbook", name: "I LIKE ME Workbook", price: 25, img: "/images/shop-ILMwrkbk.png", link: "https://buy.stripe.com/cNi9AS0Zg7Q28eK05I48000" },
  { id: "boop-book", name: "Born Out of Pain — Memoir", price: 20, img: "/images/shop-BOOP-book.png", link: "https://buy.stripe.com/aFa3cueQ63zM8eKf0C48001" },
  { id: "ilm-hat", name: "I LIKE ME Hat", price: 20, img: "/images/shop-blk-n-white-hat.png", link: "https://buy.stripe.com/bJebJ0fUa1rE2Uq7ya48005" },
  { id: "ilm-mug", name: "I LIKE ME Mug", price: 15, img: "/images/shop-ILMmug.png", link: "https://buy.stripe.com/dRmcN4eQ69YaamS3hU48004" },
  { id: "ilm-tee", name: "I LIKE ME T-Shirt", price: 15, img: "/images/shop-blk-tee.png", link: "https://buy.stripe.com/aFaeVcdM2c6i1QmdWy48002" },
  { id: "ilm-journal", name: "I LIKE ME Affirmational Journal", price: 12, img: "/images/shop-ILMJournal.png", link: "https://buy.stripe.com/00w9ASdM2c6ibqWg4G48003" },
];

function Shop() {
  return (
    <Section id="shop" title="Shop Merchandise" intro="Support the mission with branded gear.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="rounded-2xl border bg-white overflow-hidden">
            <img
              src={p.img}
              alt={p.name}
              className="h-48 w-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/ilmshop/800/600"; }}
            />
            <div className="p-5">
              <h3 className="text-lg font-bold text-teal-700">{p.name}</h3>
              <p className="text-slate-600 text-sm">${p.price}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-full px-5 py-3 text-white font-semibold bg-orange-500"
              >
                Buy with Stripe
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <Section id="contact" title="Contact" intro="Let’s connect on alignment, pilots, and next steps.">
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/?thanks=1"
        className="rounded-2xl border bg-white p-6 max-w-xl mx-auto"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Don’t fill this: <input name="bot-field" />
          </label>
        </p>

        <label className="grid gap-1 mb-3">
          <span className="text-sm font-medium">Full name</span>
          <input className="rounded-xl border px-3 py-2" name="name" required />
        </label>
        <label className="grid gap-1 mb-3">
          <span className="text-sm font-medium">Email</span>
          <input className="rounded-xl border px-3 py-2" type="email" name="email" required />
        </label>
        <label className="grid gap-1 mb-3">
          <span className="text-sm font-medium">Message</span>
          <textarea className="rounded-xl border px-3 py-2" rows="5" name="message" required />
        </label>

        <button className="mt-3 rounded-full px-5 py-3 text-white font-semibold bg-orange-500">
          Send
        </button>
      </form>
    </Section>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [path, nav] = useHashRoute();

  return (
    <div className="min-h-screen bg-white">
      <Header path={path} nav={nav} />
      <main>
        {path === "/" && <Home />}
        {path === "/programs" && <Programs />}
        {path === "/testimonials" && <Testimonials />}
        {path === "/gallery" && <Gallery />}
        {path === "/shop" && <Shop />}
        {path === "/contact" && <Contact />}
      </main>
      <footer className="bg-slate-800 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} I LIKE ME Nonprofit</p>
      </footer>
    </div>
  );
}
