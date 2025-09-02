/* ---------- Programs data ---------- */
const PROGRAMS = [
  {
    slug: "youth",
    title: "I LIKE ME Youth Program",
    blurb: "Self-image, self-trust, resilience to trauma and ACEs.",
    long: "A multi-week, pillar-based journey building identity, emotional literacy, and healthy boundaries through practice, journaling, and small-group facilitation.",
    img: "/images/ylp.png",
  },
  {
    slug: "bedside",
    title: "Bedside Intervention",
    blurb: "Reduce recidivism. Catalyze growth during vulnerable moments.",
    long: "Bedside conversations and follow-up coaching that convert crisis into commitment, with safety planning and care navigation.",
    img: "/images/bedside.png",
  },
  {
    slug: "ipv",
    title: "Intimate Violence Prevention",
    blurb: "Trauma-informed care and healthy relationships.",
    long: "Skills, scripts, and supports to recognize harm, restore dignity, and practice consent and self-respect.",
    img: "/images/ivp.png",
  },
  {
    slug: "lgbtq",
    title: "LGBTQ Empowerment",
    blurb: "Affirming supports for self-acceptance and resilience.",
    long: "Identity-affirming spaces that build esteem, belonging, and protective factors for LGBTQ youth.",
    img: "/images/lgbtq.png",
  },
  {
    slug: "staff",
    title: "Staff & Administrator",
    blurb: "Equip adults to reinforce the Six Pillars.",
    long: "Training and toolkits for educators and youth workers to model empathy, accountability, and nervous-system aware discipline.",
    img: "/images/staff.png",
  },
];

const PROGRAMS_MAP = Object.fromEntries(PROGRAMS.map(p => [p.slug, p]));

/* ---------- Programs list (adds links) ---------- */
function Programs({ nav }) {
  return (
    <Section id="programs" title="Curriculum Pathways" intro="Tailored to schools, hospitals, churches, and community orgs.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROGRAMS.map(p => (
          <div key={p.slug} className="rounded-2xl border bg-white overflow-hidden">
            <img src={p.img} alt={p.title} className="h-48 w-full object-cover"
                 onError={(e)=>{e.currentTarget.src="https://picsum.photos/seed/ilmprog/800/600";}}/>
            <div className="p-5">
              <h3 className="text-lg font-bold text-teal-700">{p.title}</h3>
              <p className="text-slate-600 text-sm mt-1">{p.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={()=>nav(`/program/${p.slug}`)} className="rounded-full px-4 py-2 text-sm font-semibold border border-teal-600 text-teal-700">
                  Learn more
                </button>
                <button onClick={()=>nav(`/inquire?program=${p.slug}`)} className="rounded-full px-4 py-2 text-sm font-semibold bg-orange-500 text-white">
                  Request proposal
                </button>
                <a href={`mailto:info@ilikeme.org?subject=Book a call: ${encodeURIComponent(p.title)}`} className="rounded-full px-4 py-2 text-sm font-semibold bg-teal-600 text-white">
                  Book a call
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Program detail page ---------- */
function ProgramDetail({ slug, nav }) {
  const p = PROGRAMS_MAP[slug];
  if (!p) return (
    <Section id="program" title="Program not found">
      <button onClick={()=>nav("/programs")} className="rounded-full px-4 py-2 border">Back to Programs</button>
    </Section>
  );
  return (
    <Section id={`program-${slug}`} title={p.title} intro={p.blurb}>
      <div className="grid md:grid-cols-2 gap-6">
        <img src={p.img} alt={p.title} className="w-full h-72 object-cover rounded-2xl border"
             onError={(e)=>{e.currentTarget.src="https://picsum.photos/seed/ilmprogdetail/1000/700";}}/>
        <div className="rounded-2xl border bg-white p-6">
          <p className="text-slate-700">{p.long}</p>
          <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-1">
            <li>Six Pillars integration</li>
            <li>Facilitator training and toolkits</li>
            <li>Pre/post measures and reporting</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={()=>nav(`/inquire?program=${slug}`)} className="rounded-full px-5 py-3 bg-orange-500 text-white font-semibold">Request proposal</button>
            <a href={`mailto:info@ilikeme.org?subject=Book a call: ${encodeURIComponent(p.title)}`} className="rounded-full px-5 py-3 bg-teal-600 text-white font-semibold">Book a call</a>
            <button onClick={()=>nav("/programs")} className="rounded-full px-5 py-3 border">Back</button>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Inquire page (Netlify form with program tag) ---------- */
function getQueryFromHash() {
  const [, q = ""] = (window.location.hash || "").split("?");
  return new URLSearchParams(q);
}
function Inquire() {
  const program = typeof window !== "undefined" ? getQueryFromHash().get("program") || "" : "";
  const progTitle = PROGRAMS_MAP[program]?.title || "General inquiry";
  return (
    <Section id="inquire" title="Request a Proposal" intro={progTitle}>
      <form
        name="program-inquiry"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/?thanks=1#inquire"
        className="rounded-2xl border bg-white p-6 max-w-xl mx-auto"
      >
        <input type="hidden" name="form-name" value="program-inquiry" />
        <input type="hidden" name="program" value={progTitle} />
        <p className="hidden"><label>Don’t fill this: <input name="bot-field" /></label></p>

        <label className="grid gap-1 mb-3">
          <span className="text-sm font-medium">Organization</span>
          <input className="rounded-xl border px-3 py-2" name="organization" required />
        </label>
        <label className="grid gap-1 mb-3">
          <span className="text-sm font-medium">Your name</span>
          <input className="rounded-xl border px-3 py-2" name="name" required />
        </label>
        <label className="grid gap-1 mb-3">
          <span className="text-sm font-medium">Email</span>
          <input className="rounded-xl border px-3 py-2" type="email" name="email" required />
        </label>
        <label className="grid gap-1 mb-3">
          <span className="text-sm font-medium">What outcomes are you seeking?</span>
          <textarea className="rounded-xl border px-3 py-2" rows="5" name="message" />
        </label>

        <button className="mt-3 rounded-full px-5 py-3 text-white font-semibold bg-orange-500">Send request</button>
      </form>
    </Section>
  );
}

/* ---------- Testimonials grid (no slider) ---------- */
const TESTIMONIALS = [
  { quote: "Students named their worth and repaired relationships.", name: "Assistant Principal", org: "Urban HS" },
  { quote: "The bedside intervention changed my son’s trajectory.", name: "Parent", org: "Children’s Hospital" },
  { quote: "Staff now share language for empathy and accountability.", name: "Program Director", org: "Community Center" },
];
function Testimonials() {
  return (
    <Section id="testimonials" title="Testimonials" intro="Real outcomes in real communities.">
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div key={idx} className="rounded-2xl border bg-white p-6">
            <p className="font-semibold">“{t.quote}”</p>
            <div className="mt-3 text-sm text-slate-600">— {t.name}{t.org ? `, ${t.org}` : ""}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
