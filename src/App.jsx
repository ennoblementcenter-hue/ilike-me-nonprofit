import React, { useEffect, useMemo, useState } from "react";

/* ---------- Tiny layout helpers ---------- */
function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-teal-600 text-white">
      {/* Logo / Site Title */}
      <h1 className="text-xl font-bold">I LIKE ME</h1>

      {/* Navigation */}
      <nav className="space-x-6">
        <a href="#/" className="hover:underline">Home</a>
        <a href="#/programs" className="hover:underline">Programs</a>
        <a href="#/inquire" className="hover:underline">Inquire</a>
        <a href="#/contact" className="hover:underline">Contact</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-slate-600">
        © {new Date().getFullYear()} I LIKE ME. All rights reserved.
      </div>
    </footer>
  );
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

/* ---------- Program data ---------- */
const PROGRAMS = [
  {
    slug: "youth",
    title: "I LIKE ME Youth Program",
    image: "/images/program-youth.jpg",
    summary:
      "Builds self-image, trust, and resilience to trauma and Adverse Childhood Experiences (ACEs) using the Six Pillars.",
    audience: "Middle school, high school, community youth cohorts.",
    outcomes: [
      "Improved self-worth and self-talk",
      "Coping skills for stress and triggers",
      "Peer trust and prosocial behavior",
    ],
  },
  {
    slug: "bedside",
    title: "I LIKE ME Bedside Intervention",
    image: "/images/program-bedside.jpg",
    summary:
      "Brief, trauma-informed intervention delivered at critical moments to reduce recidivism and spark personal growth.",
    audience: "ER discharges, crisis recovery, inpatient transitions.",
    outcomes: [
      "Lower re-injury and recidivism risk",
      "Immediate grounding plan",
      "Warm handoff to ongoing supports",
    ],
  },
  {
    slug: "ipv",
    title: "I LIKE ME Intimate Violence Prevention",
    image: "/images/program-ipv.jpg",
    summary:
      "Centers self-respect, boundaries, and healthy relationship dynamics through practical, trauma-aware tools.",
    audience: "Teens, young adults, campus groups, community orgs.",
    outcomes: [
      "Boundary setting and consent fluency",
      "Early warning sign recognition",
      "Help-seeking confidence",
    ],
  },
  {
    slug: "lgbtq",
    title: "I LIKE ME LGBTQ Empowerment",
    image: "/images/program-lgbtq.jpg",
    summary:
      "Affirming spaces for self-acceptance, identity safety, and emotional resilience tailored to LGBTQ youth.",
    audience: "LGBTQ youth groups and Gay-Straight Alliances.",
    outcomes: [
      "Increased belonging and self-acceptance",
      "Protective coping skills",
      "Allies and resource mapping",
    ],
  },
  {
    slug: "staff",
    title: "I LIKE ME Staff & Administrator Curriculum",
    image: "/images/program-staff.jpg",
    summary:
      "Equips adults who serve youth with empathy, de-escalation, and Six Pillars aligned supports.",
    audience: "Teachers, counselors, site leaders, youth workers.",
    outcomes: [
      "Trauma-aware responses",
      "De-escalation routines",
      "Classroom culture aligned to the Six Pillars",
    ],
  },
  {
    slug: "reentry",
    title: "I LIKE ME Reentry Program",
    image: "/images/program-reentry.jpg",
    summary:
      "Stabilizes the first 90 days post-release with identity repair, goal scaffolds, and community accountability.",
    audience: "Returning citizens, reentry navigators, partner orgs.",
    outcomes: [
      "Milestone-based action plan",
      "Mentor and services braid-in",
      "Reduced returns to custody",
    ],
  },
];

/* ---------- Pages ---------- */
function Section({ id, title, intro, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 py-12">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      {intro && <p className="mt-2 text-slate-600">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Section>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              Healing shame. Building resilient youth and families.
            </h1>
            <p className="mt-4 text-slate-600">
              The I LIKE ME Curriculum turns the Six Pillars into daily habits
              that change how young people see themselves and show up for each other.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#/programs"
                className="px-5 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700"
              >
                Explore Programs
              </a>
              <a
                href="#/inquire"
                className="px-5 py-3 rounded-full border font-semibold hover:bg-slate-50"
              >
                Request a Proposal
              </a>
            </div>
          </div>
          <img
            src="/images/hero-youth.jpg"
            alt="Youth empowerment"
            className="rounded-2xl w-full object-cover"
          />
        </div>
      </Section>
    </>
  );
}

