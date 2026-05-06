---
layout: post
type: blog
title: "Why I Moved from Jupyter Notebooks to End-to-End ML Pipelines"
subtitle: "Notebooks are great. They're also a trap."
date: 2026-02-14
project-date: 2026-02-14
description: "A pragmatic argument for treating notebooks as the experiment, not the deliverable — and what to reach for instead."
category: writing
---

<!-- TODO: REPLACE — placeholder body. -->

Notebooks are wonderful for **exploration**. They are a disaster for **deployment**.
This post is about the moment that distinction stopped being theoretical for me, and
what I changed in my workflow as a result...

### The hidden cost of "it runs in my notebook"

State that lives only in cell outputs. Cell-execution order that nobody else can
reproduce. Imports six layers deep that nobody documents...

### What replaces them

A small, opinionated stack: a feature pipeline, a training script, a model registry,
and a serving layer. Boring. Reliable. Reviewable.
