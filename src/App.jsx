/* ---------- Programs data ---------- */
const PROGRAMS = [
  {
    slug: "youth",
    title: "I LIKE ME Youth Program",
    blurb: "Self-image, self-trust, resilience to trauma and ACEs.",
    long:
      "A strengths-based curriculum that helps young people reframe trauma into resilience. Through interactive activities, journaling, and peer dialogue, participants learn to recognize adverse experiences while building self-esteem, emotional literacy, and healthy coping strategies. By centering the Six Pillars—self-care, self-respect, self-esteem, self-acceptance, self-trust, and self-empowerment—youth leave with practical tools for confidence and connection.",
    img: "/images/ylp.png",
  },
  {
    slug: "bedside",
    title: "Bedside Intervention",
    blurb: "Reduce recidivism. Catalyze growth during vulnerable moments.",
    long:
      "A hospital- and detention-based intervention that meets individuals at moments of crisis. Facilitators provide trauma-informed conversation, reflective exercises, and linkages to aftercare. The goal is to transform a potentially destabilizing event into an entry point for growth, reducing recidivism and empowering participants to set new life trajectories.",
    img: "/images/bedside.png",
  },
  {
    slug: "ipv",
    title: "Intimate Violence Prevention (IVP)",
    blurb: "Trauma-informed care and healthy relationships.",
    long:
      "A program designed to break cycles of harm by equipping participants with skills for self-respect, boundary setting, and healthy relationships. Grounded in trauma-informed care, IVP blends education with reflective dialogue to reduce intimate partner violence and restore dignity. Participants gain practical strategies to protect themselves and to cultivate relationships rooted in safety and mutual care.",
    img: "/images/ivp.png",
  },
  {
    slug: "lgbtq",
    title: "LGBTQ Empowerment",
    blurb: "Affirming supports for self-acceptance and resilience.",
    long:
      "A safe and affirming space for LGBTQ youth to embrace identity, strengthen resilience, and find community. This program integrates self-acceptance practices, peer support, and affirmational tools that counter stigma. By fostering belonging and confidence, LGBTQ Empowerment builds protective factors proven to reduce risk behaviors and enhance mental health.",
    img: "/images/lgbtq.png",
  },
  {
    slug: "staff",
    title: "Staff & Administrator Curriculum",
    blurb: "Equip adults to reinforce the Six Pillars.",
    long:
      "Training and resources for educators, administrators, and youth-serving professionals. The curriculum equips adults to model empathy, support healing, and enforce accountability in ways that reinforce dignity. Participants leave with strategies to manage classrooms, engage families, and lead organizations aligned with the Six Pillars—creating environments where youth thrive.",
    img: "/images/staff.png",
  },
  {
    slug: "reentry",
    title: "Reentry Program",
    blurb: "Support justice-involved youth in successful transitions.",
    long:
      "The Reentry Program is designed to accompany youth and young adults as they return from detention or incarceration. It combines evidence-informed reentry planning, mentoring, and trauma recovery supports. Participants strengthen their self-worth, learn practical decision-making skills, and build pro-social connections that reduce recidivism. By integrating the Six Pillars with workforce readiness and community engagement, the program helps participants create sustainable pathways toward healing and opportunity.",
    img: "/images/reentry.png",
  },
];

/* ---------- Programs map ---------- */
const PROGRAMS_MAP = Object.fromEntries(PROGRAMS.map((p) => [p.slug, p]));
