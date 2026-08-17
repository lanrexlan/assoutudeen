import {
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  BookOpenText,
  CalendarDays,
  Clock,
  Compass,
  Flag,
  Gavel,
  Gem,
  HandHeart,
  HeartHandshake,
  HelpCircle,
  Info,
  Leaf,
  ListChecks,
  MapPin,
  Megaphone,
  MessageCircle,
  Newspaper,
  PlayCircle,
  Receipt,
  Scale,
  Search,
  Settings2,
  ShieldCheck,
  Stethoscope,
  ScrollText,
  ShoppingBag,
  Sprout,
  Trophy,
  Truck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Islamic geometry, used as ornament rather than wallpaper.
 *
 * docs/05 forbids tiled arabesque wallpaper and mosque-silhouette backgrounds,
 * and it is right to: they read as costume. What is used here instead is the
 * underlying *geometry* — the eight-point khatim star and the interlaced grid
 * that generates it — drawn as hairlines, always masked so it fades out, and
 * always behind a contained surface.
 *
 * Everything is inline SVG encoded as a data URI: no extra requests, which
 * matters on a mid-range Android over patchy data.
 */

const geometricTile = (stroke: string, opacity: number) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="168" height="168" viewBox="0 0 168 168">
    <g fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1">
      <path d="M84 6 L110 32 L146 32 L146 68 L162 84 L146 100 L146 136 L110 136 L84 162 L58 136 L22 136 L22 100 L6 84 L22 68 L22 32 L58 32 Z"/>
      <path d="M84 28 L118 62 L118 106 L84 140 L50 106 L50 62 Z"/>
      <path d="M6 84 L50 62 M162 84 L118 62 M6 84 L50 106 M162 84 L118 106"/>
      <path d="M84 6 L84 28 M84 162 L84 140"/>
      <circle cx="84" cy="84" r="20"/>
    </g>
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

export function OrnamentField({
  className,
  tone = "accent",
}: {
  className?: string;
  tone?: "accent" | "light" | "dark";
}) {
  const stroke =
    tone === "accent" ? "%23E0A06A" : tone === "light" ? "%23FFFFFF" : "%236B2233";
  const opacity = tone === "dark" ? 0.16 : 0.22;

  return (
    <div
      aria-hidden="true"
      className={cn("ornament-field", className)}
      style={{ "--ornament-image": geometricTile(stroke, opacity) } as React.CSSProperties}
    />
  );
}

/** Static starfield. Nothing animates — no twinkle, no parallax. */
export function Starfield({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("starfield", className)} />;
}

/** The eight-point khatim star, the site's repeating glyph. */
export function StarGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    >
      <path d="M12 1.8 15 5.7h4.9v4.9L22.8 12l-2.9 1.4v4.9H15L12 22.2 9 18.3H4.1v-4.9L1.2 12l2.9-1.4V5.7H9Z" />
    </svg>
  );
}

/** Section divider: an apricot hairline with the star at its centre. */
export function RuleMark({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("rule-mark", className)}>
      <StarGlyph className="size-4 shrink-0 text-apricot" />
    </div>
  );
}

/**
 * The seal frame. The signature shape: an eight-sided cut-corner frame with an
 * apricot hairline inside it, wrapping an image or an illustration.
 *
 * clip-path clips the border away, so the hairline is the outer element and the
 * content sits in a second, inset seal.
 */
