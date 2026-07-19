# Persistent memory across AI sessions

## The problem it solves

Most AI assistant conversations start from zero. Every new session, you re-explain your preferences, your conventions, the recurring feedback you gave last time ("no, I always want dates in this format," "don't do X, I've told you three times"). Over dozens of sessions, that's a lot of repeated context — and it's easy for small but important preferences to get lost or contradicted between sessions.

## The idea

A small, durable memory file — deliberately *not* a full transcript of every past conversation — that carries forward a handful of facts worth remembering across sessions:

- Standing preferences ("always confirm before doing X")
- Recurring corrections ("I've had to explain this bug three times, write it down so I don't have to again")
- Stable facts about the working context (naming conventions, where things live, who's involved)

The key design choice is **selectivity**. A memory file that tries to store everything becomes as useless as no memory at all — it's too large to usefully reference and mixes durable facts with one-off noise. A good memory file stays short and gets edited deliberately, the same way you'd maintain a small "team wiki" page rather than a raw chat log.

## Why this matters

- **Less repetition.** Standing preferences don't need to be re-stated every session.
- **Consistency.** The AI's behavior stays aligned with what you've already told it, instead of drifting session to session.
- **It's inspectable.** Because it's a plain file rather than an opaque internal state, you can read exactly what's "remembered," correct it if something got recorded wrong, and delete anything that's gone stale.

## Adapting this yourself

Keep a short markdown file the assistant reads at the start of a session (or is otherwise given access to). Add to it deliberately, in your own words, when something is worth remembering long-term — not automatically for every exchange. Review and prune it occasionally, the same way you'd tidy any reference document that accumulates cruft over time.
