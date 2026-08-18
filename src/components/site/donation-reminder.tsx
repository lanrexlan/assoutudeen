"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Check, Copy, HandHeart, X } from "lucide-react";
import { BANK_ACCOUNTS } from "@/lib/banking";
import { foundationUrl } from "@/components/site/foundation-link";

/**
 * A giving reminder that comes to the reader.
 *
 * Bank details sitting on one page only reach people who already went looking
 * for them. This slides up once the visitor is far enough into a page to have
 * read something, shows the account they can transfer to, and lets them copy
 * the number without leaving what they were reading.
 *
 * The rules it keeps to, because a nag is worse than no prompt at all:
 *  - at most once per page, and never twice on the same page in a session, so
 *    a reader moving through the site meets it again on a new page but never
 *    on one they have already seen it on;
 *  - never twice within twenty seconds, so two quick hops do not stack
 *    prompts on top of one another;
 *  - never on the pages that are already asking (donate, join, request) or on
 *    the legal pages, where an appeal beside a consent notice is distasteful;
 *  - dismissible, and dismissing it buys quiet for a quarter of an hour;
 *  - it appears after real reading, not on a timer at the top of the page;
 *  - no motion at all when the visitor has asked for none.
 *
 * An earlier version put a single timer across the whole site, which meant it
 * appeared on the first page a visitor read and then stayed silent everywhere
 * else — the opposite of the intent.
 */

const SNOOZE_KEY = "apmf.giving-reminder.snoozed-until";
const LAST_SHOWN_KEY = "apmf.giving-reminder.last-shown";
const SEEN_PATHS_KEY = "apmf.giving-reminder.seen-paths";

/** Closing it buys quiet for this long, rather than for the whole session. */
const SNOOZE_MS = 15 * 60 * 1000;

/** The shortest gap between two appearances, however fast the reader moves. */
const MIN_GAP_MS = 20 * 1000;

/**
 * A page short enough that it is already 55% visible fires no scroll event at
 * all, so the reminder would never appear on one. Those pages get the prompt
 * after this much time on them instead — long enough to have read something.
 */
const DWELL_MS = 25 * 1000;

/** Pages where a prompt would be redundant, or in poor taste. */
const SUPPRESSED = [
  "/donate",
  "/empowerment/join",
  "/empowerment/request",
  "/legal",
  "/cart",
];

/** How far down the page before it is fair to ask. */
const TRIGGER_RATIO = 0.55;

const account = BANK_ACCOUNTS[0];

export function DonationReminder() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const suppressed = SUPPRESSED.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    /* Each page starts clean: the card is per-page, not a thing that follows
       the reader around once it has appeared. */
    setVisible(false);
    if (suppressed) return;

    const store = window.sessionStorage;
    const now = Date.now();

    if (now < Number(store.getItem(SNOOZE_KEY) ?? 0)) return;
    if (now - Number(store.getItem(LAST_SHOWN_KEY) ?? 0) < MIN_GAP_MS) return;

    const seen: string[] = JSON.parse(store.getItem(SEEN_PATHS_KEY) ?? "[]");
    if (seen.includes(pathname)) return;

    const show = () => {
      setVisible(true);
      store.setItem(LAST_SHOWN_KEY, String(Date.now()));
      store.setItem(SEEN_PATHS_KEY, JSON.stringify([...seen, pathname]));
    };

    const readEnough = () => {
      const scrolled = window.scrollY + window.innerHeight;
      return scrolled / document.documentElement.scrollHeight >= TRIGGER_RATIO;
    };

    /* A page with nothing to scroll is already "read to the end" on arrival.
       Asking the instant it loads would be a pop-up; asking after a dwell is a
       reminder. */
    const dwell = readEnough() ? window.setTimeout(show, DWELL_MS) : undefined;

    const onScroll = () => {
      if (!readEnough()) return;
      show();
      window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (dwell) window.clearTimeout(dwell);
    };
  }, [suppressed, pathname]);

  if (!visible || suppressed) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* Clipboard refused — the number is on screen and selectable anyway. */
    }
  };

  return (
    /* Bottom-start on desktop, above the WhatsApp button on mobile: the two
       must never sit on top of one another. */
    <aside
      aria-label="A reminder about giving"
      className="giving-reminder fixed inset-x-3 bottom-24 z-40 mx-auto max-w-md sm:inset-x-auto sm:bottom-4 sm:start-4 sm:mx-0 sm:max-w-sm"
    >
      <div className="seal bg-apricot/50 p-px shadow-elevated">
        <div className="seal relative bg-ink p-5 pe-11 text-chalk">
          <button
            type="button"
            onClick={() => {
              setVisible(false);
              window.sessionStorage.setItem(
                SNOOZE_KEY,
                String(Date.now() + SNOOZE_MS),
              );
            }}
            aria-label="Close this reminder"
            className="absolute end-1.5 top-1.5 flex size-11 items-center justify-center rounded-full text-chalk/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden="true" className="size-4" />
          </button>

          <div className="flex items-start gap-3">
            <span className="seal seal-sm inline-flex size-11 shrink-0 items-center justify-center bg-apricot text-charcoal">
              <HandHeart aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="font-display text-lg leading-snug text-white">
                A transfer takes a minute
              </p>
              <p className="mt-1 text-sm leading-relaxed text-chalk/75">
                Sadaqah or Zakat — Zakat is kept in its own fund and given only to
                those eligible for it.
              </p>
            </div>
          </div>

          <dl className="mt-4 rounded-lg border border-white/12 bg-ink-raised p-3.5 text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-chalk/60">Account</dt>
              <dd className="font-mono text-base tracking-[0.08em] text-apricot">
                {account.accountNumber}
              </dd>
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-3">
              <dt className="text-chalk/60">Bank</dt>
              <dd className="text-chalk/90">{account.bank}</dd>
            </div>
            <div className="mt-2">
              <dt className="text-chalk/60">Name</dt>
              <dd className="mt-0.5 leading-snug text-chalk/90">
                {account.accountName}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-apricot px-4 text-sm font-semibold text-charcoal transition-colors hover:bg-apricot-dark hover:text-white"
            >
              {copied ? (
                <>
                  <Check aria-hidden="true" className="size-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy aria-hidden="true" className="size-4" />
                  Copy number
                </>
              )}
            </button>
            <Link
              href={`${foundationUrl}/donate`}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-4 text-sm font-semibold text-white transition-colors hover:border-apricot hover:bg-white/10"
            >
              Other ways to give
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