export function SealFrame({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn("seal relative overflow-hidden bg-apricot/45 p-px", className)}
    >
      <div className="seal relative h-full w-full overflow-hidden bg-ink-raised p-1.5">
        <div
          className={cn("seal relative h-full w-full overflow-hidden", innerClassName)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** Seal-shaped medallion holding an icon. */
export function Medallion({
  children,
  className,
  tone = "accent",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "accent" | "outline" | "soft";
}) {
  return (
    <span
      className={cn(
        "seal seal-sm inline-flex size-14 shrink-0 items-center justify-center",
        tone === "accent" && "bg-apricot text-charcoal shadow-accent",
        tone === "outline" && "border border-apricot/50 bg-transparent text-apricot",
        tone === "soft" && "bg-apricot/15 text-apricot-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Kicker labels choose their own icon.
 *
 * Every kicker used to fall back to the khatim star, which meant a page of six
 * sections carried six identical glyphs — decoration rather than signposting.
 * The label already says what the section is about, so the first keyword it
 * matches picks the icon. Explicit `icon` still wins where a section wants
 * something specific, and the star remains the fallback for anything unmatched.
 *
 * Order matters: the first match wins, so put the specific words first.
 */
const KICKER_ICONS: [RegExp, LucideIcon][] = [
  [/zakat|donat|giv|sadaqah|amount|fund/i, HandHeart],
  [/how we work|how it works|process|method|step/i, Workflow],
  [/empower|assist|help|support|work|what we do|mission/i, HeartHandshake],
  [/prophetic|remed|medicine|treatment|health/i, Leaf],
  [/receipt|refund|invoice|payment|paid|price|cost/i, Receipt],
  [/cookie|protect|secur|encrypt|store|confidential/i, ShieldCheck],
  [/when|how long|clock|hour|time|ramadan|eid|friday|saturday|sunday|season/i, Clock],
  [/account|transparen|money|spend|ledger|verified|figure/i, Scale],
  [/liabilit|right|law|court|jurisdiction|govern/i, Gavel],
  [/rule|policy|legal|consent|privacy|constitution|terms/i, ScrollText],
  [/class|teach|programme|study|schedule|week|timetable|lesson/i, CalendarDays],
  [/teacher|founder|trustee|family|people|organisation|structure|who|about/i, Users],
  [/found|establish|histor|origin|began|begin/i, Flag],
  [/librar|record|lecture|archive|listen|watch|video|media/i, PlayCircle],
  [/book|read|chapter|contents|inside/i, BookOpenText],
  [/honey|hive|bee|apiary|farm|kept|trade/i, Sprout],
  [/shop|buy|sell|order|basket|wholesale|product|sale/i, ShoppingBag],
  [/ambassador|leaderboard|referral|prize|award/i, Trophy],
  [/contact|write|message|ask|talk|reach|enquir/i, MessageCircle],
  [/deliver|shipping|courier|collect|dispatch/i, Truck],
  [/journalist|press|brand|logo/i, Newspaper],
  [/judge|test|check|verif|trace|proof|evidence/i, Search],
  [/damage|fail|wrong|complain|not claim|will not/i, AlertTriangle],
  [/value|principle|belief|honest|promise/i, Gem],
  [/why|reason|purpose|answer/i, HelpCircle],
  [/where|place|venue|address|located|come|sits/i, MapPin],
  [/bring|prepare|need|checklist|require/i, ListChecks],
  [/keep up|follow|subscri|announce|update|news/i, Bell],
  [/start|begin|first|way/i, Compass],
  [/impact|result|done|report|year/i, BarChart3],
  [/consultation|conversation|advice/i, Stethoscope],
  [/publish|story|photograph|name you/i, Megaphone],
  [/handled|process|prepar|made|strain/i, Settings2],
  [/institute|foundation|enterprise|assoutudeen/i, Building2],
  [/note|also|more|other|using|what it is|what this/i, Info],
];

/** Pick an icon for a label from its own words. */
export function iconForKicker(label: string): LucideIcon | null {
  for (const [pattern, icon] of KICKER_ICONS) {
    if (pattern.test(label)) return icon;
  }
  return null;
}

/**
 * The kicker above a heading: an icon and a label.
 *
 * It used to be `— label —`, flanked by rules. Two dashes around a word read as
 * a typewriter fallback rather than a decision, so the rules are gone and the
 * star glyph — or a section-specific icon — carries it instead.
 */
export function Kicker({
  children,
  className,
  align = "start",
  tone = "light",
  icon: Icon,
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center";
  /**
   * `light` on chalk and white grounds, `dark` on ink. Apricot-dark carries
   * the contrast on a light ground; on ink it is too close to the background,
   * so the brighter apricot is used there instead.
   */
  tone?: "light" | "dark";
  /** Optional section-specific icon. Otherwise one is chosen from the label. */
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  const Resolved =
    Icon ?? (typeof children === "string" ? iconForKicker(children) : null);

  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "dark" ? "text-apricot" : "text-apricot-dark",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span
        className={cn(
          "seal inline-flex size-7 items-center justify-center [--c:0.4375rem]",
          tone === "dark" ? "bg-apricot/20 text-apricot" : "bg-apricot/18 text-apricot-dark",
        )}
      >
        {Resolved ? (
          <Resolved aria-hidden className="size-3.5" />
        ) : (
          <StarGlyph className="size-3.5" />
        )}
      </span>
      {children}
    </p>
  );
}
