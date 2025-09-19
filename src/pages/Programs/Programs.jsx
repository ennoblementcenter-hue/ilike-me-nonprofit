import React from "react";
import Section from "../components/Section";

export const PROGRAMS = [
  {
    slug: "youth",
    title: "I LIKE ME Youth Program",
    blurb:
      "Builds self-image, trust, and resilience to ACEs and trauma using the Six Pillars: Identity, Safety, Voice, Belonging, Regulation, Purpose.",
    img: "/images/program-youth.jpg",
  },
  {
    slug: "bedside",
    title: "I LIKE ME Bedside Intervention",
    blurb:
      "Brief, trauma-informed bedside coaching at moments of crisis to reduce recidivism and spark personal growth.",
    img: "/images/program-bedside.jpg",
  },
  {
    slug: "ipv",
    title: "I LIKE ME Intimate Violence Prevention",
    blurb:
      "Centers self-respect, boundaries, and healthy relationship dynamics with survivor-safe practices.",
    img: "/images/program-ipv.jpg",
  },
  {
    slug: "lgbtq",
    title: "I LIKE ME LGBTQ Empowerment",
    blurb:
      "Affirms identity, self-acceptance, and emotional resilience for LGBTQ youth and allies.",
    img: "/images/program-lgbtq.jpg",
  },
  {
    slug: "staff",
    title: "I LIKE ME Staff & Administrator Curriculum",
    blurb:
      "Equips front-line adults with empathy, regulation skills, and consistent Six Pillars practices.",
    img: "/images/program-staff.jpg",
  },
  {
    slug: "reentry",
    title: "I LIKE ME Reentry Program",
    blurb:
      "Stabilizes the transition from detention or hospitalization back to school, work, and community with wrap-around supports.",
    img: "/images/program-reentry.jpg",
  },
];

export default function Programs({ nav }) {
  return (
    <Section
      id="programs"
      title="Programs"
      intro="Each track is evidence-informed, culturally responsive, and mapped to measurable outcomes."
    >
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {PROGRAMS.map((p) => (
          <div key={p.slug} style={{ border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
            <div style={{ height: 150, background: "#eef2f7" }}>
              {p.img && (
                <img
                  src={p.img}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: "0 0 6px 0", fontSize: 18 }}>{p.title}</h3>
              <p style={{ margin: 0, color: "#4b5563", fontSize: 14 }}>{p.blurb}</p>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button
                  onClick={() => nav(`/program/${p.slug}`)}
                  style={btn}
                >
                  Learn more
                </button>
                <button
                  onClick={() => nav(`/inquire?program=${encodeURIComponent(p.title)}`)}
                  style={{ ...btn, background: "#ff6a13" }}
                >
                  Request proposal
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
