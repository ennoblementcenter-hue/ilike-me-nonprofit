// src/App.jsx
import React, { useEffect, useState } from "react";

// Components (paths match: src/Components/Header/Header.jsx, etc.)
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// Pages (paths match: src/pages/*.jsx)
import Home from "./Pages/Home.jsx";
import Programs from "./Pages/Programs.jsx";
import ProgramDetail from "./Pages/ProgramDetail.jsx";
import Inquire from "./Pages/Inquire";
import Contact from "./Pages/Contact";
import Testimonials from "./Pages/Testimonials";
import Gallery from "./Pages/Gallery";
import Shop from "./Pages/Shop";

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

        {path === "/Programs" && <Programs nav={nav} />}

        {path.startsWith("/Program/") && (
          <ProgramDetail slug={path.split("/")[2]} nav={nav} />
        )}

        {path.startsWith("/Inquire") && <Inquire />}

        {path === "/Contact" && <Contact />}

        {path === "/Testimonials" && <Testimonials />}

        {path === "/Gallery" && <Gallery />}

        {path === "/Shop" && <Shop />}

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
