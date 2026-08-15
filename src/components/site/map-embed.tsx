import { CONTACT } from "@/lib/sites";

/**
 * OpenStreetMap embed for the Ede office.
 *
 * OSM rather than Google Maps: no API key, no billing account, and no
 * third-party script — just a lazily-loaded iframe, which matters on a mid-range
 * Android over patchy data.
 *
 * The view is Ede town, NOT a pin on the office. Nobody has supplied
 * street-level coordinates, and dropping a marker on a guessed spot would send
 * visitors to the wrong place. The "get directions" link searches the written
 * address instead, which is accurate.
 */

// Ede, Osun State. A bounding box around the town, not a precise address.
const BBOX = "4.40,7.71,4.48,7.76";

export function MapEmbed() {
  const directionsUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(
    CONTACT.address,
  )}`;

  return (
    <figure className="overflow-hidden rounded-lg border border-chalk-dark bg-white">
      <iframe
        title="Map showing Ede, Osun State"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-4/3 w-full border-0 sm:aspect-video"
      />
      <figcaption className="border-t border-chalk-dark p-4 text-sm leading-relaxed text-charcoal">
        <p className="font-medium text-charcoal">{CONTACT.address}</p>
        <p className="mt-1 text-charcoal-muted">
          The map shows Ede. Call ahead and someone will guide you in from
          Agbonran junction — it is quicker than any pin.
        </p>
        <p className="mt-2">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
          >
            Open in maps
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
