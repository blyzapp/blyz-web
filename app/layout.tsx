// ============================================================================
// 🌨️ BLYZ — Root Layout (FINAL 2025 BUILD)
// ============================================================================
// - Global HTML structure for the entire app
// - Ensures proper hydration for ALL pages (marketing + admin)
// - Fixes black-screen issues by avoiding unnecessary wrappers
// ============================================================================

import "./globals.css";

export const metadata = {
  title: "BLYZ — On-Demand Snow Removal",
  description: "Simple. Fast. Winter-Ready.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
