import { useEffect, useState } from "react";

// components (lowercase 'components')
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// pages (lowercase 'pages', then page subfolder, then file)
import Home from "./pages/Home/Home.jsx";
import Programs from "./pages/Programs/Programs.jsx";
import ProgramDetail from "./pages/ProgramDetail/ProgramDetail.jsx";
import Inquire from "./pages/Inquire/Inquire.jsx";

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

      {/* routes — all lowercase */}
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
