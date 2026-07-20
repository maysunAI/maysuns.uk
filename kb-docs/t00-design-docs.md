# Design docs — recording *why*, not just *what*

## The problem it solves

Requirements docs record what to build. Overview docs record what got built. Neither one records *why a particular decision got made the way it did* — especially the decisions that look, at a glance, like they could be simplified or "cleaned up," but were actually written that way on purpose because of a bug or constraint discovered the hard way. Without that record, a later pass (by a person or an AI) can "helpfully" simplify the code right back into the bug it was written to avoid.

## The idea

A design doc is a running, append-only log of decisions that involved a real tradeoff — not a restatement of what the code does, but the reasoning an outside reader (or a future version of the same person) couldn't recover just by reading the code:

- Approaches that were tried and rejected, and why
- Constraints that aren't obvious from the code itself
- Bugs discovered the hard way, and what actually fixed them (not just that something "was broken")

## What doesn't belong in it

Anything the code already makes obvious. If a reviewer could read the implementation and understand the reasoning without help, it doesn't need an entry — a design doc that restates every line of code in prose stops being useful precisely because the signal gets buried in noise.

## Why this matters

The instinct to simplify something that "looks overcomplicated" is usually a good one — except when that complexity is there for a reason a quick read won't reveal. A design doc is what lets that judgment call get made correctly on the second pass: check whether this was already tried the simple way and rejected, instead of re-discovering the same bug a second time.

## How to use it

Append a short entry — decision, reasoning, date — whenever a real tradeoff gets made or a non-obvious bug gets root-caused, not for routine work. It's meant to stay small enough to actually read before making a related change, not become a second copy of the commit history.
