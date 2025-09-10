import React, { useEffect, useState } from "react";

/* ---------- Section wrapper ---------- */
function Section({ id, title, intro, children }) {
  return (
    <section id={id} className="py-16 px-6 md:px-12 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {title && <h2 className="text-3xl font-bold text-center text-slate-800">{title}</h2>}
        {intro && <p className="mt-3 text-lg text-center text-slate-600 max-w-3xl mx-auto">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/* ---------- Hash router ---------- */
function useHashRoute() {
  const get = () => (window.location.hash.replace(/^#/, "") || "/");
  const [path, setPath] = useState(get());
  useEffect(() => {
    const on = () => setPath(get());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const nav = (to) => (window.location.hash = to);
  return [path, nav];
}

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
        <nav className="ml-auto flex flex-wrap items-center gap-2">
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
          {/* Calendly in nav */}
          <a
            href="https://calendly.com/YOUR-USERNAME/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-orange-500 hover:bg-orange-600"
          >
            Book a Call
          </a>
        </nav>
      </div>
    </header>
  );
}


/* ---------- Home ---------- */
function Home() {
  return (
    <Section id="home" title="Welcome to I LIKE ME" intro="Healing shame, building resilient youth and families.">
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

/* ---------- Programs data ---------- */
const PROGRAMS = [
  {
    slug: "youth",
    title: "I LIKE ME Youth Program",
    blurb: "Self-image, self-trust, resilience to trauma and ACEs.",
    long:
      "A strengths-based curriculum that helps young people reframe trauma into resilience. Through interactive activities, journaling, and peer dialogue, participants learn to recognize adverse experiences while building self-esteem, emotional literacy, and healthy coping strategies. By centering the Six Pillars—self-care, self-respect, self-esteem, self-acceptance, self-trust, and self-empowerment—youth leave with practical tools for confidence and connection.",
    img: "/images/ylp.png",
  },
  {
    slug: "bedside",
    title: "Bedside Intervention",
    blurb: "Reduce recidivism. Catalyze growth during vulnerable moments.",
    long:
      "A hospital- and detention-based intervention that meets individuals at moments of crisis. Facilitators provide trauma-informed conversation, reflective exercises, and linkages to aftercare. The goal is to transform a potentially destabilizing event into an entry point for growth, reducing recidivism and empowering participants to set new life trajectories.",
    img: "/images/bedside.png",
  },
  {
    slug: "ipv",
    title: "Intimate Violence Prevention (IVP)",
    blurb: "Trauma-informed care and healthy relationships.",
    long:
      "A program designed to break cycles of harm by equipping participants with skills for self-respect, boundary setting, and healthy relationships. Grounded in trauma-informed care, IVP blends education with reflective dialogue to reduce intimate partner violence and restore dignity. Participants gain practical strategies to protect themselves and to cultivate relationships rooted in safety and mutual care.",
    img: "/images/ivp.png",
  },
  {
    slug: "lgbtq",
    title: "LGBTQ Empowerment",
    blurb: "Affirming supports for self-acceptance and resilience.",
    long:
      "A safe and affirming space for LGBTQ youth to embrace identity, strengthen resilience, and find community. This program integrates self-acceptance practices, peer support, and affirmational tools that counter stigma. By fostering belonging and confidence, LGBTQ Empowerment builds protective factors proven to reduce risk behaviors and enhance mental health.",
    img: "/images/lgbtq.png",
  },
  {
    slug: "staff",
    title: "Staff & Administrator Curriculum",
    blurb: "Equip adults to reinforce the Six Pillars.",
    long:
      "Training and resources for educators, administrators, and youth-serving professionals. The curriculum equips adults to model empathy, support healing, and enforce accountability in ways that reinforce dignity. Participants leave with strategies to manage classrooms, engage families, and lead organizations aligned with the Six Pillars—creating environments where youth thrive.",
    img: "/images/staff.png",
  },
  {
    slug: "reentry",
    title: "Reentry Program",
    blurb: "Support justice-involved youth in successful transitions.",
    long:
      "The Reentry Program is designed to accompany youth and young adults as they return from detention or incarceration. It combines evidence-informed reentry planning, mentoring, and trauma recovery supports. Participants strengthen their self-worth, learn practical decision-making skills, and build pro-social connections that reduce recidivism. By integrating the Six Pillars with workforce readiness and community engagement, the program helps participants create sustainable pathways toward healing and opportunity.",
    img: "/images/reentry.png",
  },
];
const PROGRAMS_MAP = Object.fromEntries(PROGRAMS.map((p) => [p.slug, p]));

function Programs({ nav }) {
  return (
    <Section id="programs" title="Curriculum Pathways" intro="Tailored to schools, hospitals, churches, and community orgs.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROGRAMS.map((p) => (
          <div key={p.slug} className="rounded-2xl border bg-white overflow-hidden">
            <img
              src={p.img}
              alt={p.title}
              className="h-48 w-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/ilmprog/800/600"; }}
            />
            <div className="p-5">
              <h3 className="text-lg font-bold text-teal-700">{p.title}</h3>
              <p className="text-slate-600 text-sm mt-1">{p.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => nav(`/program/${p.slug}`)}
                  className="rounded-full px-4 py-2 text-sm font-semibold border border-teal-600 text-teal-700"
                >
                  Learn more
                </button>
                <button
                  onClick={() => nav(`/inquire?program=${p.slug}`)}
                  className="rounded-full px-4 py-2 text-sm font-semibold bg-orange-500 text-white"
                >
                  Request proposal
                </button>
                {/* Calendly on cards */}
                <a
                  href="https://calendly.com/YOUR-USERNAME/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
                >
                  Book a call
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}


/* ---------- Program detail ---------- */
function ProgramDetail({ slug, nav }) {
  const clean = (slug || "").split("?")[0];
  const p = PROGRAMS_MAP[clean];
  if (!p) {
    return (
      <Section id="program" title="Program not found">
        <button onClick={() => nav("/programs")} className="rounded-full px-4 py-2 border">Back to Programs</button>
      </Section>
    );
  }
  return (
    <Section id={`program-${clean}`} title={p.title} intro={p.blurb}>
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={p.img}
          alt={p.title}
          className="w-full h-72 object-cover rounded-2xl border"
          onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/ilmprogdetail/1000/700"; }}
        />
        <div className="rounded-2xl border bg-white p-6">
          <p className="text-slate-700">{p.long}</p>
          <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-1">
            <li>Six Pillars integration</li>
            <li>Facilitator training and toolkits</li>
            <li>Pre/post measures and reporting</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={() => nav(`/inquire?program=${clean}`)} className="rounded-full px-5 py-3 bg-orange-500 text-white font-semibold">Request proposal</button>
            <a href={`mailto:info@ilikeme.org?subject=Book a call: ${encodeURIComponent(p.title)}`} className="rounded-full px-5 py-3 bg-teal-600 text-white font-semibold">Book a call</a>
            <button onClick={() => nav("/programs")} className="rounded-full px-5 py-3 border">Back</button>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Inquire (Netlify lead form + Calendly) ---------- */
function getQueryFromHash() {
  const hash = window.location.hash || "";
  const q = hash.includes("?") ? hash.split("?")[1] : "";
  return new URLSearchParams(q);
}
function Inquire() {
  const params = typeof window !== "undefined" ? getQueryFromHash() : new URLSearchParams();
  const program = params.get("program") || "";
  const thanks = params.get("thanks") === "1";
  const progTitle = PROGRAMS_MAP[program]?.title || "General inquiry";

  return (
    <Section id="inquire" title="Request a Proposal" intro={progTitle}>
      <form
        name="program-inquiry"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/#/inquire?thanks=1"
        className="rounded-2xl border bg-white p-6 max-w-xl mx-auto"
      >
        <input type="hidden" name="form-name" value="program-inquiry" />
        <input type="hidden" name="program" value={progTitle} />
        <p className="hidden"><label>Don’t fill this: <input name="bot-field" /></label></p>

        <label className="grid gap-1 mb-3">
          <span className="text-sm font-medium">Organization</span>
          <input className="rounded-xl border px-3 py-2" name="organization" required />
        </label>

        <div className="grid md:grid-cols-2 gap-3">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Contact name</span>
            <input className="rounded-xl border px-3 py-2" name="name" required />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Email</span>
            <input className="rounded-xl border px-3 py-2" type="email" name="email" required />
          </label>
        </div>

        <label className="grid gap-1 mt-3">
          <span className="text-sm font-medium">Phone</span>
          <input className="rounded-xl border px-3 py-2" type="tel" name="phone" />
        </label>

        <label className="grid gap-1 mt-3">
          <span className="text-sm font-medium">What outcomes are you seeking?</span>
          <textarea className="rounded-xl border px-3 py-2" rows="5" name="message" />
        </label>

        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" name="consent" required />
          I agree to be contacted about this proposal.
        </label>

        <button className="mt-4 rounded-full px-5 py-3 text-white font-semibold bg-orange-500">
          Send request
        </button>

        {thanks && (
          <div className="mt-6 rounded-xl border p-4 text-sm text-green-700 bg-green-50">
            Thanks—your request was sent. We’ll contact you shortly.
          </div>
        )}
      </form>

      {/* Calendly embed */}
      <div
        className="calendly-inline-widget mt-10"
        data-url="https://calendly.com/ilikeme"
        style={{ minWidth: "320px", height: "700px" }}
      />
    </Section>
  );
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  { quote: "Students named their worth and repaired relationships.", name: "Assistant Principal", org: "Urban HS" },
  { quote: "The bedside intervention changed my son’s trajectory.", name: "Parent", org: "Children’s Hospital" },
  { quote: "Staff now share language for empathy and accountability.", name: "Program Director", org: "Community Center" },
];
function Testimonials() {
  return (
    <Section id="testimonials" title="Testimonials" intro="Real outcomes in real communities.">
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div key={idx} className="rounded-2xl border bg-white p-6">
            <p className="font-semibold">“{t.quote}”</p>
            <div className="mt-3 text-sm text-slate-600">— {t.name}{t.org ? `, ${t.org}` : ""}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Gallery ---------- */
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
            onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/ilm${idx}/600/450`; }}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------- Shop (Stripe links) ---------- */
const PRODUCTS = [
  { id: "ilm-workbook", name: "I LIKE ME Workbook", price: 25, img: "/images/shop-ILMwrkbk.png",           link: "https://buy.stripe.com/cNi9AS0Zg7Q28eK05I48000" },
  { id: "boop-book",   name: "Born Out of Pain — Memoir", price: 20, img: "/images/shop-BOOP-book.png",     link: "https://buy.stripe.com/aFa3cueQ63zM8eKf0C48001" },
  { id: "ilm-hat",     name: "I LIKE ME Hat",             price: 20, img: "/images/shop-blk-n-white-hat.png",link: "https://buy.stripe.com/bJebJ0fUa1rE2Uq7ya48005" },
  { id: "ilm-mug",     name: "I LIKE ME Mug",             price: 15, img: "/images/shop-ILMmug.png",         link: "https://buy.stripe.com/dRmcN4eQ69YaamS3hU48004" },
  { id: "ilm-tee",     name: "I LIKE ME T-Shirt",         price: 15, img: "/images/shop-blk-tee.png",        link: "https://buy.stripe.com/aFaeVcdM2c6i1QmdWy48002" },
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
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block rounded-full px-5 py-3 text-white font-semibold bg-orange-500">
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
        <p className="hidden"><label>Don’t fill this: <input name="bot-field" /></label></p>

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

        <button className="mt-3 rounded-full px-5 py-3 text-white font-semibold bg-orange-500">Send</button>
      </form>
    </Section>
  );
}

/* ---------- App (default export) ---------- */
export default function App() {
  const [path, nav] = useHashRoute();

  return (
    <div className="min-h-screen bg-white">
      <Header path={path} nav={nav} />
      <main>
        {path === "/" && <Home />}
        {path === "/programs" && <Programs nav={nav} />}
        {path.startsWith("/program/") && <ProgramDetail slug={path.split("?")[0].split("/")[2]} nav={nav} />}
        {path.startsWith("/inquire") && <Inquire />}
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
