import React from "react";
import Section from "../../components/Section/Section";

export default function Home() {
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

          {/* Hero image (put your file at public/images/hero-youth.jpg) */}
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
