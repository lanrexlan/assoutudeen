import { cn } from "@/lib/utils";

/**
 * Original vector artwork, drawn for this site.
 *
 * Photographs would be better in several of these slots and the code is ready
 * for them — every illustration sits inside the same frame a `next/image` would
 * use. But no photograph may be invented: a stock portrait standing in for the
 * founder, or a stranger's face standing in for a beneficiary, is a lie the
 * page tells on the foundation's behalf. So the placeholders are honest
 * drawings instead: geometry, hives, books, apiaries. They weigh a couple of
 * kilobytes and they scale to any screen.
 */

type Props = { className?: string; title?: string };

const frame = "h-full w-full";

/** Apiary at dusk — hives, hills, a crescent. For the honey and hero slots. */
export function ApiaryScene({ className, title = "Hives on a hillside" }: Props) {
  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label={title}
      className={cn(frame, className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2f29" />
          <stop offset="100%" stopColor="#08201c" />
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9a441" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#d9a441" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill="url(#sky)" />
      <ellipse cx="200" cy="150" rx="190" ry="150" fill="url(#glow)" />

      {/* Stars */}
      <g fill="#f0dcb2" opacity="0.7">
        {[
          [56, 70], [120, 44], [300, 62], [348, 118], [92, 132], [252, 36], [188, 92],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.8 : 1.2} />
        ))}
      </g>

      {/* Crescent */}
      <g transform="translate(300 96)">
        <path
          d="M0 -26a26 26 0 1 0 14 48A21 21 0 1 1 0 -26Z"
          fill="#d9a441"
          opacity="0.9"
        />
      </g>

      {/* Hills */}
      <path d="M0 330c70-40 120-40 190-8s140 26 210-10v188H0Z" fill="#0f2f29" />
      <path d="M0 380c80-34 130-28 210 4s120 22 190-6v122H0Z" fill="#123b35" />

      {/* Hives */}
      <g fill="none" stroke="#d9a441" strokeWidth="2.2" strokeLinecap="round">
        {[
          [96, 392, 1], [200, 410, 1.18], [300, 386, 0.92],
        ].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <path d="M-30 0h60M-27-14h54M-24-28h48M-21-42h42" />
            <path d="M-32 6h64" strokeWidth="3" />
            <path d="M-21-42c0-12 9-20 21-20s21 8 21 20" />
          </g>
        ))}
      </g>

      {/* Bees */}
      <g fill="#f0dcb2" opacity="0.85">
        {[
          [140, 320], [246, 344], [176, 288],
        ].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx} ${cy})`}>
            <ellipse rx="3.4" ry="2.2" />
            <path d="M-3 -2.6a4 4 0 0 1 6 0" fill="none" stroke="#f0dcb2" strokeWidth="1" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** An open book under an arch — for the book and library slots. */
export function BookScene({ className, title = "An open book" }: Props) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={title}
      className={cn(frame, className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="bookbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123b35" />
          <stop offset="100%" stopColor="#08201c" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#bookbg)" />

      {/* Arch outline behind */}
      <path
        d="M120 330V180a80 80 0 0 1 160 0v150"
        fill="none"
        stroke="#d9a441"
        strokeOpacity="0.35"
        strokeWidth="2"
      />

      {/* Book */}
      <g stroke="#d9a441" strokeWidth="2.4" fill="none" strokeLinejoin="round">
        <path d="M200 250c-26-22-58-28-88-24v-96c30-4 62 2 88 24 26-22 58-28 88-24v96c-30-4-62 2-88 24Z" />
        <path d="M200 154v96" />
        <path d="M130 158c18-2 38 2 52 12M130 182c18-2 38 2 52 12M218 170c14-10 34-14 52-12M218 194c14-10 34-14 52-12" strokeWidth="1.5" strokeOpacity="0.75" />
      </g>

      {/* Light above */}
      <circle cx="200" cy="104" r="7" fill="#d9a441" />
      <g stroke="#d9a441" strokeWidth="1.4" opacity="0.6">
        <path d="M200 84v-14M200 138v-12M172 104h-14M242 104h-14" />
      </g>
    </svg>
  );
}

/** Hands offering a seedling — for the empowerment and giving slots. */
export function GivingScene({ className, title = "A hand offering a seedling" }: Props) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={title}
      className={cn(frame, className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="400" fill="#0f2f29" />
      <circle cx="200" cy="176" r="118" fill="#123b35" />

      <g fill="none" stroke="#d9a441" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {/* Cupped hands */}
        <path d="M112 244c0 40 40 66 88 66s88-26 88-66" />
        <path d="M112 244c-10-14-6-30 8-32 10-2 18 6 22 18" />
        <path d="M288 244c10-14 6-30-8-32-10-2-18 6-22 18" />
        {/* Seedling */}
        <path d="M200 232v-56" />
        <path d="M200 196c-26 0-42-16-42-38 24-4 42 12 42 38Z" />
        <path d="M200 186c22-6 34-24 30-46-22 2-34 20-30 46Z" />
      </g>

      {/* Falling light */}
      <g stroke="#f0dcb2" strokeWidth="1.2" opacity="0.5">
        <path d="M150 92v22M200 76v26M250 92v22" />
      </g>
    </svg>
  );
}

/** Mortar, pestle and herbs — for prophetic medicine slots. */
export function RemedyScene({ className, title = "Mortar, pestle and herbs" }: Props) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={title}
      className={cn(frame, className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="400" fill="#0f2f29" />
      <circle cx="200" cy="200" r="130" fill="#123b35" />

      <g fill="none" stroke="#d9a441" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {/* Mortar */}
        <path d="M138 244h124c0 34-28 58-62 58s-62-24-62-58Z" />
        <path d="M126 240h148" strokeWidth="3" />
        {/* Pestle */}
        <path d="M236 238 286 150" />
        <circle cx="292" cy="140" r="12" />
        {/* Sprigs */}
        <path d="M170 236c-14-30-8-62 14-84" />
        <path d="M184 178c-18-2-28-14-30-30 18-2 30 10 30 30Z" />
        <path d="M186 166c14-6 20-20 16-36-16 4-22 18-16 36Z" />
        {/* Seeds */}
        <g strokeWidth="1.8">
          <ellipse cx="222" cy="196" rx="5" ry="3.4" transform="rotate(-25 222 196)" />
          <ellipse cx="240" cy="212" rx="5" ry="3.4" transform="rotate(15 240 212)" />
          <ellipse cx="212" cy="220" rx="5" ry="3.4" transform="rotate(40 212 220)" />
        </g>
      </g>
    </svg>
  );
}

/** A lantern in an arch — used where a portrait will eventually go. */
export function LanternScene({ className, title = "A lantern in an arch" }: Props) {
  return (
    <svg
      viewBox="0 0 300 400"
      role="img"
      aria-label={title}
      className={cn(frame, className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="lamp" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#d9a441" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#d9a441" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill="#0f2f29" />
      <rect width="300" height="400" fill="url(#lamp)" />

      <g fill="none" stroke="#d9a441" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M70 360V190a80 80 0 0 1 160 0v170" strokeOpacity="0.4" />
        <path d="M150 60v34" />
        <path d="M124 118h52l14 26-14 96h-52l-14-96Z" />
        <path d="M110 144h80" />
        <path d="M124 240h52l10 22h-72Z" />
        <path d="M150 168v44" strokeOpacity="0.7" />
        <circle cx="150" cy="104" r="10" />
      </g>
      <circle cx="150" cy="196" r="16" fill="#d9a441" opacity="0.55" />
    </svg>
  );
}
