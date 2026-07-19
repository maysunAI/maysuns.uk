# Playwright, and browser automation via MCP

## What Playwright is

Playwright is an open-source browser automation and testing framework (originally built by Microsoft) that can drive real browsers — Chromium, Firefox, WebKit — programmatically. It can navigate to pages, click elements, fill in forms, wait for content to load, take screenshots, and read the browser's console output, all the way a human user would interact with a page, but scripted.

It's widely used for automated end-to-end testing: instead of a human clicking through a web app to check that a feature still works after a change, a Playwright script does it, reliably and repeatably, and can be run automatically on every code change.

## What it means to expose it to an AI agent via MCP

Normally an AI agent that helps write code can't actually *see* whether the page it just built or modified renders correctly — it can read the code, but not observe the result the way a person looking at a browser window can. Exposing Playwright to an AI agent through MCP (see the MCP article) closes that gap: the agent can open a real browser, navigate to the page, take a screenshot, check the console for errors, and verify the actual rendered result — rather than only trusting that the code compiled or matches expected syntax.

## Why this matters

- **Verification instead of assumption.** "The code looks right" and "the page actually renders correctly with zero console errors" are different claims. Browser automation lets an agent check the second one directly.
- **Catches visual and runtime issues code review can't.** A CSS layout bug, a broken image path, a JavaScript error that only fires on page load — these are much easier to catch by actually loading the page than by reading source code.
- **Enables a real verify-before-reporting-done workflow.** An agent that can take its own screenshots and read its own console output can catch its own mistakes before telling a human "this is done," rather than the human being the first one to discover something's broken.
