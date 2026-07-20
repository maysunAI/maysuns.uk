# Honest status reporting — no faking "done"

## The problem it solves

When a task has a part that genuinely can't be done properly — no backend to verify a payment, no real credentials, a feature that only works against mock data — there's a strong pull toward making it *look* finished anyway: code that compiles, a UI that renders, a demo that appears to work. The gap between "looks done" and "actually works" doesn't show up until someone relies on it and it fails — often at the worst possible moment, like a real customer's payment silently not being verified.

## The rule

When a task has a part that's technically impossible or incomplete under current conditions, it's not acceptable to paper over that with code or docs that look complete but don't actually work or have a security gap. Instead:

1. **Build the parts that can genuinely be built** — no cutting corners on those.
2. **Clearly flag the parts that can't** — a code comment, a UI warning banner, a ⚠️ note in the docs — something visible enough that it won't be missed.
3. **Spell out exactly what's missing** — not "not supported yet," but the specific thing needed ("needs a backend to verify the Stripe webhook," "needs a real user auth system + database").
4. **Say it upfront, unprompted** — flag the gap when reporting completion, not only if someone happens to notice and asks.

## Why it matters this much

If something looks safe and functional but isn't — a payment flow with no real verification behind it, for instance — the failure mode isn't "mildly disappointing," it's "someone relied on it in production and got burned." An honest "this part isn't real yet" is strictly more useful than a dishonest "this looks like it works."

## Where it applies most

- Payments, multi-user accounts, permission checks — anything that needs a real backend or real credentials to be genuinely safe
- Anything tested only against mock data, not the real conditions it'll actually run under
- Any request where part of it depends on a resource the requester doesn't have yet (a real API key, a real server, a real business account)
