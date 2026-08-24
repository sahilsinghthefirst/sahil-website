import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahil — Researcher, Engineer, Student",
  description:
    "The personal portfolio of Sahil: a quiet index of research, engineering, and the questions connecting them.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
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
