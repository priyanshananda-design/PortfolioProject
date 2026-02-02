"use client";

import { useState } from "react";

type ContactPanelProps = {
  email: string;
  linkedin: string;
  phone?: string;
  helper?: string;
};

export default function ContactPanel({ email, linkedin, phone, helper }: ContactPanelProps) {
  const [copied, setCopied] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/70 p-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 focus-ring"
        >
          {copied ? "Email copied" : "Copy email"}
        </button>
        <a
          href={linkedin}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 focus-ring"
        >
          LinkedIn
        </a>
        {phone ? (
          <button
            type="button"
            onClick={() => setShowPhone((prev) => !prev)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 focus-ring"
          >
            {showPhone ? phone : "Reveal phone"}
          </button>
        ) : null}
      </div>
      {helper ? <p className="mt-4 text-sm text-muted">{helper}</p> : null}
    </div>
  );
}
