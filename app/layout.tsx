import type { Metadata } from "next";
import "./globals.css";

import VercelAnalytics from "./analytics";

export const metadata: Metadata = {
  title: "Sahil Singh",
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
      <body>
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
