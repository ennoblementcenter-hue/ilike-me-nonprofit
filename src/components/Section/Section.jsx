// src/components/Section/Section.jsx
import React from "react";

export default function Section({ id, title, intro, children }) {
  return (
    <section id={id} className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        {intro && <p className="text-lg text-gray-600 mb-6">{intro}</p>}
        <div>{children}</div>
      </div>
    </section>
  );
}
