"use client";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-8 justify-center">

      {/* Instagram */}
      <a
        href="https://instagram.com/blyzapp"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00A9FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition drop-shadow-[0_0_6px_rgba(0,169,255,0.5)] group-hover:drop-shadow-[0_0_14px_rgba(0,169,255,0.9)]"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="1.3" fill="#00A9FF" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/share/1D4WvUD66b/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00A9FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition drop-shadow-[0_0_6px_rgba(0,169,255,0.5)] group-hover:drop-shadow-[0_0_14px_rgba(0,169,255,0.9)]"
        >
          <path d="M18 2h-3c-2.2 0-4 1.8-4 4v3H8v4h3v9h4v-9h3l1-4h-4V6c0-.6.4-1 1-1h3V2z" />
        </svg>
      </a>

      {/* TikTok */}
      <a
        href="https://tiktok.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 48 48"
          fill="none"
          className="transition drop-shadow-[0_0_6px_rgba(0,169,255,0.5)] group-hover:drop-shadow-[0_0_14px_rgba(0,169,255,0.9)]"
        >
          <path
            d="M34.5 14.5c-2.7-.8-4.9-2.8-5.5-5.5h-4v22a6 6 0 11-6-6V21a10 10 0 1010 10V16c1.6 1.2 3.5 2 5.5 2v-3.5z"
            stroke="#00A9FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

    </div>
  );
}
