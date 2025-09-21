import Section from "../../components/Section/Section";
export default function Gallery() {
  return (
    <Section title="Gallery" intro="Moments from I LIKE ME programs.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Replace with your real images */}
        {["g1.jpg","g2.jpg","g3.jpg","g4.jpg","g5.jpg","g6.jpg"].map((f) => (
          <img key={f} src={`/images/${f}`} alt="" className="rounded-xl object-cover w-full h-56" />
        ))}
      </div>
    </Section>
  );
}
