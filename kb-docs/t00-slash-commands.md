# Custom slash commands

## The problem it solves

Some instructions to an AI assistant aren't one-off — they're a repeatable, multi-step recipe you use over and over: "review this code against our checklist," "estimate how big this task is," "package this project up for release." Typing the same multi-paragraph instructions every time is tedious, and worse, it invites drift — you phrase it slightly differently each time and get slightly different results.

## The idea

A slash command packages a repeatable workflow into a single reusable trigger — typically a short name prefixed with `/`, like `/estimate` or `/publish`. Behind that one word sits the full set of steps: what to check, what order to do things in, what output format to produce, what to flag if something's off.

Once defined, invoking the workflow becomes a one-line command instead of a re-typed essay, and — just as importantly — it's *consistent*. The same command produces the same kind of process every time, which matters for anything you rely on repeatedly (like a pre-publish checklist you don't want to accidentally skip a step of).

## Why this matters

- **Consistency over repetition.** A workflow you use often should behave the same way every time, not depend on how well you happened to phrase the instructions that day.
- **Lower friction for good habits.** If running a proper checklist takes one word instead of five minutes of typing, you're more likely to actually run it.
- **Discoverable and shareable.** A library of named commands is easier to hand to someone else (or your future self) than a scattered memory of "the way I usually ask for this."

## Adapting this yourself

Look for instructions you find yourself typing more than twice in roughly the same shape — those are candidates for a named command. Write the steps down once, give it a short memorable name, and reuse it instead of re-deriving the instructions from scratch each time.
