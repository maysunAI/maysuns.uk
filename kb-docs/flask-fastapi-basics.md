# Flask & FastAPI basics

## What they are

Flask and FastAPI are both lightweight Python web frameworks used to build APIs and web backends. Both let you define routes (URLs) and what happens when a request hits them, without the overhead of a large, all-in-one full-stack framework — but they're built around different design philosophies.

## Flask

Flask is deliberately minimal and unopinionated. It gives you a small core — routing, request/response handling — and leaves almost everything else (database access, authentication, validation) up to you to add via extensions or your own code as needed. This makes Flask flexible and easy to reason about: there isn't much "magic" happening behind the scenes, which is part of why it's a popular choice for smaller services, prototypes, and projects where you want full control over the stack.

## FastAPI

FastAPI is a newer framework built around a few specific ideas:

- **Python type hints as the source of truth.** You declare what shape your request/response data should be using standard Python type annotations, and FastAPI uses those declarations to validate incoming data automatically and generate documentation from them.
- **Automatic interactive API docs.** FastAPI generates a browsable, interactive API documentation page (via the OpenAPI standard) directly from your code, with no separate documentation-writing step required.
- **Async support built in from the start.** FastAPI is designed around Python's `async`/`await` syntax, making it a natural fit for APIs that need to handle a lot of concurrent I/O-bound work (waiting on databases, external APIs) efficiently.

## Choosing between them

- **Flask** is a good fit when you want maximum simplicity and control, or you're building something small where FastAPI's extra structure isn't needed.
- **FastAPI** is a good fit when you're building a "real" API that benefits from automatic validation, auto-generated docs, and async performance out of the box — which is why it's become a common default for new Python API projects, especially ones that need to be consumed by other services or a frontend team that wants clear API documentation.

Both remain far lighter-weight than a large full-stack framework, and both are common choices specifically *because* they let you add only the pieces your project actually needs.
