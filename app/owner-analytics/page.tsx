import type { Metadata } from "next";
import Link from "next/link";
import OwnerAnalyticsPanel from "./owner-analytics-panel";

export const metadata: Metadata = {
  title: "Not found — Sahil Singh",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OwnerAnalyticsPage() {
  return (
    <main className="owner-analytics-page" aria-labelledby="owner-analytics-title">
      <Link className="brand owner-analytics-home" href="/" aria-label="Sahil home">
        <span className="brand-mark" aria-hidden="true">
          S
        </span>
        <span>Sahil</span>
      </Link>
      <section className="owner-analytics-card">
        <OwnerAnalyticsPanel />
      </section>
    </main>
  );
}
