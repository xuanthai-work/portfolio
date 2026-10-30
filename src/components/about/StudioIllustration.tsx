interface StudioIllustrationProps {
  className?: string;
}

/**
 * Placeholder artwork for the About column — a warm, flat "engineer's studio"
 * scene. Swap for a commissioned illustration later; the frame in the About
 * section only cares about a 4:5 image.
 */
export function StudioIllustration({ className }: StudioIllustrationProps) {
  return (
    <svg
      aria-labelledby="studio-illustration-title"
      className={className}
      role="img"
      viewBox="0 0 360 440"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="studio-illustration-title">
        A quiet studio desk with a code editor, books, and a window at golden
        hour
      </title>

      <rect fill="#f4e9d7" height="440" width="360" />

      {/* window */}
      <rect
        fill="#efe2c9"
        height="232"
        rx="6"
        stroke="#c8b48f"
        strokeWidth="2"
        width="308"
        x="26"
        y="26"
      />
      <rect fill="#ecd6ae" height="216" rx="3" width="292" x="34" y="34" />
      <circle cx="262" cy="108" fill="#dfa163" r="30" />
      <path
        d="M34 196c56-38 112 12 170-24 46-28 86 12 122-10v88H34z"
        fill="#cbb98f"
      />
      <path
        d="M34 232c62-26 104 14 160-6 52-18 86 10 132-6v30H34z"
        fill="#b9a67c"
        opacity="0.75"
      />
      <path d="M180 34v216" stroke="#c8b48f" strokeWidth="6" />
      <path d="M34 140h292" stroke="#c8b48f" strokeWidth="6" />

      {/* desk */}
      <rect fill="#a97b4f" height="16" width="360" y="300" />
      <rect fill="#96693f" height="124" width="360" y="316" />

      {/* monitor */}
      <rect fill="#2b211b" height="112" rx="8" width="160" x="100" y="180" />
      <rect fill="#241a14" height="96" rx="3" width="144" x="108" y="188" />
      <g fill="#8c7a68">
        <rect height="5" rx="2.5" width="70" x="118" y="200" />
        <rect height="5" rx="2.5" width="96" x="118" y="212" />
        <rect height="5" rx="2.5" width="54" x="118" y="224" />
        <rect height="5" rx="2.5" width="84" x="118" y="236" />
        <rect height="5" rx="2.5" width="40" x="118" y="248" />
      </g>
      <rect fill="#e07a4f" height="5" rx="2.5" width="34" x="118" y="200" />
      <rect fill="#c9a253" height="5" rx="2.5" width="26" x="188" y="212" />
      <rect fill="#8fae6d" height="5" rx="2.5" width="32" x="118" y="236" />
      <rect fill="#e07a4f" height="5" rx="2.5" width="22" x="118" y="248" />
      <path d="M168 292h24l6 12h-36z" fill="#2b211b" />
      <rect fill="#2b211b" height="6" rx="3" width="64" x="148" y="304" />

      {/* books */}
      <rect fill="#b8532d" height="11" rx="2" width="94" x="32" y="261" />
      <rect fill="#658055" height="10" rx="2" width="82" x="40" y="272" />
      <rect fill="#c9a253" height="11" rx="2" width="98" x="28" y="282" />

      {/* mug */}
      <path
        d="M296 268h30v26a8 8 0 0 1-8 8h-14a8 8 0 0 1-8-8z"
        fill="#f2e6ce"
        stroke="#c2ad88"
        strokeWidth="2"
      />
      <path
        d="M326 274h6a8 8 0 0 1 0 16h-6"
        fill="none"
        stroke="#c2ad88"
        strokeWidth="2"
      />
      <path
        d="M304 258c4-6 0-10 4-16M314 258c4-6 0-10 4-16"
        fill="none"
        stroke="#cbbfa9"
        strokeLinecap="round"
        strokeWidth="2.5"
      />

      {/* plant */}
      <path
        d="M276 300c-2-18 6-30 16-36M276 300c6-14 2-26-6-32M280 300c10-8 18-8 24-4"
        fill="none"
        stroke="#658055"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path d="M266 292h28l-4 12h-20z" fill="#b8532d" />

      {/* desk shadow */}
      <rect fill="#5e3f24" height="4" opacity="0.35" width="360" y="316" />
    </svg>
  );
}
