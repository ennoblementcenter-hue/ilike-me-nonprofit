import { useEffect, useState } from "react";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import Home from "./pages/Home.jsx";
import Programs from "./pages/Programs.jsx";
import ProgramDetail from "./pages/ProgramDetail.jsx";
import Inquire from "./pages/Inquire.jsx";

/* ---------- Minimal hash router ---------- */
function useHashRoute() {
  const get = () => window.location.hash.replace(/^#/, "") || "/";
  const [path, setPath] = useState(get());
  useEffect(() => {
    const on = () => setPath(get());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const nav = (to) => (window.location.hash = to);
  return [path, nav];
}

/* ---------- App ---------- */
export default function App() {
  const [path, nav] = useHashRoute();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      {/* Routes (all lowercase) */}
      {path === "/" && <Home />}
      {path === "/programs" && <Programs nav={nav} />}
      {path.startsWith("/program/") && (
        <ProgramDetail slug={path.split("/")[2]} nav={nav} />
      )}
      {path.startsWith("/inquire") && <Inquire />}

      <Footer />
    </div>
  );
}
