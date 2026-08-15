import { CalendarClock, CalendarX2, MessageCircle } from "lucide-react";
import { Medallion } from "@/components/ui/ornament";
import { formatIntakeDate, getIntakeState } from "@/lib/intake";
import { CONTACT } from "@/lib/sites";
import { cn } from "@/lib/utils";

const whatsappHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "As-salaamu alaykum. I would like to ask about the next round of assistance requests.",
)}`;

/**
 * States when requests are being taken, and until when.
 *
 * Shown above the form and again on the empowerment pages. When the round is
 * shut the form is not rendered at all — a form that silently discards what
 * someone typed at their lowest moment would be worse than no form.
 */
export function IntakeNotice({ className }: { className?: string }) {
  const { status, round, daysLeft } = getIntakeState();

  if (status === "none" || !round) {
    return (
      <div
        className={cn(
          "rounded-xl border border-sand-dark bg-white p-6 shadow-sm",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <Medallion tone="soft" className="size-11">
            <CalendarX2 aria-hidden="true" className="size-5" />
          </Medallion>
          <p className="font-display text-lg">Requests are closed just now</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
          The fund opens for requests a few times a year, and the next round has not
          been scheduled yet. If the need is urgent, message us — we would rather hear
          from you than have you wait on a form.
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-olive underline decoration-amber decoration-2 underline-offset-4"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  const open = status === "open";
  const upcoming = status === "upcoming";

  return (
    <div
      className={cn(
        "rounded-xl border p-6 shadow-sm",
        open ? "border-olive/30 bg-olive-tint" : "border-sand-dark bg-white",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Medallion tone={open ? "gold" : "soft"} className="size-11">
          {open ? (
            <CalendarClock aria-hidden="true" className="size-5" />
          ) : (
            <CalendarX2 aria-hidden="true" className="size-5" />
          )}
        </Medallion>
        <p className="font-display text-lg">
          {open
            ? "Requests are open"
            : upcoming
              ? "Requests open soon"
              : "This round has closed"}
        </p>
        {open && daysLeft !== null ? (
          <span className="rounded-full bg-amber px-3 py-1 text-xs font-semibold uppercase tracking-widest text-charcoal">
            {daysLeft === 0
              ? "Last day"
              : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`}
          </span>
        ) : null}
      </div>

      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs uppercase tracking-widest text-charcoal-muted">
            Opens
          </dt>
          <dd className="mt-1 font-medium text-charcoal">
            {formatIntakeDate(round.opensOn)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-charcoal-muted">
            Deadline
          </dt>
          <dd className="mt-1 font-medium text-charcoal">
            {formatIntakeDate(round.closesOn)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-charcoal-muted">
            You will hear by
          </dt>
          <dd className="mt-1 font-medium text-charcoal">
            {formatIntakeDate(round.decisionsBy)}
          </dd>
        </div>
      </dl>

      <p className="mt-5 text-sm leading-relaxed text-charcoal-muted">
        {open ? (
          <>
            Requests are read after the deadline and each one is verified by hand, so
            sending early makes no difference to your chances — but a complete form
            does. Everyone who applies is told the outcome, either way.
          </>
        ) : upcoming ? (
          <>
            The form opens on {formatIntakeDate(round.opensOn)}. If something cannot
            wait until then, message us on WhatsApp.
          </>
        ) : (
          <>
            This round closed on {formatIntakeDate(round.closesOn)} and the requests are
            being verified. Decisions go out by {formatIntakeDate(round.decisionsBy)}.
            If the need is urgent, message us rather than waiting for the next round.
          </>
        )}
      </p>

      {!open ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-olive underline decoration-amber decoration-2 underline-offset-4"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          Message us on WhatsApp
        </a>
      ) : null}
    </div>
  );
}
