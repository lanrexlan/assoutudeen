# Opening and closing requests for assistance

The Request Assistance form is not always open. It runs in rounds, and you
control those rounds yourself from the admin panel — no developer, no
deployment, and it takes effect the moment you press Save.

## Where it is

1. Go to `assoutudeen.com/admin` and sign in.
2. In the left sidebar, under **Finance**, open **Requests: open or closed**.

You must be signed in as an **admin**. Editors and shop managers cannot see or
change this — it decides whether the foundation is taking applications at all.

## To open a round

1. Tick **Accepting requests**.
2. Fill in the four fields that appear:

   | Field | What it means |
   |---|---|
   | **Round name** | What applicants see, e.g. `September 2026` or `Q4 2026` |
   | **Opens** | First day requests are accepted |
   | **Deadline** | Last day, inclusive — the form closes at midnight in Ede |
   | **Applicants hear by** | The date you promise a decision |
   | **Places this round** | Optional. Leave blank and no number is published |

3. Press **Save**.

The page updates immediately. The form appears, the banner says how many days
are left, and it counts down on its own.

### Name it properly

Call it `September 2026`, not `The next round`. While a round is actually open,
"the next round" reads to an applicant as though it has not started yet.

## To close a round

Untick **Accepting requests** and Save. The form disappears, the page says
requests are closed, and it gives the WhatsApp number for anything urgent. The
dates are kept, so you can reopen without retyping them.

You do not have to close a round by hand when it ends — the deadline does that
by itself, at midnight in Ede on the closing day.

## What the site does automatically

- **Before the opening day** — the page says the round is coming and names the
  date, but shows no form.
- **During the round** — the form is open, and the banner counts down the days.
- **After the deadline** — the form disappears on its own, at midnight in Ede.
- **Whenever it is shut** — a direct submission is refused by the server, not
  just hidden by the page. Nothing can land in a queue nobody is reading.

## Things the panel will not let you save

These are refused with a message, because each one produces a round that can
never open:

- An open round with no opening date or no deadline.
- A deadline earlier than the opening date.
- A decision date earlier than the deadline.

## If the database is unavailable

The site falls back to treating requests as **open** rather than closed. That is
deliberate: a technical fault should never be the reason a family is told the
foundation cannot help them. Anything arriving slightly outside a window is
something a person can sort out on the phone.

## Where the requests go

**Finance → Assistance requests**, visible to admins only. They contain health
data, which is a special category under the NDPA 2023 — see the privacy policy
for what the foundation has committed to. Nobody is ever named publicly without
separate, written consent recorded against their request.
