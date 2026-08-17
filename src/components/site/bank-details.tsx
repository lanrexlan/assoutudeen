import { Building2, Globe2 } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Medallion } from "@/components/ui/ornament";
import { BANK_ACCOUNTS } from "@/lib/banking";
import { cn } from "@/lib/utils";

/**
 * The published donation accounts.
 *
 * Account numbers are set in a tabular font and spaced in fours, because the
 * single most expensive error a donor can make on this page is misreading a
 * digit.
 */
export function BankDetails({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", className)}>
      {BANK_ACCOUNTS.map((account, index) => (
        <Card key={account.accountNumber} className="reveal">
          <div className="flex items-center gap-3">
            <Medallion tone={index === 0 ? "accent" : "outline"} className="size-11">
              {index === 0 ? (
                <Building2 aria-hidden="true" className="size-5" />
              ) : (
                <Globe2 aria-hidden="true" className="size-5" />
              )}
            </Medallion>
            <CardTitle>{account.label}</CardTitle>
          </div>

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest text-charcoal-muted">
                Account name
              </dt>
              <dd className="mt-0.5 font-medium text-charcoal">
                {account.accountName}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-charcoal-muted">
                Account number
              </dt>
              <dd className="mt-0.5 font-mono text-lg font-semibold tracking-[0.15em] text-oxblood">
                {account.accountNumber}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-charcoal-muted">
                Bank
              </dt>
              <dd className="mt-0.5 font-medium text-charcoal">{account.bank}</dd>
            </div>
            {account.swift ? (
              <div>
                <dt className="text-xs uppercase tracking-widest text-charcoal-muted">
                  SWIFT code
                </dt>
                <dd className="mt-0.5 font-mono text-base font-semibold tracking-[0.12em] text-oxblood">
                  {account.swift}
                </dd>
              </div>
            ) : null}
          </dl>

          <p className="mt-auto text-sm text-charcoal-muted">{account.note}</p>
        </Card>
      ))}
    </div>
  );
}
