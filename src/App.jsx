// src/App.jsx
import React, { useEffect, useState } from "react";

// Components (paths match: src/Components/Header/Header.jsx, etc.)
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// Pages (paths match: src/pages/*.jsx)
import Home from "./pages/Home.jsx";
import Programs from "./pages/Programs.jsx";
import ProgramDetail from "./pages/ProgramDetail.jsx";
import Inquire from "./pages/Inquire";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Gallery from "./pages/Gallery";
import Shop from "./pages/Shop";

/* ---------- Minimal hash router ---------- */
function useHashRoute() {
  const get = () => window.location.hash.replace(/^#/, "") || "/";
  const [path, setPath] = useState(get());
  useEffect(() => {
    const on = () => setPath(get());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const nav = (to) => {
    window.location.hash = to;
  };
  return [path, nav];
}

/* ---------- App ---------- */
export default function App() {
  const [path, nav] = useHashRoute();

  // Scroll to top on route change
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [path]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Header nav={nav} />

      <main className="flex-1">
        {/* ROUTE SWITCH */}
        {path === "/" && <Home nav={nav} />}

        {path === "/programs" && <Programs nav={nav} />}

        {path.startsWith("/Program/") && (
          <ProgramDetail slug={path.split("/")[2]} nav={nav} />
        )}

        {path.startsWith("/inquire") && <Inquire />}

        {path === "/contact" && <Contact />}

        {path === "/testimonials" && <Testimonials />}

        {path === "/gallery" && <Gallery />}

        {path === "/shop" && <Shop />}

        {/* 404 */}
        {[
          "/",
          "/Programs",
          "/Contact",
          "/Testimonials",
          "/Gallery",
          "/Shop",
        ].every((p) => !path.startsWith(p)) &&
          !path.startsWith("/Program/") &&
          !path.startsWith("/Inquire") && (
            <div className="max-w-3xl mx-auto px-6 py-20">
              <h1 className="text-3xl font-bold mb-3">Page not found</h1>
              <p className="mb-6">The link you followed doesn’t exist.</p>
              <button
                onClick={() => nav("/")}
                className="rounded-full bg-teal-600 text-white font-semibold px-5 py-3 hover:bg-teal-700"
              >
                Go home
              </button>
            </div>
          )}
      </main>

      <Footer />
    </div>
  );
}
