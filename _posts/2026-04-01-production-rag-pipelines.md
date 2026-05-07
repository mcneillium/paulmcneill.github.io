---
layout: post
type: blog
title: "Building Production RAG Pipelines: Lessons from Real Deployments"
subtitle: "What actually breaks once you leave the demo notebook."
date: 2026-04-01
project-date: 2026-04-01
description: "Notes from shipping retrieval-augmented generation in production — chunking that doesn't shred meaning, retrieval that keeps citations, and evaluation harnesses that catch regressions before users do."
category: writing
tags: [RAG, LLMs, Retrieval, Evaluation, Production ML]
---

A weekend RAG demo is one thing. A *production* RAG pipeline is a different
animal entirely — and the cost is mostly in the parts you can't see in a
notebook. This post collects the patterns I've found genuinely matter, in
roughly the order they bite you.

### Chunking is product design, not preprocessing

The default tutorial chunker — fixed-size sliding window with some overlap —
gets you to a demo. It also routinely shreds meaning. Sentences get split
mid-clause. Tables turn into nonsense. The bullet point that gives a
paragraph its meaning lands in a different chunk to the paragraph itself.

Three rules that survived contact with real corpora:

1. **Respect document structure.** Use the document's own boundaries — headings,
   list items, table rows — as candidate split points, not arbitrary character
   counts. For PDFs, this means a real layout-aware parser (`unstructured`,
   PyMuPDF with logical-block extraction, or AWS Textract for tables) rather
   than naive text dumps.
2. **Vary chunk size to fit the question.** Small chunks (~200 tokens) maximise
   retrieval precision but lose context. Large chunks (~1k tokens) preserve
   context but make embedding less discriminative. I've ended up with a
   two-stage retrieval pattern: small chunks for finding *where*, then expand
   to the parent section before passing to the model.
3. **Store the spelling, the slug, and the source.** Every chunk needs a
   stable identifier and a path back to the original document, with page or
   anchor offsets. Without this, you can't render citations and you can't
   debug a hallucination.

### Retrieval needs evaluation, not vibes

"It looks like the right chunks come back for these five test queries" is not
an evaluation. It's a vibe. The first time you change embedding models, prompt
versions, or chunk strategy, you'll discover three things that silently
regressed and one user already complained about.

The cheapest reliable harness:

- **A labelled query set.** 50–100 queries each tagged with the chunks (or
  source URLs) that should be retrieved. You build this by mining real user
  queries and annotating by hand. Yes, by hand. There is no shortcut.
- **Metrics worth tracking.** Recall@k for "did we get the right chunks at
  all", MRR for "how high did the right chunk land", and a separate end-to-end
  faithfulness score against the final model answer. They tell you different
  things.
- **A nightly run.** Cheap, fast, and the only way to catch the silent
  regressions that come from a routine dependency bump.

### Hybrid search beats pure vector search nearly every time

Pure semantic search is brilliant at "find me the part of the manual that
says how to reset the device" and terrible at "find the entry mentioning
order #248-A". For anything with proper nouns, codes, dates, or exact strings,
BM25 still wins.

The cheap, robust default is BM25 + dense retrieval running in parallel,
score-normalised, then reranked. Postgres with `pgvector` and the `tsvector`
extension does both well enough for most projects without bringing in a
dedicated vector DB.

### Reranking is the highest-leverage line of code you'll add

If you're doing RAG without a cross-encoder reranker, you're leaving 5–15
points of recall@k on the table. The pattern is simple: retrieve the top 50
candidates from your initial search, then rerank those 50 with a small
cross-encoder (`bge-reranker-base`, Cohere Rerank, or your own fine-tuned
model). The cross-encoder has access to both the query and the candidate
chunk in the same forward pass — semantically far richer than any embedding
similarity.

### The system prompt is part of the dataset

A system prompt that drifts is a silent regression. I treat the system
prompt as versioned data: it lives in source control, has tests, and any
change ships through the same eval harness as a model swap. The temptation
to "just nudge the prompt to fix that one weird response" is exactly the
wrong instinct — it almost always regresses something else.

### Hallucination mitigation is a stack, not a setting

Single-shot answers from "the model" cannot be made reliable. What works,
in roughly increasing cost:

1. **Forced citation.** The model must include exact-string quotes from
   retrieved chunks. Post-process to verify the quote actually appears in
   the source. Reject answers that fail.
2. **Self-consistency check.** Run the same prompt twice with non-zero
   temperature. If the answers diverge in factual content (use a small
   classifier or another model call), flag for review.
3. **Confidence-aware refusal.** Train or prompt the model to say "I don't
   know" when retrieval returned nothing relevant. Then *test* that the
   refusal actually fires by asking questions whose answers aren't in your
   corpus.

### Observability beats tuning

Once you have any serious traffic, the most useful thing you can build is
not a better model but better visibility. For each query, log: the user
query, the top-k retrieved chunks (with similarity scores), the final
prompt, the response, and any tools the model called. A week of this data
will answer more questions than a month of tweaking.

### What I'd build next time, in order

1. The smallest end-to-end pipeline that returns *something* for every
   query. No reranker, no fancy chunker. Just to wire up the eval.
2. The eval harness. Don't even ship to users yet.
3. Hybrid retrieval + reranker.
4. Citation enforcement.
5. Production observability.
6. *Then* think about chunking strategy, embedding models, and prompts.

Most teams build these in the reverse order, and most teams ship slow,
unreliable RAG as a result. The ordering matters.
