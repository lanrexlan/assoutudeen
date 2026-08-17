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

/**
 * The seal, as an SVG path: the same eight-sided cut-corner shape the CSS
 * `.seal` class draws. The artwork uses it wherever a circle or an arch used
 * to sit, so the illustrations carry the site's geometry rather than fighting
 * it with a second one.
 */
function seal(x: number, y: number, w: number, h: number, cut: number) {
  const points: [number, number][] = [
    [x + cut, y],
    [x + w - cut, y],
    [x + w, y + cut],
    [x + w, y + h - cut],
    [x + w - cut, y + h],
    [x + cut, y + h],
    [x, y + h - cut],
    [x, y + cut],
  ];
  return `M${points.map(([px, py]) => `${px} ${py}`).join("L")}Z`;
}

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
          <stop offset="0%" stopColor="#351826" />
          <stop offset="100%" stopColor="#24101a" />
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0a06a" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#e0a06a" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill="url(#sky)" />
      <path d={seal(10, 10, 380, 290, 74)} fill="url(#glow)" />

      {/* Stars */}
      <g fill="#f6e2cd" opacity="0.7">
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
          fill="#e0a06a"
          opacity="0.9"
        />
      </g>

      {/* Hills */}
      <path d="M0 330c70-40 120-40 190-8s140 26 210-10v188H0Z" fill="#351826" />
      <path d="M0 380c80-34 130-28 210 4s120 22 190-6v122H0Z" fill="#55614f" />

      {/* Hives */}
      <g fill="none" stroke="#e0a06a" strokeWidth="2.2" strokeLinecap="round">
        {[
          [96, 392, 1], [200, 410, 1.18], [300, 386, 0.92],
        ].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <path d="M-30 0h60M-27-14h54M-24-28h48M-21-42h42" />
            <path d="M-32 6h64" strokeWidth="3" />
            <path d="M-21-42 -9-56h18l12 14" />
          </g>
        ))}
      </g>

      {/* Bees */}
      <g fill="#f6e2cd" opacity="0.85">
        {[
          [140, 320], [246, 344], [176, 288],
        ].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx} ${cy})`}>
            <ellipse rx="3.4" ry="2.2" />
            <path d="M-3 -2.6a4 4 0 0 1 6 0" fill="none" stroke="#f6e2cd" strokeWidth="1" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** An open book inside the seal — for the book and library slots. */
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
          <stop offset="0%" stopColor="#55614f" />
          <stop offset="100%" stopColor="#24101a" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#bookbg)" />

      {/* The seal, drawn as a hairline behind the book */}
      <path
        d={seal(88, 68, 224, 264, 52)}
        fill="none"
        stroke="#e0a06a"
        strokeOpacity="0.35"
        strokeWidth="2"
      />

      {/* Book */}
      <g stroke="#e0a06a" strokeWidth="2.4" fill="none" strokeLinejoin="round">
        <path d="M200 250c-26-22-58-28-88-24v-96c30-4 62 2 88 24 26-22 58-28 88-24v96c-30-4-62 2-88 24Z" />
        <path d="M200 154v96" />
        <path d="M130 158c18-2 38 2 52 12M130 182c18-2 38 2 52 12M218 170c14-10 34-14 52-12M218 194c14-10 34-14 52-12" strokeWidth="1.5" strokeOpacity="0.75" />
      </g>

      {/* Light above */}
      <circle cx="200" cy="104" r="7" fill="#e0a06a" />
      <g stroke="#e0a06a" strokeWidth="1.4" opacity="0.6">
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
      <rect width="400" height="400" fill="#351826" />
      <path d={seal(82, 58, 236, 236, 56)} fill="#55614f" />

      <g fill="none" stroke="#e0a06a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
      <g stroke="#f6e2cd" strokeWidth="1.2" opacity="0.5">
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
      <rect width="400" height="400" fill="#351826" />
      <path d={seal(70, 70, 260, 260, 62)} fill="#55614f" />

      <g fill="none" stroke="#e0a06a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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

/**
 * A faceless bust: a turbaned figure drawn as a tailor's mannequin would be,
 * with no facial features at all.
 *
 * This is what stands in for the founder's photograph. It is deliberately not a
 * likeness of anyone — no eyes, nose or mouth — so it can never be mistaken for
 * a portrait of a real person, which a stock photograph would be.
 */
export function TurbanBust({
  className,
  title = "A turbaned figure, drawn without features",
}: Props) {
  return (
    <svg
      viewBox="0 0 300 400"
      role="img"
      aria-label={title}
      className={cn(frame, className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="bustbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a1a28" />
          <stop offset="100%" stopColor="#24101a" />
        </linearGradient>
        <linearGradient id="form" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#f0ebe2" />
          <stop offset="100%" stopColor="#d5cbbd" />
        </linearGradient>
        <linearGradient id="wrap" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e5ded4" />
        </linearGradient>
      </defs>

      <rect width="300" height="400" fill="url(#bustbg)" />

      {/* Halo of light behind the figure */}
      <path d={seal(32, 73, 236, 264, 58)} fill="rgba(224,160,106,0.10)" />

      {/* Shoulders — a dress form, cut off at the base like a mannequin */}
      <path
        d="M150 268c-52 6-84 34-92 84-2 12-3 26-3 48h190c0-22-1-36-3-48-8-50-40-78-92-84Z"
        fill="url(#form)"
      />
      {/* Seam down the robe */}
      <path
        d="M150 274v126"
        stroke="#cbb9a4"
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      {/* Collar */}
      <path
        d="M124 276c8 16 16 24 26 24s18-8 26-24"
        fill="none"
        stroke="#cbb9a4"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Neck */}
      <path d="M134 232h32v42c0 6-32 6-32 0Z" fill="#e5ded4" />

      {/* Head — a blank form. No eyes, nose or mouth, by design. */}
      <ellipse cx="150" cy="184" rx="42" ry="50" fill="url(#form)" />
      {/* Ear line only, as a mannequin has */}
      <path
        d="M108 184c-5 0-8 5-6 11 2 5 6 7 9 5"
        fill="none"
        stroke="#cbb9a4"
        strokeWidth="2"
      />
      <path
        d="M192 184c5 0 8 5 6 11-2 5-6 7-9 5"
        fill="none"
        stroke="#cbb9a4"
        strokeWidth="2"
      />

      {/* Beard, as a shape rather than hair */}
      <path
        d="M112 196c3 32 18 52 38 52s35-20 38-52c-9 18-22 28-38 28s-29-10-38-28Z"
        fill="#cfc3b2"
      />

      {/* The tail of the cloth, falling behind the shoulder */}
      <path
        d="M186 138c18 10 26 32 22 58-3 20-11 36-23 46"
        fill="none"
        stroke="#e5ded4"
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* Turban — the crown, then wrapped bands resting at the hairline */}
      <g fill="url(#wrap)" stroke="#cbb9a4" strokeWidth="1.4">
        <path d="M108 120c0-30 19-52 42-52s42 22 42 52c0 8-5 13-13 13h-58c-8 0-13-5-13-13Z" />
        <path d="M100 128c0-10 9-17 23-17h54c14 0 23 7 23 17s-9 17-23 17h-54c-14 0-23-7-23-17Z" />
        <path d="M104 148c0-9 8-15 21-15h50c13 0 21 6 21 15s-8 15-21 15h-50c-13 0-21-6-21-15Z" />
      </g>
      {/* Gold band along the lowest wrap */}
      <path
        d="M104 148c0-9 8-15 21-15h50c13 0 21 6 21 15"
        fill="none"
        stroke="#e0a06a"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Wrap creases */}
      <g stroke="#cbb9a4" strokeWidth="1.1" fill="none" opacity="0.9">
        <path d="M120 110c13-8 38-10 64-5M112 134c22-6 60-6 80 0M114 154c20-5 56-5 74 0" />
      </g>
    </svg>
  );
}

/** A lantern inside the seal — used where a portrait will eventually go. */
export function LanternScene({ className, title = "A lantern inside the seal" }: Props) {
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
          <stop offset="0%" stopColor="#e0a06a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e0a06a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill="#351826" />
      <rect width="300" height="400" fill="url(#lamp)" />

      <g fill="none" stroke="#e0a06a" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
        <path d={seal(48, 48, 204, 312, 48)} strokeOpacity="0.4" />
        <path d="M150 60v34" />
        <path d="M124 118h52l14 26-14 96h-52l-14-96Z" />
        <path d="M110 144h80" />
        <path d="M124 240h52l10 22h-72Z" />
        <path d="M150 168v44" strokeOpacity="0.7" />
        <circle cx="150" cy="104" r="10" />
      </g>
      <circle cx="150" cy="196" r="16" fill="#e0a06a" opacity="0.55" />
    </svg>
  );
}
