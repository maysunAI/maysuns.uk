# AI agent permissions, explained

## The problem it solves

Once an AI agent can actually take actions — edit files, run shell commands, call external APIs, spend money, send messages — instead of only producing text for a human to read and act on, a real software-safety question follows: which of those actions should it be allowed to take on its own, and which should require a human to explicitly approve first?

Get this wrong in one direction, and the agent is dangerous — silently making destructive or hard-to-reverse changes. Get it wrong in the other direction, and the agent is nearly useless — asking for approval on every trivial step, which defeats the point of automating anything.

## The general approach: scope by risk

Sensible permission models don't treat all actions equally. They typically scope permissions along a few axes:

- **Reversibility.** A read-only action (viewing a file, querying data) is low-risk because nothing changes. A destructive action (deleting data, force-pushing over history, sending an irreversible payment) is high-risk specifically because it's hard or impossible to undo.
- **Blast radius.** An action scoped to a sandbox or a single test file is safer than the same *kind* of action run against production data or a live system.
- **Default posture.** A well-designed agent defaults to asking rather than assuming for anything in the "hard to reverse" category, and only acts autonomously within a pre-approved, narrower scope.
- **Auditability.** Keeping a record of what actions were actually taken (not just planned) makes it possible to review after the fact, which matters both for catching mistakes and for building trust in the system over time.

## Why this is a real, general topic — not just an AI thing

This is the same underlying problem that's existed in software for decades — least-privilege access control, staged rollouts, approval gates for production deploys — just applied to a new kind of actor. The core discipline (scope permissions by risk, default to caution on irreversible actions, keep a record) transfers directly.

## Why it matters more as agents get more capable

As AI agents are trusted with more autonomy — running longer unsupervised, chaining more actions together, operating across more systems — the cost of getting permission scoping wrong grows with it. It's a topic worth taking seriously from the start of building any agentic system, not bolting on after something goes wrong.
