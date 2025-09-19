import Section from "../../components/Section/Section";
import { PROGRAMS } from "../../data/programs";

export default function ProgramDetail({ slug, nav }) {
  const program = PROGRAMS.find((p) => p.slug === slug);

  if (!program) {
    return (
      <Section title="Program not found">
        <a href="#/programs" className="text-teal-700 underline">Back to programs</a>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <img src={program.image} alt={program.title} className="rounded-2xl w-full object-cover" />
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
              <a
                href="#/programs"
                className="px-5 py-3 rounded-full border font-semibold hover:bg-slate-50"
              >
                Back to programs
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
