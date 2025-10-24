import React from "react";

export default function MarketingBanner() {
  return (
    <a
      href="/invites/design-your-own"
      className="block w-full bg-black text-white"
      aria-label="Crea invitaciones en segundos con tus propios diseños"
    >
      <p className="mx-auto max-w-7xl px-3 py-1.5 text-center text-sm leading-tight">
        <strong className="font-semibold">¡Nuevo!</strong>{" "}
        Crea invitaciones en segundos con tus propios diseños.{" "}
        <span className="underline underline-offset-2">Comenzar</span>
      </p>
    </a>
  );
}
