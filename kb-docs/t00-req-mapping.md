# Mapping requests before answering them

## The problem it solves

Real requests to an AI assistant are rarely one clean question. They're often several things at once — a correction, two new asks, a tangent, a piece of pasted context — typed in one go, in whatever order they came to mind. Answered naively, an assistant tends to grab the most obvious part and quietly drop the rest. The person doesn't always notice something was skipped until much later, if ever.

## The idea

Before answering, restate the incoming request as a numbered list of distinct points, each one tagged back to which part of the original text it came from. Only after that mapping exists does the actual answering happen — one response per numbered point, in the same order.

This isn't paraphrasing for style. It's a structural checkpoint: turning "a paragraph of mixed asks" into "N discrete, individually-answerable items" before committing to an answer, so nothing rides along silently unaddressed.

## What it looks like in practice

1. Read the whole incoming message first, without responding.
2. Split it into numbered points — corrections, new requests, questions, confirmations — however many there actually are, not a fixed number.
3. For each point, answer it explicitly, referencing which numbered point it's responding to.
4. If a point turns out to need more input before it can be answered, say so explicitly as its own numbered item — don't just omit it.

## Why this matters — this is also how to talk to an AI assistant well

The pattern isn't only about how the assistant should respond — it's a two-way habit. On the human side, the practical version is: when a request has multiple parts, it helps to actually separate them (numbered list, blank lines between distinct asks, or just pausing to say "one more thing") rather than burying five different asks in one dense paragraph. The clearer the seams between distinct points are on the way in, the less likely any one of them is to get lost on the way out.

This matters most exactly when it's easiest to get wrong: long sessions, messages that mix a correction with new work, or answers that arrive in several batches (background agents, multi-part replies) where "did every part actually get addressed" stops being obvious at a glance.

## Where it fits with the rest of T00

This is the discipline underneath T00's req/reply protocol: the persistent log makes requests and answers durable, and mapping is what keeps a single dense entry in that log from silently losing pieces before it's ever answered.
