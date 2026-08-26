"use client";

import { Analytics } from "@vercel/analytics/react";
import type { BeforeSendEvent } from "@vercel/analytics/react";

export const OWNER_ANALYTICS_OPT_OUT_KEY = "sahil-owner-analytics-opt-out-v1";
export const OWNER_ANALYTICS_OPT_OUT_VALUE = "1";
export const OWNER_ANALYTICS_ROUTE = "/owner-analytics";

function isOwnerAnalyticsPath(pathname: string): boolean {
  return pathname === OWNER_ANALYTICS_ROUTE || pathname.startsWith(`${OWNER_ANALYTICS_ROUTE}/`);
}

export function isVercelAppHost(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase().replace(/\.$/u, "");
  return normalized.length > ".vercel.app".length && normalized.endsWith(".vercel.app");
}

function hasOwnerOptOut(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(OWNER_ANALYTICS_OPT_OUT_KEY) === OWNER_ANALYTICS_OPT_OUT_VALUE;
  } catch {
    // Storage can be disabled or blocked. Keep public visitors opted in.
    return false;
  }
}

export function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  let eventPath: string | undefined;

  try {
    eventPath = new URL(
      event.url,
      typeof window === "undefined" ? "https://sahil-analytics.invalid" : window.location.href,
    ).pathname;
  } catch {
    eventPath = undefined;
  }

  if (eventPath && isOwnerAnalyticsPath(eventPath)) {
    return null;
  }

  if (typeof window !== "undefined" && isOwnerAnalyticsPath(window.location.pathname)) {
    return null;
  }

  return hasOwnerOptOut() ? null : event;
}

export default function VercelAnalytics() {
  const isVercelHost =
    typeof window !== "undefined" && isVercelAppHost(window.location.hostname);

  if (!isVercelHost) {
    return null;
  }

  return <Analytics beforeSend={beforeSend} />;
}
