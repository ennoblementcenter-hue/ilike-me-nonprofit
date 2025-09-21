import React from "react";
import Section from "../../components/Section/Section";

/** Exported so ProgramDetail can import:  import { PROGRAMS } from "../Programs/Programs" */
export const PROGRAMS = [
  {
    slug: "youth",
    title: "Youth Program",
    image: "/public/images/programs-youth.jpg",
    summary:
      "A 6–12 week curriculum teaching the Six Pillars with rituals, exercises, and peer practice.",
  },
  {
    slug: "bedside",
    title: "Bedside Program",
    image: "/public/images/programs-bedside.jpg",
    summary:
      "One-to-one healing support for youth and families navigating medical or crisis settings.",
  },
  {
    slug: "ipv",
    title: "IPV Recovery",
    image: "/public/images/programs-ipv.jpg",
    summary:
      "Trauma-informed recovery circles focused on safety, self-worth, and sustainable boundaries.",
  },
  {
    slug: "lgbtq",
    title: "LGBTQ+ Belonging",
    image: "/public/images/programs-lgbtq.jpg",
    summary:
      "Affirming groups that build identity safety, voice, and community protective factors.",
  },
  {
    slug: "staff",
    title: "Staff PD & Coaching",
    image: "/public/images/programs-staff.jpg",
    summary:
      "Workshops and coaching that embed the Six Pillars into daily practice and school culture.",
  },
  {
    slug: "reentry",
    title: "Reentry & Transition",
    image: "/public/images/programs-reentry.jpg",
    summary:
      "A bridge program for youth returning from detention or placement—stability, skills, support.",
  },
];

export default function Programs({ nav }) {
  return (
    <Section
      title="Programs"
      intro="Choose a program to see outcomes, audiences, and how we implement with partners."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROGRAMS.map((p) => (
          <article key={p.slug} className="rounded-2xl border bg-white overflow-hidden">
            <img
              src={p.image}
              alt={p.title}
              className="h-44 w-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.summary}</p>

              <div className="mt-4 flex gap-3">
                <a
                  href={`#/program/${p.slug}`}
                  className="px-4 py-2 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700"
                >
                  Learn more
                </a>
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
