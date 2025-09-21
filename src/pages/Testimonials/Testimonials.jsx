import Section from "../../components/Section/Section";
const ITEMS = [
  { quote: "This changed how our students treat each other.", by: "Assistant Principal" },
  { quote: "You can feel the culture shift in the room.", by: "Youth Worker" },
  { quote: "Our families finally had a shared language.", by: "Program Director" },
];
export default function Testimonials() {
  return (
    <Section title="Testimonials" intro="What partners and youth say.">
      <div className="grid md:grid-cols-3 gap-6">
        {ITEMS.map((t, i) => (
          <blockquote key={i} className="rounded-xl border bg-white p-5">
            <p className="italic">“{t.quote}”</p>
            <p className="mt-3 text-sm text-slate-600">— {t.by}</p>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
