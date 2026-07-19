# The req/reply communication protocol

## The problem it solves

Long AI-assisted work sessions — spanning hours, days, or multiple projects running in parallel — have a context problem: substantive answers get typed into a chat window, scroll away, and become nearly impossible to find again later. If you ask "what did we decide about X three days ago," the honest answer is usually "somewhere in the scrollback, good luck."

The req/reply protocol is a simple fix: separate the *terminal* from the *record*.

## How it works

1. **Requests go into a persistent log.** Questions, instructions, and pasted material (including command-line output worth keeping) get written into a running request file rather than only spoken into a chat prompt that will scroll away.
2. **Substantive answers go into a persistent reply log**, not just the terminal. Every real answer — a decision, an explanation, a piece of generated content — gets written to a reply file in a consistent, searchable format.
3. **The terminal itself stays terse.** Instead of repeating the full answer in the chat window, the assistant gives a short confirmation ("Reply updated, section N") and points at the log. This keeps the live conversation readable while the actual content lives somewhere durable.
4. **Every reply block traces back to its source.** A reply notes which lines of the request it's answering, so months later it's still possible to reconstruct "why did we do it this way" without guessing.
5. **Append-only.** Old entries in the log are never rewritten or deleted in place — new context gets appended as a new dated block. This preserves an honest history instead of a doctored one.

## Why this matters

- **Searchability.** A decision made weeks ago is one search away instead of buried in chat history that may not even be retained by the tool you used.
- **Context survival.** Sessions can be picked back up cold — by the same person, or a fresh AI session — without re-explaining everything from scratch.
- **Accountability.** Because the log is append-only and dated, it functions as an audit trail of what was asked, what was answered, and when.
- **Low terminal noise.** Keeping the live chat terse means you're not scrolling past paragraphs of repeated content to find the next actionable line.

## Adapting this yourself

You don't need any special tooling to try this — a plain text file (or a couple of them: one for incoming requests, one for outgoing answers) is enough. The core discipline is just: write it down somewhere durable, keep the live conversation short, and never silently overwrite what you wrote before.
