# Vue basics

## What it is

Vue is a JavaScript framework for building user interfaces. The core idea is **declarative, state-driven rendering**: instead of manually writing code that pushes and pulls DOM changes ("when this button is clicked, find this element and change its text"), you describe what the page should look like *for a given piece of state*, and Vue handles updating the actual DOM whenever that state changes.

## The core concepts

- **Components** — self-contained, reusable pieces of UI (a button, a card, a whole page section), each bundling its own template (markup), logic, and styling.
- **Reactivity** — when a piece of data a component depends on changes, Vue automatically re-renders the parts of the UI that depend on it, without you manually tracking what needs to update.
- **Templates** — HTML-like syntax (with some added directives) for describing what a component renders, which keeps markup close to plain HTML and easier to read than pure JavaScript-generated markup.
- **Single-file components** — `.vue` files that bundle a component's template, script, and scoped styles together in one file, which keeps related code physically close together.

## Why it's known for a gentle learning curve

- Vue's templates look close to plain HTML, so there's less new syntax to learn upfront compared to some alternatives.
- **Incremental adoption** is a real, supported use case: you can add Vue to a portion of an existing page (a single interactive widget, say) without rebuilding the entire site around it — you don't have to go all-in from day one.
- Good official documentation and a relatively small conceptual core (component, template, reactive state) make the initial path to "I built something that works" short.

## When you'd reach for it

Vue is a good fit any time a page needs meaningful interactivity — state that changes and a UI that needs to stay in sync with it — beyond what plain HTML/CSS/vanilla JavaScript comfortably handles by hand. For a fully static page with no dynamic behavior, a framework like Vue is unnecessary overhead; its value shows up once you're managing non-trivial UI state.
