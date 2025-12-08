"use client";

import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-32 bg-black text-white border-t border-white/10 flex flex-col items-center gap-6 relative z-40">
      
      {/* Social links (icons) */}
      <SocialLinks />

      {/* Line */}
      <div className="h-px w-2/3 bg-white/10"></div>

      {/* Footer text */}
      <p className="text-sm text-white/40">
        © {new Date().getFullYear()} BLYZ. All rights reserved.
      </p>
    </footer>
  );
}
