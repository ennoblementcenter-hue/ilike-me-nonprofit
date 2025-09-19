import React from "react";

export default function Header({ nav }) {
  const items = [
    ["/", "Home"],
    ["/programs", "Programs"],
    ["/inquire", "Request proposal"],
    ["/contact", "Contact"],
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-teal-600 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/images/logo.png"   // place logo in public/images/logo.png
          alt="I LIKE ME logo"
          className="h-10 w-auto"
        />
        <span className="text-lg font-bold">I LIKE ME</span>
      </div>

      {/* Navigation */}
      <nav className="space-x-6">
        {items.map(([to, label]) => (
          <a key={to} href={`#${to}`} className="hover:underline">
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
