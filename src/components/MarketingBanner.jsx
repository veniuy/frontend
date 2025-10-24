import React from "react";

export default function MarketingBanner() {
  return (
    <a
      href="/invites/design-your-own"
      data-qa-id="top_thin_banner_0_category_dyo_cta"
      className="block w-full bg-black text-white"
      aria-label="NEW! Upload your own design in square, landscape, or portrait. Get started"
    >
      <p className="mx-auto max-w-7xl px-3 py-1.5 text-center text-sm leading-tight">
        <strong className="font-semibold">NEW!</strong>{" "}
        Upload your own design in square, landscape, or portrait.{" "}
        <span className="underline underline-offset-2">Get started</span>
      </p>
    </a>
  );
}
