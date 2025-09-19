import Section from "../../components/Section/Section";
import { PROGRAMS } from "../../data/programs";

export default function Programs({ nav }) {
  return (
    <Section
      id="programs"
      title="Programs"
      intro="Explore the I LIKE ME curriculum tracks. Click a card to learn more or request a proposal."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.map((p) => (
          <article key={p.slug} className="rounded-2xl border bg-white overflow-hidden flex flex-col">
            <img src={p.image} alt={p.title} className="h-44 w-full object-cover" />
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{p.summary}</p>
              <div className="mt-4 flex gap-2">
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
