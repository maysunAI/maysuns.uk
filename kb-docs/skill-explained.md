# Skills (on-demand instruction sets), explained

## The problem it solves

An AI agent can potentially help with dozens of specialized tasks — deploying to a specific cloud provider, following a company's code review checklist, formatting a particular kind of report. If every one of those specialized instructions had to be loaded into every conversation "just in case," the model would be carrying a huge amount of irrelevant context most of the time, making it slower and less focused.

## What it is

A skill is a packaged, specialized instruction set — a description of how to do a particular job — that an AI agent loads only when it's actually relevant to the task at hand, instead of every conversation carrying the full weight of every capability it might ever need.

Practically, a skill is usually a short description of *when* to use it (so the agent knows to reach for it) plus the detailed instructions for *how* to do it (loaded only once it's needed).

## How it's different from a slash command

The two are related but not identical: a slash command is triggered explicitly by a person typing something like `/deploy`. A skill is typically triggered implicitly — the agent recognizes from context that a task matches a skill's description and loads it on its own, without being told the exact trigger word.

## Why this matters

- **Keeps everyday interactions lightweight.** Most conversations don't need most skills; not loading them by default keeps responses faster and more focused.
- **Scales to a lot of specialized knowledge.** A library of dozens of skills can exist without every single one weighing down every conversation — only the relevant ones get pulled in.
- **Encourages reusable, well-documented expertise.** Writing a skill forces the specialized knowledge to be written down once, clearly, instead of re-explained from scratch each time it's needed.
