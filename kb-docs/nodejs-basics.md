# Node.js basics

## What it is

Node.js is a JavaScript runtime that lets JavaScript code run outside a web browser — on a server, in a command-line tool, anywhere you need a program to run. Before Node.js, JavaScript was effectively browser-only; Node.js took the same language and made it a general-purpose tool for writing servers, scripts, and backend applications.

It's built on Chrome's V8 engine (the same JavaScript engine that powers the Chrome browser) and is designed around **non-blocking, event-driven I/O** — meaning a Node.js program doesn't sit idle waiting for a slow operation (a network request, a file read, a database query) to finish before moving on; it registers a callback for when the result is ready and keeps handling other work in the meantime.

## Why the non-blocking model matters

A lot of real-world server work is *waiting* — waiting for a database to respond, waiting for another API to answer, waiting for a file to finish reading. A traditional blocking model handles this by spinning up a new thread per waiting task, which gets expensive at scale. Node's event-driven model handles many concurrent waiting operations on a single thread efficiently, which is part of why it became a popular choice for APIs, real-time applications (chat, live updates), and I/O-heavy backend services.

## What you'd use it for

- **APIs and backend servers** — Node.js (often with a framework like Express) is one of the most common ways to build a JSON API or web backend in JavaScript.
- **Command-line tools** — many developer tools (build systems, linters, package managers) are themselves written in Node.js.
- **Full-stack JavaScript** — using the same language on both the frontend (e.g. Vue, React) and the backend (Node.js) means less context-switching and lets some code (validation logic, data types) be shared between the two.

## The ecosystem: npm

Node.js ships with **npm** (Node Package Manager), giving access to a huge public registry of reusable packages — meaning most common problems (parsing dates, making HTTP requests, building a web server) already have a well-tested library available rather than needing to be solved from scratch.
