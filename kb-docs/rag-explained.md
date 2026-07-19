# RAG (Retrieval-Augmented Generation), explained

## What it is

RAG pairs a language model with a search step. Instead of answering purely from what it memorized during training, a RAG system:

1. Takes your question and searches a knowledge base for relevant material — typically using **embeddings** (numerical representations of text meaning) compared via vector similarity search, so it finds chunks that are semantically related to the question, not just ones that share exact keywords.
2. Retrieves the most relevant chunks of text.
3. Feeds those chunks to the language model *along with* your original question, so the model's answer is generated with that real source material in front of it, not just from memory.

## Why it exists

Language models have two structural limitations RAG addresses directly:

- **They don't know what they weren't trained on.** Private documents, internal company knowledge, anything published after the training cutoff, or narrow domains with sparse training data — the model simply has no reliable information about these unless it's given the material directly.
- **Retraining a model to add knowledge is expensive and slow.** You don't want to retrain a multi-billion-parameter model every time a document changes. RAG sidesteps this entirely: update the knowledge base, and the next query already reflects the change — no retraining required.

## What "grounded" answers means in practice

Because the model is answering with actual retrieved text in front of it, RAG systems can often cite *which* source chunk an answer came from — turning "trust me" into "here's the passage this came from, go check it." This matters a lot for reducing hallucination on factual questions: the model isn't inventing an answer from a vague memory of training data, it's summarizing or reasoning over text it was just handed.

## Where it fits

RAG is the standard approach for:

- Chat-with-your-documents tools (internal wikis, PDFs, codebases)
- Customer support bots that need to answer from a specific product's docs
- Any application where accuracy against a *specific, changing* body of knowledge matters more than general-purpose fluency

It's not a universal upgrade, though — for tasks that don't depend on external knowledge (creative writing, general reasoning, code generation from a spec you've already provided), RAG adds retrieval overhead without much benefit.
