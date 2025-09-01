import React, { useEffect, useState } from "react";

/* --- sections you already have --- */
function Programs(){/* ... keep your existing Programs component ... */}
function Testimonials(){/* ... keep your existing Testimonials component ... */}
function Contact(){/* ... keep your existing Contact component ... */}

/* --- simple pages --- */
function Home(){
  return (
    <section className="py-16 px-6 md:px-12 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-800">Welcome to I LIKE ME</h2>
        <p className="mt-3 text-lg text-slate-600">Healing shame, building resilient youth and families.</p>
      </div>
    </section>
  );
}

/* --- tiny hash router --- */
function useHashRoute(){
  const get = () => window.location.hash.replace(/^#/, "") || "/";
  const [path,setPath] = useState(get());
  useEffect(()=>{
    const on = () => setPath(get());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  },[]);
  const nav = (to) => (window.location.hash = to);
  return [path, nav];
}

export default function App(){
  const [path, nav] = useHashRoute();

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-teal-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <h1 className="text-3xl font-bold mr-auto">I LIKE ME</h1>
          <nav className="flex flex-wrap gap-2">
            {[
              ["/","Home"],
              ["/programs","Programs"],
              ["/testimonials","Testimonials"],
              ["/contact","Contact"],
            ].map(([to,label])=>(
              <button
                key={to}
                onClick={()=>nav(to)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${path===to?"bg-white text-teal-700":"bg-white/10 hover:bg-white/20"}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {path==="/" && <Home/>}
        {path==="/programs" && <Programs/>}
        {path==="/testimonials" && <Testimonials/>}
        {path==="/contact" && <Contact/>}
      </main>

      <footer className="bg-slate-800 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} I LIKE ME Nonprofit</p>
      </footer>
    </div>
  );
}