function Programs({ nav }) {
  return (
    <Section
      id="programs"
      title="Programs"
      intro="Each pathway uses the Six Pillars to fit your context."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROGRAMS.map((p) => (
          <article key={p.slug} className="rounded-2xl border bg-white overflow-hidden">
            <img
              src={p.image}
              alt={p.title}
              className="h-40 w-full object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{p.summary}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => nav(`/program/${p.slug}`)}
                  className="px-4 py-2 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700"
                >
                  View details
                </button>
                <a
                  href={`#/inquire?program=${encodeURIComponent(p.slug)}`}
                  className="px-4 py-2 rounded-full border text-sm font-semibold hover:bg-slate-50"
                >
                  Request proposal
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProgramDetail({ slug, nav }) {
  const program = useMemo(
    () => PROGRAMS.find((p) => p.slug === slug),
    [slug]
  );

  if (!program) {
    return (
      <Section>
        <p className="text-slate-600">Program not found.</p>
        <div className="mt-4">
          <a href="#/programs" className="text-teal-700 underline">Back to programs</a>
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <img
            src={program.image}
            alt={program.title}
            className="rounded-2xl w-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{program.title}</h1>
            <p className="mt-3 text-slate-700">{program.summary}</p>
            <div className="mt-5">
              <h4 className="font-semibold">Audience</h4>
              <p className="text-slate-700">{program.audience}</p>
            </div>
            <div className="mt-5">
              <h4 className="font-semibold">Core outcomes</h4>
              <ul className="list-disc pl-6 text-slate-700">
                {program.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={`#/inquire?program=${encodeURIComponent(program.slug)}`}
                className="px-5 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700"
              >
                Request proposal
              </a>
              <button
                onClick={() => nav("/programs")}
                className="px-5 py-3 rounded-full border font-semibold hover:bg-slate-50"
              >
                Back to programs
              </button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Inquire() {
  // read ?program=… to prefill hidden field
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  const prefill = params.get("program") || "";

  const thanked =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("thanks") === "1";

  return (
    <Section
      id="inquire"
      title="Request a Proposal"
      intro="Tell us what success looks like. We’ll reply with scope, timeline, and next steps."
    >
      {thanked && (
        <div className="mb-6 rounded-xl border p-4 text-green-700 bg-green-50">
          Thanks—your request was sent. We’ll contact you shortly.
        </div>
      )}

      <form
        name="program-inquiry"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/?thanks=1"
        className="rounded-2xl border bg-white p-6 grid gap-4 max-w-2xl"
      >
        {/* Netlify form fields */}
        <input type="hidden" name="form-name" value="program-inquiry" />
        <p className="hidden">
          <label>
            Don’t fill this: <input name="bot-field" />
          </label>
        </p>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Organization</span>
          <input
            className="rounded-xl border px-3 py-2"
            name="organization"
            required
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Your name</span>
          <input className="rounded-xl border px-3 py-2" name="name" required />
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

        <label className="grid gap-1">
          <span className="text-sm font-medium">Which program?</span>
          <select
            name="program"
            defaultValue={prefill}
            className="rounded-xl border px-3 py-2"
            required
          >
            <option value="" disabled>
              Select a program…
            </option>
            {PROGRAMS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">What outcomes matter most?</span>
          <textarea
            className="rounded-xl border px-3 py-2"
            rows="5"
            name="goals"
            placeholder="Share context, timelines, and success criteria…"
            required
          />
        </label>

        <button
          className="mt-2 rounded-full px-5 py-3 text-white font-semibold"
          style={{ backgroundColor: "#0f766e" }}
        >
          Send request
        </button>
      </form>
    </Section>
  );
}

/* ---------- App ---------- */
function App() {
  const [path, nav] = useHashRoute();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      {/* Routes */}
      {path === "/" && <Home />}
      {path === "/programs" && <Programs nav={nav} />}
      {path.startsWith("/program/") && (
        <ProgramDetail slug={path.split("/")[2]} nav={nav} />
      )}
      {path.startsWith("/inquire") && <Inquire />}

      <Footer />
    </div>
  );
}

export default App;
