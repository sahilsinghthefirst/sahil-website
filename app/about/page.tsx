import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Sahil",
  description: "About Sahil",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AboutPage() {
  return (
    <main className="about-placeholder" aria-label="About Sahil">
      <Link className="brand" href="/" aria-label="Sahil home">
        <span className="brand-mark" aria-hidden="true">
          S
        </span>
        <span>Sahil</span>
      </Link>
    </main>
  );
}
