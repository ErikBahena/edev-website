"use client";

import { useEffect, useState } from "react";

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";

export default function MobileCallButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`tel:${PHONE}`}
      className={`md:hidden fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full shadow-lg transition-all duration-300 font-display font-semibold text-sm text-white ${
        show ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
      style={{ background: "var(--blue)", boxShadow: "0 4px 20px rgba(3,76,178,0.4)" }}
    >
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <path d="M14 10.667c-1.067 0-2.1-.167-3.067-.467a.967.967 0 0 0-1 .234l-1.9 1.9A12.067 12.067 0 0 1 2.667 5.967l1.9-1.9c.266-.267.35-.634.233-1A9.897 9.897 0 0 1 2.333 2C2.333 1.4 1.933 1 1.333 1H1C.4 1 0 1.4 0 2c0 7.733 6.267 14 14 14 .6 0 1-.4 1-1v-.333c0-.6-.4-1-1-1z" fill="currentColor"/>
      </svg>
      {PHONE_DISPLAY}
    </a>
  );
}
