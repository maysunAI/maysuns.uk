# Python basics

## What it is

Python is a general-purpose programming language known for readable, close-to-plain-English syntax and a very large ecosystem of libraries. It's commonly recommended as a first programming language because the syntax gets out of the way of learning the underlying concepts, and it scales up to serious production use — it's not just a beginner's language.

## Why it's readable

Python uses indentation itself to define code structure (rather than braces or explicit block markers), and favors a small set of clear, consistent constructs. The result is code that tends to read close to the logic it expresses, which lowers the barrier both to writing it and to someone else (or an AI assistant) understanding it later.

## What it trades off

Python is an interpreted, dynamically-typed language, which generally means slower raw execution than compiled, statically-typed languages (like C++ or Rust). In practice this rarely matters for most applications — and where raw speed genuinely matters, Python code commonly calls out to fast, compiled libraries underneath (this is exactly how most numerical/ML Python code works) rather than doing the heavy lifting in pure Python itself.

## Where it's the default choice

- **Data work** — libraries for data manipulation, analysis, and visualization are mature and extremely widely used.
- **Machine learning / AI** — most of the major ML frameworks expose Python as their primary interface, making it the default language for training and working with models.
- **Scripting and automation** — quick, one-off scripts (rename these files, scrape this data, automate this repetitive task) are one of Python's strongest everyday use cases.
- **Web backends** — frameworks like Flask and FastAPI (see the companion article) make Python a common choice for APIs and web backends too.

## The ecosystem: pip

Python's package manager, **pip**, gives access to the Python Package Index (PyPI) — an enormous public library of reusable packages, meaning most common problems already have a well-established solution available rather than needing to be built from scratch.
