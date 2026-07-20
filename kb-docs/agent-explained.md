# AI Agents, explained

## The problem it solves

A plain chatbot answers one question at a time: you ask, it replies, the conversation ends there. Many real tasks aren't single-question-single-answer — "fix this bug," "research this topic and write a summary," "reorganize these files" — they need several steps, decisions about what to do next based on what just happened, and the ability to actually act (not just describe what someone else should do).

## What it is

An AI agent is a model that can plan a sequence of steps, use tools to take real actions (read/write files, run commands, call APIs, browse the web), observe the results of those actions, and decide what to do next — repeating that loop until the task is done, largely without a human approving every single step.

The core loop is usually: **observe → decide → act → observe the result → decide again.** What separates an agent from a plain chatbot is that last part: it doesn't just produce an answer, it takes an action, sees what happened, and adjusts.

## What makes something "agentic"

Not every AI feature is an agent. A useful test: does it only produce text for a human to act on, or does it decide and act on its own across multiple steps?

- **Not agentic**: "Summarize this document" — one input, one output, no ongoing decisions.
- **Agentic**: "Get this test suite passing" — the model has to run the tests, read the failure, decide what to change, edit code, run the tests again, and repeat until done.

## Why this matters

- **More can be delegated.** Multi-step, open-ended tasks that used to require a human at every decision point can be handed off, with the human reviewing the outcome instead of micromanaging each step.
- **Tool use is what makes it real.** An agent is only as capable as the tools it can call — file access, code execution, search, browser control. The reasoning matters, but without real tools it's still just talk.
- **Autonomy needs guardrails.** Because an agent acts without approving every step, how much it's allowed to do unsupervised becomes an actual safety question — see permissions/trust-level conventions for how that gets managed in practice.
