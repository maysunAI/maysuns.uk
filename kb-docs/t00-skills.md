# Skills: on-demand instruction sets

## The problem it solves

An AI assistant capable of many things — writing marketing copy, reviewing security, formatting a resume, driving a browser for testing — faces a tension: if every one of those capabilities' full instructions is loaded into every conversation "just in case," the assistant is carrying a lot of dead weight most of the time, and the sheer volume of instructions can crowd out attention on the actual task at hand.

## The idea

A "skill" is a packaged, self-contained set of instructions for a specific workflow, tool, or domain — that the assistant loads **only when it's actually relevant** to the task in front of it, rather than by default in every conversation. A skill for "reviewing a pull request" doesn't need to be loaded while you're asking about a completely unrelated topic; it gets pulled in specifically when that kind of task comes up.

This is conceptually similar to lazy-loading in software: you don't import every library at startup, you load a module when the code path that needs it actually runs.

## Why this matters

- **Keeps day-to-day interactions lighter.** Most conversations don't need most capabilities. Loading only what's relevant keeps things efficient.
- **Lets specialized depth exist without a cost to everything else.** A skill can be as detailed and specific as it needs to be — long checklists, domain jargon, edge cases — without that detail bloating unrelated conversations.
- **Scales better as capability grows.** Adding a hundredth specialized skill doesn't make the first conversation of the day any slower, because most of them never get loaded unless needed.

## Adapting this yourself

If you find yourself maintaining a large, growing set of "how to do X" instructions for an AI assistant, consider splitting them into separate, well-labeled packages rather than one ever-growing master prompt — and load each one only when its specific kind of task actually comes up.
