import Section from "../../components/Section/Section";

const PRODUCTS = [
  { id: "ilm-workbook", name: "I LIKE ME Workbook", price: 25, img: "/images/shop-ILMwrkbk.png", link: "https://buy.stripe.com/your-link-1" },
  { id: "boop-book", name: "Born Out of Pain Memoir", price: 20, img: "/images/shop-BOOP-book.png", link: "https://buy.stripe.com/your-link-2" },
  { id: "ilm-hat", name: "I LIKE ME Hat", price: 20, img: "/images/shop-hat.png", link: "https://buy.stripe.com/your-link-3" },
  { id: "ilm-mug", name: "I LIKE ME Mug", price: 15, img: "/images/shop-ILMmug.png", link: "https://buy.stripe.com/your-link-4" },
  { id: "ilm-tee", name: "I LIKE ME T-Shirt", price: 15, img: "/images/shop-tee.png", link: "https://buy.stripe.com/your-link-5" },
  { id: "ilm-journal", name: "I LIKE ME Journal", price: 12, img: "/images/shop-ILMJournal.png", link: "https://buy.stripe.com/your-link-6" },
];

export default function Shop() {
  return (
    <Section title="Shop" intro="Support the mission and share the message.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="rounded-2xl border bg-white overflow-hidden">
            <img src={p.img} alt={p.name} className="w-full h-44 object-cover" />
            <div className="p-5">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-slate-600 mt-1">${p.price}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-full px-5 py-2 text-white font-semibold bg-orange-500"
              >
                Buy with Stripe
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
