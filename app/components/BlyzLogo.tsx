"use client";

import Image from "next/image";

export default function BlyzLogo({
  size = 200,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/Blyzlogo.png"
      alt="Blyz Logo"
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}
