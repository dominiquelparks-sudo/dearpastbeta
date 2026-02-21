import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dear Past",
  description: "Create, curate, and preserve your digital legacy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
