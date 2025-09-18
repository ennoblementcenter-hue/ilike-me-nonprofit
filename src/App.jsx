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
        <a href="#/Programs" className="hover:underline">Programs</a>
        <a href="#/Inquire" className="hover:underline">Inquire</a>
        <a href="#/Contact" className="hover:underline">Contact</a>
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
                href="#/
