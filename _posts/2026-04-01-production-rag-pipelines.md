---
layout: post
type: blog
title: "Building Production RAG Pipelines: Lessons from Real Deployments"
subtitle: "What actually breaks once you leave the demo notebook."
date: 2026-04-01
project-date: 2026-04-01
description: "Notes from shipping retrieval-augmented generation in production — chunking that doesn't shred meaning, retrieval that keeps citations, and evaluation harnesses that catch regressions before users do."
category: writing
---

<!-- TODO: REPLACE — placeholder body. Flesh out with real war stories. -->

A demo RAG pipeline takes a weekend. A *production* one takes months — and most of
the cost is in the parts you can't see in a notebook: drift detection, eval suites,
caching strategy, and what happens when retrieval gets it wrong in front of a user.

### Chunking is not preprocessing — it's product design

Most RAG fails because the chunking strategy was treated as a one-line decision...

### Retrieval without grounding is just search

If your model can't cite the chunk it pulled from, you can't debug a hallucination...

### The eval harness is the real codebase

Models change. Prompts change. Embeddings change. Without an automated regression
suite you'll ship silently broken retrieval and never know...
