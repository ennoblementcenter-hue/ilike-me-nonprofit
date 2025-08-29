import React, { useEffect, useMemo, useState, useRef } from "react";

/**
 * I LIKE ME — Nonprofit Website (single-file React app)
 * Brand-forward, image-friendly, testimonials, programs, gallery, and CTAs.
 * - Hash router (no deps). Tailwind classes for styling.
 * - Drop images in /public/images and logo in /public/logo.png when exporting.
 */

// ----------------------------
// Utilities
// ----------------------------
const routes = [
  { path: "/", title: "Home" },
  { path: "/about", title: "About" },
  { path: "/programs", title: "Programs" },
  { path: "/pillars", title: "Pillars" },
  { path: "/impact", title: "Impact" },
  { path: "/resources", title: "Resources" },
  { path: "/testimonials", title: "Testimonials" },
  { path: "/gallery", title: "Gallery" },
  { path: "/get-involved", title: "Get Involved" },
  { path: "/donate", title: "Donate" },
  { path: "/contact", title: "Contact" },
  { path: "/privacy", title: "Privacy" },
  { path: "/terms", title: "Terms" },
];

function useHashRoute() {
  const getPath = () => {
    const raw = window.location.hash.replace(/^#/, "");
    return raw || "/";
  };
  const [path, setPath] = useState(getPath());
  useEffect(() => {
    const onHash = () => setPath(getPath());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [path, (to) => (window.location.hash = to)];
}

function setPageTitle(path) {
  const match = routes.find((r) => r.path === path);
  const t = match ? match.title : "Page";
  document.title = `${t} — I LIKE ME`;
}

// ----------------------------
// Branding (colors from logo: teal + orange)
// ----------------------------
const BRAND = {
  name: "I LIKE ME",
  tagline: "Healing shame. Building resilient youth and families.",
  colors: {
    teal: "#00A9C6", // primary based on logo
    orange: "#FF6A13", // accent based on logo
    dark: "#0f172a",
  },
};

const Logo = ({ className = "h-9 w-auto" }) => (
  <img src="/logo.png" alt="I LIKE ME logo" className={className} onError={(e)=>{e.currentTarget.src="https://dummyimage.com/200x200/00a9c6/ffffff&text=I+LIKE+ME";}}/>
);

// ----------------------------
// Layout
// ----------------------------
function Shell({ path, navigate, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header path={path} navigate={navigate} />
      <main className="flex-1">{children}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ path, navigate }) {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/programs", label: "Programs" },
    { to: "/pillars", label: "Pillars" },
    { to: "/impact", label: "Impact" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/gallery", label: "Gallery" },
    { to: "/get-involved", label: "Get Involved" },
    { to: "/resources", label: "Resources" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3" aria-label="Go to home">
            <Logo className="h-9 w-auto" />
            <span className="text-lg sm:text-xl font-black tracking-tight" style={{color: BRAND.colors.dark}}>{BRAND.name}</span>
          </button>

          <nav className="hidden md:flex gap-1">
            {navItems.map((n) => (
              <NavItem key={n.to} active={path === n.to} onClick={() => navigate(n.to)}>
                {n.label}
              </NavItem>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/donate")} className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{backgroundColor: BRAND.colors.orange}}>Donate</button>
            <button className="md:hidden inline-flex items-center rounded-full p-2 hover:bg-slate-100" aria-label="Open menu" onClick={() => { const el = document.getElementById("mobile-nav"); if (!el) return; el.classList.toggle("hidden"); }}>☰</button>
          </div>
        </div>

        {/* Mobile nav */}
        <div id="mobile-nav" className="md:hidden hidden pb-4">
          <div className="grid gap-1">
            {routes.filter((r) => ["/", "/about", "/programs", "/pillars", "/impact", "/testimonials", "/gallery", "/get-involved", "/resources"].includes(r.path)).map((r) => (
              <button key={r.path} onClick={() => { navigate(r.path); const el = document.getElementById("mobile-nav"); if (el) el.classList.add("hidden"); }} className={`text-left px-3 py-2 rounded hover:bg-slate-100 ${path === r.path ? "bg-slate-100" : ""}`}>{r.title}</button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`px-3 py-2 rounded-full text-sm font-medium hover:bg-slate-100 focus:outline-none ${active ? "bg-slate-100" : ""}`}>{children}</button>
  );
}

function Section({ id, title, intro, children }) {
  return (
    <section id={id} className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{color: BRAND.colors.dark}}>{title}</h2>
          {intro && <p className="mt-2 text-slate-600 max-w-3xl">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Logo className="h-9 w-auto" />
              <span className="font-extrabold">{BRAND.name}</span>
            </div>
            <p className="text-sm text-slate-600 max-w-xs">{BRAND.tagline}</p>
          </div>
          <FooterCol title="Organization">
            <FooterLink navigate={navigate} to="/about">About</FooterLink>
            <FooterLink navigate={navigate} to="/pillars">Pillars</FooterLink>
            <FooterLink navigate={navigate} to="/programs">Programs</FooterLink>
            <FooterLink navigate={navigate} to="/impact">Impact</FooterLink>
          </FooterCol>
          <FooterCol title="Engage">
            <FooterLink navigate={navigate} to="/get-involved">Get Involved</FooterLink>
            <FooterLink navigate={navigate} to="/testimonials">Testimonials</FooterLink>
            <FooterLink navigate={navigate} to="/gallery">Gallery</FooterLink>
            <FooterLink navigate={navigate} to="/resources">Resources</FooterLink>
          </FooterCol>
          <FooterCol title="Legal">
            <FooterLink navigate={navigate} to="/privacy">Privacy</FooterLink>
            <FooterLink navigate={navigate} to="/terms">Terms</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 text-sm text-slate-600">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <div className="flex gap-3">
            <button onClick={() => navigate("/donate")} className="rounded-full px-4 py-2 text-white text-sm font-semibold" style={{backgroundColor: BRAND.colors.orange}}>Donate</button>
            <button onClick={() => navigate("/contact")} className="rounded-full px-4 py-2 text-sm font-semibold border" style={{borderColor: BRAND.colors.teal, color: BRAND.colors.teal}}>Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">{title}</h3>
      <nav className="grid gap-2 text-slate-600">{children}</nav>
    </div>
  );
}

function FooterLink({ to, children, navigate }) {
  return (
    <button onClick={() => navigate(to)} className="text-left hover:underline">{children}</button>
  );
}

// ----------------------------
// Home
// ----------------------------
function Home({ navigate }) {
  return (
    <>
      <Hero navigate={navigate} />
      <PillarsPreview navigate={navigate} />
      <ProgramsStrip navigate={navigate} />
      <TestimonialsCompact navigate={navigate} />
      <CTABanner navigate={navigate} />
    </>
  );
}

function Hero({ navigate }) {
  return (
    <section className="relative overflow-hidden" style={{background: `linear-gradient(135deg, ${BRAND.colors.teal}0D, #ffffff)`}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{backgroundColor: `${BRAND.colors.teal}1A`, color: BRAND.colors.teal}}>
            Faith-forward • Evidence-informed • Community-powered
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight" style={{color: BRAND.colors.dark}}>
            You are not broken. You are becoming.
          </h1>
          <p className="mt-4 text-lg text-slate-700 max-w-xl">
            We help youth and families heal shame, grow self-worth, and lead with courage through our Six Pillars: Self‑Care, Self‑Respect, Self‑Esteem, Self‑Acceptance, Self‑Trust, and Self‑Empowerment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => navigate("/programs")} className="rounded-full px-5 py-3 text-white font-semibold" style={{backgroundColor: BRAND.colors.orange}}>Explore Programs</button>
            <button onClick={() => navigate("/donate")} className="rounded-full px-5 py-3 font-semibold border" style={{borderColor: BRAND.colors.teal, color: BRAND.colors.teal}}>Donate</button>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{k:"Youth served",v:"1,200+"},{k:"Workshops",v:"250+"},{k:"Partners",v:"35+"},{k:"Volunteer hrs",v:"8,000+"}].map(m=> (
              <div key={m.k} className="rounded-2xl border p-4">
                <div className="text-sm text-slate-600">{m.k}</div>
                <div className="text-2xl font-black" style={{color: BRAND.colors.teal}}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-200">
            <img src="/images/hero.jpg" alt="Youth empowerment" className="w-full h-full object-cover" onError={(e)=>{e.currentTarget.src="https://images.unsplash.com/photo-1529336953121-ad5a0d43d0fa?auto=format&fit=crop&w=1200&q=60";}}/>
          </div>
          <div className="absolute -bottom-6 -right-6 rounded-2xl px-4 py-3 text-white text-sm font-semibold" style={{backgroundColor: BRAND.colors.teal}}>I LIKE ME Community</div>
        </div>
      </div>
    </section>
  );
}

function PillarsPreview({ navigate }) {
  return (
    <Section id="pillars-preview" title="Six Pillars of I LIKE ME" intro="The backbone of every curriculum, workshop, and mentorship touchpoint.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-2xl border p-6 bg-white">
            <h3 className="text-xl font-bold" style={{color: BRAND.colors.teal}}>{p.title}</h3>
            <p className="text-slate-600 mt-1">{p.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button onClick={() => navigate("/pillars")} className="rounded-full px-5 py-3 text-white font-semibold" style={{backgroundColor: BRAND.colors.orange}}>See Pillars</button>
      </div>
    </Section>
  );
}

function ProgramsStrip({ navigate }) {
  const items = programCards();
  return (
    <Section id="programs-strip" title="Curriculum Pathways" intro="Multi-faceted supports tailored to schools, hospitals, churches, and community orgs.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border bg-white overflow-hidden">
            <img src={it.img} alt="" className="h-40 w-full object-cover" onError={(e)=>{e.currentTarget.src="https://images.unsplash.com/photo-1517232115160-ff93364542dd?auto=format&fit=crop&w=1200&q=60";}}/>
            <div className="p-5">
              <h3 className="text-lg font-bold" style={{color: BRAND.colors.teal}}>{it.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{it.body}</p>
              <button onClick={()=>navigate("/programs")} className="mt-3 rounded-full px-4 py-2 text-white text-sm font-semibold" style={{backgroundColor: BRAND.colors.orange}}>Learn more</button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TestimonialsCompact({ navigate }) {
  return (
    <Section id="testimonials-compact" title="Voices of Change" intro="Real outcomes in real communities.">
      <Testimonials />
      <div className="mt-6"><button onClick={()=>navigate("/get-involved")} className="rounded-full px-5 py-3 text-white font-semibold" style={{backgroundColor: BRAND.colors.orange}}>Get involved</button></div>
    </Section>
  );
}

// ----------------------------
// About
// ----------------------------
function About() {
  return (
    <Section id="about" title="About I LIKE ME" intro="Trauma-informed, equity-centered, and rooted in faith and community.">
      <div className="prose prose-slate max-w-none">
        <p>
          {BRAND.name} equips youth and the adults who serve them to heal shame and build durable self-worth. Our pedagogy blends research-backed SEL practices with spiritual formation and community action.
        </p>
        <h3>Mission</h3>
        <p>Transform mindsets and environments so young people say with conviction: “I like me.”</p>
        <h3>Vision</h3>
        <p>Communities where dignity is protected, relationships are healthy, and purpose is practiced.</p>
        <h3>Values</h3>
        <ul>
          <li>Dignity first</li>
          <li>Evidence with empathy</li>
          <li>Community over isolation</li>
          <li>Stewardship and transparency</li>
        </ul>
      </div>
    </Section>
  );
}

// ----------------------------
// Pillars
// ----------------------------
const pillars = [
  { title: "Self‑Care", body: "Sustainable rhythms for body, mind, and spirit. Rest, boundaries, and recovery." },
  { title: "Self‑Respect", body: "Honor your story. Name needs. Uphold standards in relationships and spaces." },
  { title: "Self‑Esteem", body: "Recognize strengths and growing edges. Celebrate progress with humility." },
  { title: "Self‑Acceptance", body: "Own your narrative. Release shame. Integrate past pain into present purpose." },
  { title: "Self‑Trust", body: "Discern wisely. Keep promises to yourself. Build inner credibility." },
  { title: "Self‑Empowerment", body: "Act with agency. Lead change in community. Choose courageous next steps." },
];

function Pillars() {
  return (
    <Section id="pillars" title="Six Pillars" intro="Each pillar includes age-banded curricula, caregiver guides, facilitator notes, and impact measures.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-2xl border bg-white p-6">
            <h3 className="text-xl font-bold" style={{color: BRAND.colors.teal}}>{p.title}</h3>
            <p className="text-slate-600">{p.body}</p>
            <ul className="mt-4 text-sm list-disc pl-5 text-slate-600">
              <li>Student lesson series</li>
              <li>Caregiver conversation cards</li>
              <li>Faith integration notes</li>
              <li>Outcome rubrics</li>
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ----------------------------
// Programs (expanded per your brief)
// ----------------------------
function programCards(){
  return [
    { title: "I LIKE ME Youth Program", body: "Build self-image, self-trust, and resilience to trauma and ACEs.", img: "/images/ylp.jpg" },
    { title: "I LIKE ME Bedside Intervention", body: "Reduce recidivism and catalyze growth during vulnerable moments.", img: "/images/bedside.jpg" },
    { title: "I LIKE ME Intimate Violence Prevention", body: "Trauma-informed care, self-respect, and healthy relationship dynamics.", img: "/images/ivp.jpg" },
    { title: "I LIKE ME LGBTQ Empowerment", body: "Affirming supports for LGBTQ youth—self-acceptance, esteem, and resilience.", img: "/images/lgbtq.jpg" },
    { title: "I LIKE ME Staff & Administrator Curriculum", body: "Equip adults with empathy, language, and tools to reinforce the Six Pillars.", img: "/images/staff.jpg" },
  ];
}

function Programs() {
  const items = programCards();
  return (
    <Section id="programs" title="Curriculum Portfolio" intro="Modular programs you can deploy together or as stand‑alone tracks.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border bg-white overflow-hidden">
            <img src={it.img} alt="" className="h-44 w-full object-cover" onError={(e)=>{e.currentTarget.src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=60";}}/>
            <div className="p-5">
              <h3 className="text-lg font-bold" style={{color: BRAND.colors.teal}}>{it.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{it.body}</p>
              <ul className="mt-3 text-sm list-disc pl-5 text-slate-600">
                <li>Aligned to Six Pillars</li>
                <li>Facilitator training available</li>
                <li>Measurable outcomes</li>
              </ul>
              <div className="mt-4 flex gap-2">
                <a href="#" className="rounded-full px-4 py-2 text-white text-sm font-semibold" style={{backgroundColor: BRAND.colors.orange}}>Book a call</a>
                <a href="#" className="rounded-full px-4 py-2 text-sm font-semibold border" style={{borderColor: BRAND.colors.teal, color: BRAND.colors.teal}}>Request proposal</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <DownloadCard title="Program Data Sheet" desc="Overview, outcomes, and implementation models." href="#" />
        <DownloadCard title="Latest Newsletter" desc="Impact stories and partner highlights." href="#" />
      </div>
    </Section>
  );
}

function DownloadCard({title,desc,href}){
  return (
    <div className="rounded-2xl border bg-white p-6 flex items-center justify-between">
      <div>
        <h3 className="font-semibold" style={{color: BRAND.colors.teal}}>{title}</h3>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
      <a href={href} className="rounded-full px-4 py-2 text-white text-sm font-semibold" style={{backgroundColor: BRAND.colors.orange}}>Download</a>
    </div>
  );
}

// ----------------------------
// Testimonials
// ----------------------------
function Testimonials() {
  const items = [
    { quote: "I LIKE ME helped our students name their worth and repair relationships.", name: "Assistant Principal", org: "Urban HS Partner" },
    { quote: "The bedside intervention changed the trajectory for my son.", name: "Parent", org: "Children's Hospital" },
    { quote: "Staff now have shared language for empathy and accountability.", name: "Program Director", org: "Community Center" },
  ];
  const [i,setI] = useState(0);
  const timer = useRef(null);
  useEffect(()=>{ timer.current = setInterval(()=>setI((p)=> (p+1)%items.length), 5000); return ()=>clearInterval(timer.current);},[]);
  return (
    <div className="rounded-3xl border bg-white p-6 md:p-10">
      <p className="text-lg md:text-xl font-semibold leading-snug">
        “{items[i].quote}”
      </p>
      <div className="mt-3 text-sm text-slate-600">— {items[i].name}, {items[i].org}</div>
      <div className="mt-6 flex gap-2">
        {items.map((_,idx)=> (
          <button key={idx} aria-label={`Slide ${idx+1}`} onClick={()=>setI(idx)} className={`h-2 w-2 rounded-full ${i===idx?"opacity-100":"opacity-40"}`} style={{backgroundColor: BRAND.colors.teal}} />
        ))}
      </div>
    </div>
  );
}

function TestimonialsPage(){
  return (
    <Section id="testimonials" title="Testimonials" intro="What partners, parents, and students say.">
      <div className="grid gap-6">
        <Testimonials />
        <Testimonials />
      </div>
    </Section>
  );
}

// ----------------------------
// Gallery
// ----------------------------
function Gallery(){
  const pics = ["/images/g1.jpg","/images/g2.jpg","/images/g3.jpg","/images/g4.jpg","/images/g5.jpg","/images/g6.jpg"];
  return (
    <Section id="gallery" title="Gallery" intro="Moments of joy, learning, and courage.">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {pics.map((p,idx)=> (
          <img key={idx} src={p} alt="I LIKE ME" className="aspect-[4/3] w-full object-cover rounded-xl border" onError={(e)=>{e.currentTarget.src=`https://picsum.photos/seed/ilm${idx}/600/450`;}}/>
        ))}
      </div>
    </Section>
  );
}

// ----------------------------
// Get Involved
// ----------------------------
function GetInvolved(){
  return (
    <Section id="get-involved" title="Get Involved" intro="Mentor a student, host a workshop, or fuel a program with your gift.">
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Volunteer" body="Mentor, facilitate, or support events. Training provided." />
        <Card title="Partner" body="Schools, churches, and orgs host programs and co-design solutions." />
        <Card title="Give" body="Your monthly gift sustains workshops, coaching, and materials." />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <SignupForm />
        <PartnerForm />
      </div>
    </Section>
  );
}

function Card({ title, body }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold" style={{color: BRAND.colors.teal}}>{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{body}</p>
    </div>
  );
}

function CTABanner({ navigate }) {
  return (
    <section className="py-10 text-white" style={{background: `linear-gradient(90deg, ${BRAND.colors.teal}, ${BRAND.colors.orange})`}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold">Ready to co-design impact?</h3>
          <p className="text-white/90">Let’s align on outcomes and take actionable next steps.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate("/contact")} className="rounded-full bg-white text-slate-900 font-semibold px-5 py-3 hover:opacity-90">Book a meeting</button>
          <button onClick={() => navigate("/donate")} className="rounded-full bg-black/10 font-semibold px-5 py-3 hover:bg-black/20">Donate</button>
        </div>
      </div>
    </section>
  );
}

// ----------------------------
// Impact (placeholder metrics)
// ----------------------------
function Impact(){
  return (
    <Section id="impact" title="Impact" intro="We track what matters: mindsets, relationships, and community action.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { k: "Students reached", v: "1,200+" },
          { k: "Confidence delta", v: "+23%" },
          { k: "Mentor matches", v: "180" },
          { k: "Partner sites", v: "35" },
        ].map((m) => (
          <div key={m.k} className="rounded-2xl border bg-white p-6">
            <div className="text-sm text-slate-600">{m.k}</div>
            <div className="text-3xl font-black" style={{color: BRAND.colors.teal}}>{m.v}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-600">Swap in live dashboards or CSV-driven stats.</p>
    </Section>
  );
}

// ----------------------------
// Resources
// ----------------------------
function Resources(){
  const items = [
    { title: "Caregiver Guide: Talking Self-Worth", type: "PDF", size: "1.2MB" },
    { title: "Facilitator Toolkit: Six Pillars", type: "PDF", size: "2.8MB" },
    { title: "Devotional Cards (6)", type: "Printable", size: "A6" },
  ];
  return (
    <Section id="resources" title="Resources" intro="Download guides and tools for home, school, or church.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold" style={{color: BRAND.colors.teal}}>{it.title}</h3>
            <p className="text-sm text-slate-600">{it.type} · {it.size}</p>
            <button className="mt-3 rounded-full px-4 py-2 text-white text-sm font-semibold" style={{backgroundColor: BRAND.colors.orange}}>Download</button>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ----------------------------
// Donate
// ----------------------------
function Donate(){
  const tiers = [
    { amt: "$25", desc: "Supplies for a workshop" },
    { amt: "$50", desc: "Student journal + cards" },
    { amt: "$100", desc: "Sponsor a healing circle" },
    { amt: "$250", desc: "Underwrite facilitator training" },
    { amt: "$500", desc: "Support a school partnership" },
  ];
  return (
    <Section id="donate" title="Donate" intro="Your gift powers workshops, mentoring, and resources that change trajectories.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {tiers.map((t)=> (
          <div key={t.amt} className="rounded-2xl border bg-white p-6 text-center">
            <div className="text-3xl font-black" style={{color: BRAND.colors.teal}}>{t.amt}</div>
            <p className="mt-2 text-sm text-slate-600">{t.desc}</p>
            <a href="#" className="mt-4 inline-block rounded-full px-5 py-3 text-white font-semibold" style={{backgroundColor: BRAND.colors.orange}}>Give {t.amt}</a>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border bg-orange-50 p-6" style={{borderColor: `${BRAND.colors.orange}66`}}>
        <h3 className="font-semibold" style={{color: BRAND.colors.orange}}>Monthly partners multiply impact</h3>
        <p className="text-sm text-orange-900/80">Become a sustaining donor to fund consistent programming and rapid response to needs.</p>
        <a href="#" className="mt-3 inline-block rounded-full px-5 py-3 text-white font-semibold" style={{backgroundColor: BRAND.colors.orange}}>Give Monthly</a>
      </div>
    </Section>
  );
}

// ----------------------------
// Contact
// ----------------------------
function GetFieldId(label){ return label.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.random().toString(36).slice(2,7); }

function Contact(){
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e) => { e.preventDefault(); alert("Thanks for reaching out. We’ll reply soon."); };
  return (
    <Section id="contact" title="Contact" intro="Let’s connect on alignment, pilots, and next steps.">
      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={submit} className="rounded-2xl border bg-white p-6">
          <div className="grid gap-3">
            <Input label="Full name" value={form.name} onChange={(v)=>setForm({...form,name:v})} required />
            <Input label="Email" type="email" value={form.email} onChange={(v)=>setForm({...form,email:v})} required />
            <Textarea label="Message" rows={5} value={form.message} onChange={(v)=>setForm({...form,message:v})} required />
            <button className="rounded-full px-5 py-3 text-white font-semibold" style={{backgroundColor: BRAND.colors.orange}}>Send</button>
          </div>
        </form>
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-lg font-semibold" style={{color: BRAND.colors.teal}}>Mailing</h3>
          <p className="text-sm text-slate-600">1234 Purpose Ave, Suite 100<br/>Dallas, TX 75201</p>
          <h3 className="mt-4 text-lg font-semibold" style={{color: BRAND.colors.teal}}>Email</h3>
          <a className="text-sm" style={{color: BRAND.colors.teal}} href="mailto:info@ilike.me">info@ilike.me</a>
          <h3 className="mt-4 text-lg font-semibold" style={{color: BRAND.colors.teal}}>Social</h3>
          <div className="flex gap-3 text-sm">
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">YouTube</a>
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ----------------------------
// Simple Inputs
// ----------------------------
function Input({ label, type = "text", value, onChange, required }) {
  const id = useMemo(()=>GetFieldId(label), [label]);
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">{label}</span>
      <input id={id} type={type} required={required} value={value} onChange={(e)=>onChange(e.target.value)} className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2" style={{borderColor: `${BRAND.colors.teal}66`, boxShadow: `0 0 0 0 rgba(0,0,0,0)`}} />
    </label>
  );
}

function Textarea({ label, rows = 4, value, onChange, required }) {
  const id = useMemo(()=>GetFieldId(label), [label]);
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">{label}</span>
      <textarea id={id} rows={rows} required={required} value={value} onChange={(e)=>onChange(e.target.value)} className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2" style={{borderColor: `${BRAND.colors.teal}66`}} />
    </label>
  );
}

function Select({ label, value, onChange, options = [] }) {
  const id = useMemo(()=>GetFieldId(label), [label]);
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">{label}</span>
      <select id={id} value={value} onChange={(e)=>onChange(e.target.value)} className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2" style={{borderColor: `${BRAND.colors.teal}66`}}>
        {options.map((o)=> (<option key={o} value={o}>{o}</option>))}
      </select>
    </label>
  );
}

// ----------------------------
// Router
// ----------------------------
function Router({ path, navigate }) {
  useEffect(() => setPageTitle(path), [path]);
  switch (path) {
    case "/": return <Home navigate={navigate} />;
    case "/about": return <About />;
    case "/pillars": return <Pillars />;
    case "/programs": return <Programs />;
    case "/impact": return <Impact />;
    case "/resources": return <Resources />;
    case "/testimonials": return <TestimonialsPage />;
    case "/gallery": return <Gallery />;
    case "/get-involved": return <GetInvolved />;
    case "/donate": return <Donate />;
    case "/contact": return <Contact />;
    case "/privacy": return <Privacy />;
    case "/terms": return <Terms />;
    default: return (
      <Section id="404" title="Not found"><p className="text-slate-600">This page does not exist.</p></Section>
    );
  }
}

// ----------------------------
// Privacy & Terms
// ----------------------------
function Privacy(){
  return (
    <Section id="privacy" title="Privacy Policy" intro="Your privacy matters.">
      <div className="prose prose-slate max-w-none">
        <p>We collect minimal data to deliver services, newsletters, and donation receipts. We do not sell your data. You may request deletion at any time.</p>
        <h3>Data We Collect</h3>
        <ul>
          <li>Contact info when you submit forms</li>
          <li>Donation details via our payment processor</li>
          <li>Anonymous usage analytics (optional)</li>
        </ul>
        <h3>Contact</h3>
        <p>Email privacy@ilike.me for requests.</p>
      </div>
    </Section>
  );
}

function Terms(){
  return (
    <Section id="terms" title="Terms of Use" intro="Plain-language summary of your rights and responsibilities.">
      <div className="prose prose-slate max-w-none">
        <p>Use this site respectfully. Content is informational and inspirational, not clinical advice. By donating or purchasing, you agree to the payment processor’s terms.</p>
      </div>
    </Section>
  );
}

// ----------------------------
// App
// ----------------------------
export default function ILikeMeSite(){
  const [path, navigate] = useHashRoute();
  return (
    <Shell path={path} navigate={navigate}>
      <Router path={path} navigate={navigate} />
    </Shell>
  );
}
