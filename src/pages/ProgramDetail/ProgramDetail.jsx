import React from "react";
import Section from "../components/Section";
import { PROGRAMS } from "./Programs";

const DETAILS = {
  youth: {
    outcomes: [
      "↑ self-worth and hope",
      "↑ regulation and coping skills",
      "↓ chronic absenteeism and behavior incidents",
    ],
    audience: "Middle/High school youth; adaptable grades 4–12",
    duration: "8–12 sessions, 60–75 minutes",
    delivery: "Small-group or classroom; optional caregiver nights",
  },
  bedside: {
    outcomes: [
      "↓ recidivism and repeat incidents",
      "↑ safety planning and motivation",
      "Smooth referral to follow-up services",
    ],
    audience: "Youth at point-of-care in hospitals, shelters, or detention",
    duration: "1–3 brief sessions, 20–40 minutes each",
    delivery: "On-site coaching; warm hand-offs to partners",
  },
  ipv: {
    outcomes: [
      "↑ boundary-setting and consent literacy",
      "↑ bystander confidence",
      "↓ dating aggression and risky dynamics",
    ],
    audience: "Youth ages 13–19; parent/educator workshops available",
    duration: "6–10 sessions, 60 minutes",
    delivery: "Co-ed or affinity groups; survivor-safe pacing",
  },
  lgbtq: {
    outcomes: [
      "↑ identity affirmation and belonging",
      "↑ protective peer/mentor ties",
      "↓ stigma stress and isolation",
    ],
    audience: "LGBTQ youth and allies; GSA clubs, community orgs",
    duration: "8–12 sessions, 60–75 minutes",
    delivery: "Affinity groups with trauma-informed facilitation",
  },
  staff: {
    outcomes: [
      "↑ trauma-responsive classroom climate",
      "↑ co-regulation and de-escalation",
      "↑ consistent Six Pillars reinforcement",
    ],
    audience: "Teachers, counselors, deans, SROs, after-school staff",
    duration: "1–3 PD days + coaching cycles",
    delivery: "Workshops, modeling, job-embedded coaching",
  },
  reentry: {
    outcomes: [
      "↑ school re-engagement and persistence",
      "↑ linkage to mental health and wrap-around",
      "↓ justice re-involvement",
    ],
    audience: "Returning citizens and youth re-entering school/community",
    duration: "6–12 weeks; tapering supports",
    delivery: "Case navigation + small-group skill-building",
  },
};

export default function ProgramDetail({ slug, nav }) {
  const meta = PROGRAMS.find((p) => p.slug === slug);
  const d = DETAILS[slug];

  if (!meta) {
    return (
      <Section title="Program not found">
        <p>We couldn’t find that program.</p>
        <button onClick={() => nav("/programs")} style={btn}>Back to Programs</button>
      </Section>
    );
  }

  return (
    <>
      <Section title={meta.title} intro={meta.blurb}>
        {meta.img && (
          <div style={{ height: 220, marginBottom: 16, background: "#eef2f7", borderRadius: 12, overflow: "hidden" }}>
            <img src={meta.img} alt={meta.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          <Box title="Who it’s for">{d?.audience || "—"}</Box>
          <Box title="Duration">{d?.duration || "—"}</Box>
          <Box title="Delivery">{d?.delivery || "—"}</Box>
          <Box title="Outcomes">
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {(d?.outcomes || []).map((x) => <li key={x}>{x}</li>)}
            </ul>
          </Box>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button onClick={() => nav(`/inquire?program=${encodeURIComponent(meta.title)}`)} style={{ ...btn, background: "#ff6a13" }}>
            Request proposal
          </button>
          <button onClick={() => nav("/programs")} style={btn}>Back to Programs</button>
        </div>
      </Section>
    </>
  );
}

function Box({ title, children }) {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, background: "#fff" }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>
      <div style={{ color: "#374151" }}>{children}</div>
    </div>
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
