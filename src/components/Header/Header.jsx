export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-teal-600 text-white">
      <div className="flex items-center gap-2">
        <img src="/images/logo.png" alt="I LIKE ME logo" className="h-10 w-auto" />
        <span className="text-lg font-bold">I LIKE ME</span>
      </div>
      <nav className="space-x-4">
        <a href="#/" className="hover:underline">Home</a>
        <a href="#/programs" className="hover:underline">Programs</a>
        <a href="#/gallery" className="hover:underline">Gallery</a>
        <a href="#/testimonials" className="hover:underline">Testimonials</a>
        <a href="#/shop" className="hover:underline">Shop</a>
        <a href="#/inquire" className="hover:underline">Request proposal</a>
        <a href="#/contact" className="hover:underline">Contact</a>
      </nav>
    </header>
  );
}
