// src/pages/Programs/Programs.jsx
import React from "react";
import Section from "../../components/Section/Section";

export const PROGRAMS = [
  {
    slug: "youth",
    title: "Youth Program",
    summary: "Helping young people build resilience and emotional intelligence.",
    audience: "Youth ages 13–18 in schools, after-school, and community settings.",
    outcomes: [
      "Boost self-esteem",
      "Develop emotional intelligence",
      "Strengthen peer support",
    ],
    image: "/images/youth-program.jpg",  // ✅ make sure file exists
  },
  {
    slug: "ipv",
    title: "IPV Recovery",
    summary: "Supporting individuals healing from intimate partner violence.",
    audience: "Survivors and support networks.",
    outcomes: [
      "Promote safety",
      "Rebuild trust",
      "Empower resilience",
    ],
    image: "/images/ipv-recovery.jpg",   // ✅ add file to /public/images
  },
  {
    slug: "reentry",
    title: "Reentry Program",
    summary: "Helping justice-involved youth transition successfully.",
    audience: "Youth reentering schools and communities.",
    outcomes: [
      "Reduce recidivism",
      "Build positive identity",
      "Strengthen community ties",
    ],
    image: "/images/reentry.jpg",        // ✅ add file to /public/images
  },
];

export default function Programs() {
  return (
    <Section
      id="programs"
      title="Our Programs"
      intro="Explore our initiatives designed to build resilience and empowerment."
    >
      <div className="grid md:grid-cols-3 gap-8">
        {PROGRAMS.map((program) => (
          <div key={program.slug} className="rounded-xl border bg-white p-4 shadow-sm">
            <img
              src={program.image}
              alt={program.title}
              className="rounded-lg mb-4 object-cover h-40 w-full"
            />
            <h3 className="text-xl font-bold">{program.title}</h3>
            <p className="text-slate-600 mt-2">{program.summary}</p>
            <a
              href={`#/program/${program.slug}`}
              className="mt-4 inline-block text-teal-700 font-semibold hover:underline"
            >
              Learn more →
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
