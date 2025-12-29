import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brian - AI Personal Assistant",
  description: "Open-source AI assistant for Ubuntu with worldwide information access",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
