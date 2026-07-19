# MCP (Model Context Protocol), explained

## The problem it solves

AI models are increasingly useful when they can do more than talk — read a file, query a database, call an API, control a browser. But without a shared standard, every application that wants to connect a model to a tool has to build a custom, one-off integration: a different plug for every combination of model and tool. That doesn't scale — N models times M tools means N×M custom integrations.

## What it is

MCP (Model Context Protocol) is an open standard for connecting AI models to external tools and data sources through a common protocol. A tool or data source implements one MCP-compatible interface ("server"), and any MCP-compatible AI application ("client") can connect to it — without a bespoke integration for that specific pairing.

A useful analogy: **USB for hardware.** Before a common standard, every peripheral needed its own proprietary connector. USB meant a device just needed to speak USB once, and it worked with any USB-compatible host. MCP aims to do the same thing for AI-to-tool connections — write the integration once, and it works with any MCP-compatible AI application, not just one.

## What it standardizes

Roughly, MCP defines a common way for:

- A tool/data source to describe what it offers (what actions are available, what data can be read)
- An AI application to discover and call those capabilities in a consistent format
- Structured results to flow back to the model in a predictable shape

## Why it matters

- **Fewer one-off integrations.** A database, a file system, a browser automation tool, or an internal company API can each expose one MCP server and be usable from any MCP-compatible AI client, instead of needing bespoke glue code per application.
- **Composability.** Because the interface is standardized, an AI application can connect to many MCP servers at once — file access, a search tool, a browser — and treat them uniformly rather than juggling different calling conventions for each.
- **Faster ecosystem growth.** Tool builders can build once and reach every MCP-compatible AI application, rather than needing a separate integration effort per platform.
