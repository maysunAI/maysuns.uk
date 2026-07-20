# LLMs (Large Language Models), explained

## What it is

A large language model is a neural network trained on huge amounts of text to predict what comes next in a sequence of words. That sounds simple, but doing it well at scale — across billions of examples of real writing, code, and conversation — is what makes it able to write, reason through problems, answer questions, and hold a conversation, even though at its core it's still doing next-word prediction.

## How it actually works, at a high level

- **Tokens, not words.** Text is broken into chunks called tokens (often pieces of words). The model works with numbers, not letters — each token maps to a number, and the model predicts the most likely next token, one at a time.
- **Training.** The model reads enormous amounts of text and adjusts billions of internal parameters so its predictions get closer to what actually comes next in real text. This happens once, in advance — this is why every model has a "knowledge cutoff" date.
- **Inference.** When you actually chat with it, the model isn't learning anymore — it's just running that trained prediction process, one token at a time, using everything in the current conversation (the "context window") to decide what's likely to come next.

## Why it can do so much with "just" next-word prediction

Predicting text well turns out to require the model to implicitly capture a lot: grammar, facts, reasoning patterns, coding conventions, tone. None of that was hand-programmed — it emerged from being trained to predict text accurately across a huge and varied dataset.

## Important limits worth knowing

- **Knowledge cutoff.** The model only "knows" what was in its training data up to a certain date — it doesn't know about anything after that unless it's given the information directly (e.g. via a tool like web search, or text pasted into the conversation).
- **It predicts plausible text, not verified truth.** A confident-sounding, fluent answer isn't the same as a correct one — this is the root cause of "hallucination," where the model states something false with the same fluency as something true.
- **Context window is finite.** There's a limit to how much text (conversation history, documents, code) the model can consider at once; anything outside that window isn't visible to it in that turn.
