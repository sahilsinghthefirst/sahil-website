"use client";

import { useEffect, useState } from "react";
import {
  OWNER_ANALYTICS_OPT_OUT_KEY,
  OWNER_ANALYTICS_OPT_OUT_VALUE,
} from "../analytics";

const OWNER_ANALYTICS_TOKEN_DIGEST =
  "28dfe1cc3a47bbcb742af2d3e099972f91d773faa4b7df8e831a23aed44304ff";

type PanelState = "not-found" | "opted-out";

async function sha256Hex(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", encoded);

  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hasOwnerOptOut(): boolean {
  try {
    return window.localStorage.getItem(OWNER_ANALYTICS_OPT_OUT_KEY) === OWNER_ANALYTICS_OPT_OUT_VALUE;
  } catch {
    return false;
  }
}

export default function OwnerAnalyticsPanel() {
  const [state, setState] = useState<PanelState>("not-found");

  useEffect(() => {
    let mounted = true;

    if (hasOwnerOptOut()) {
      queueMicrotask(() => {
        if (mounted) {
          setState("opted-out");
        }
      });
      return () => {
        mounted = false;
      };
    }

    const currentUrl = new URL(window.location.href);
    const token = currentUrl.searchParams.get("token");
    if (token !== null) {
      currentUrl.searchParams.delete("token");
      window.history.replaceState(
        window.history.state,
        "",
        `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`,
      );
    }

    if (!token || !window.crypto?.subtle) {
      return () => {
        mounted = false;
      };
    }

    void sha256Hex(token)
      .then((digest) => {
        if (!mounted || digest !== OWNER_ANALYTICS_TOKEN_DIGEST) {
          return;
        }

        try {
          window.localStorage.setItem(OWNER_ANALYTICS_OPT_OUT_KEY, OWNER_ANALYTICS_OPT_OUT_VALUE);
        } catch {
          return;
        }

        setState("opted-out");
      })
      .catch(() => {
        // Keep invalid or unavailable requests indistinguishable from a missing route.
      });

    return () => {
      mounted = false;
    };
  }, []);

  function countThisBrowserAgain() {
    try {
      window.localStorage.removeItem(OWNER_ANALYTICS_OPT_OUT_KEY);
    } finally {
      setState("not-found");
    }
  }

  if (state !== "opted-out") {
    return <h1 id="owner-analytics-title">Not found</h1>;
  }

  return (
    <>
      <h1 id="owner-analytics-title">Analytics paused for this browser</h1>
      <p className="owner-analytics-copy">This browser is excluded from portfolio analytics.</p>
      <button className="mini-pill owner-analytics-reset" type="button" onClick={countThisBrowserAgain}>
        Count this browser again <span className="text-arrow" aria-hidden="true">→︎</span>
      </button>
    </>
  );
}
