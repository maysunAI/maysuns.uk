# Trust levels for AI-assisted code changes

## The problem it solves

When an AI assistant has broad edit access to a codebase, it's easy for it to be too helpful in the wrong place — "fixing" a workaround that was actually load-bearing, refactoring a file that was deliberately left rough because touching it is risky, or rewriting something a human specifically hand-tuned. The fix isn't to restrict the AI to read-only access everywhere (that defeats the point of using it), it's to tell it, per area of the code, how much caution to use.

## The convention

A simple tagging system, usually a short comment or note near the relevant code, marking it with one of a few trust levels:

- **High trust** — sensitive, load-bearing, or easy to break silently. The AI should be cautious here: explain what it plans to change and why *before* changing it, rather than just doing it and reporting after.
- **Medium trust** — the sensible default for most code. Normal changes are fine; nothing special required.
- **Low trust** — safe to edit boldly. Scratch files, generated output, disposable scaffolding — areas where being cautious would just slow things down for no benefit.
- **Do-not-touch** — an explicit marker (e.g. a "manually modified" note) meaning a human edited this by hand for a reason, and it should be left alone entirely unless the human says otherwise.

## Why this matters

- **Prevents silent damage.** Without any signal, an AI assistant treats all code as equally safe to change — which means the one file that was deliberately hacky for a good reason gets "cleaned up" and something breaks.
- **Doesn't slow everything down either.** The opposite failure mode — treating *everything* as high-risk and asking for confirmation on every edit — makes an AI assistant annoying to work with. Tiering lets caution scale with actual risk instead of applying uniformly.
- **Makes intent explicit and portable.** A trust-level tag survives across sessions and even across different AI tools — it's just a note in the code, not something living only in someone's memory of a conversation from last week.

## Adapting this yourself

Pick two or three levels (you don't need a complex scheme), decide on a short marker for each, and apply it where it actually matters — critical config, hand-tuned algorithms, anything where a "helpful" rewrite could cause real damage. Everything else can stay untagged and default to normal caution.
