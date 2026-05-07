---
layout: post
type: blog
title: "From Notebooks to Pipelines: Why I Stopped Shipping Jupyter"
subtitle: "Notebooks are great. They're also a trap."
date: 2026-02-14
project-date: 2026-02-14
description: "A pragmatic argument for treating notebooks as the experiment, not the deliverable — and what to reach for instead."
category: writing
tags: [MLOps, Notebooks, ML Pipelines, MLflow, Python]
---

There's a moment in every ML project where someone says "we'll just productionise
the notebook." It's the same moment, every time, that the project quietly stops
making progress.

This post is about why notebooks fail in production, and what to reach for
instead. I'm not against notebooks — I write them every day for exploration.
The argument is narrower: **notebooks should not be the deliverable**.

### Where notebooks earn their keep

The strengths are real:

- Inline plots, side-by-side with code, with the data from the last run still in
  scope. Iteration speed is genuinely high.
- Markdown cells let you narrate as you build. Excellent for analysis reports.
- The kernel-based execution model means you can poke at intermediate state
  without rerunning everything.

For exploration, model debugging, one-off analyses, and teaching, this
is the right tool. I'd lose nothing by saying so.

### Where they fail

The failures all come from the same root cause: **a notebook's runtime
behaviour is decoupled from its source**. Cell execution order isn't tracked
by the file. Out-of-band state lives in the kernel between runs. Hidden
imports survive across cells. Variables get reused with new meanings halfway
down. The file you commit isn't the program that ran.

This makes them fragile in ways that don't matter for exploration but become
intolerable for production:

1. **Reproducibility evaporates silently.** "Re-run all cells" produces a
   different result than the run you remember, and you can't always tell why.
2. **Diffs are useless.** A cell-output change rewrites half the JSON. Code
   review becomes pattern-matching against noise.
3. **Testing is awkward.** You can shoehorn `pytest` against notebook
   functions with `nbval` or extract them into modules and import — but at that
   point you've already started the migration.
4. **Dependencies are vague.** `pip install` lines in cells, often without
   versions. The notebook works on the author's laptop and nowhere else.
5. **Side effects everywhere.** `plt.show()`, `pd.read_csv("/local/path")`,
   API calls, file writes — all interleaved with computation.

You *can* run notebooks in production with Papermill or as ETL nodes in
Dagster. People do. It works. It also obscures the structure of what's
actually happening, and the day a senior engineer joins they're going to ask
why this is still a notebook.

### What replaces them

A small, opinionated stack — boring on purpose:

- **A feature pipeline.** A plain Python module (or DBT model, or Airflow
  task — whatever you have) that produces the training set. Versioned. Tested.
  Outputs land in a known place with a known schema.
- **A training script.** `python train.py --config config.yaml` produces a
  model artefact and writes metrics, parameters, and the artefact to a
  registry (MLflow, Weights & Biases, plain Postgres + S3 — the registry
  matters, not the brand).
- **A serving layer.** A small web service (FastAPI, Cloudflare Workers,
  whatever) that loads a specific model version by ID and exposes
  inference endpoints.
- **A monitoring loop.** Inputs and outputs logged with their model
  version. Drift checks against a recent baseline. Alerts when something
  meaningfully changes.

None of this is novel. The point is that each piece is **a normal program**
that runs end-to-end, deterministically, with a defined input and output.
You can read it, test it, diff it, deploy it, and on-call rotate around it
without anyone needing to remember the order to run cells in.

### MLflow specifically

MLflow gets a lot of grief for being clunky, and the criticism is fair. But
the discipline it imposes is genuine: every training run records its
parameters, metrics, environment, and artefacts against a stable run ID.
Compare that to a notebook where the only record of the run that produced a
model is "the most recent kernel before someone restarted it."

I treat MLflow as a logbook, not an experiment management system. The
experiment-management features are fine; the logbook discipline is what
actually changes how the team works.

### CI/CD for ML

The right ambition for most teams isn't a Kubeflow-shaped MLOps platform.
It's a CI pipeline that:

- Runs unit tests on the feature pipeline.
- Runs a small smoke training run end-to-end on a tiny dataset.
- Diffs evaluation metrics against the last known-good run.
- Refuses to merge if metrics regress beyond a tolerance.

That's a couple of hundred lines of GitHub Actions YAML. It catches the
overwhelming majority of regressions. You can add the fancier infrastructure
later if you find yourself genuinely needing it.

### When the notebook is the right answer

I want to be careful not to overclaim. Notebooks remain the right tool for:

- Quick analyses where the artefact is the report, not a system.
- Model debugging when you need cell-level state.
- Teaching and demos.
- Anything where the output is "a chart and a paragraph for a Slack thread".

The mistake is conflating "I built it in a notebook" with "this is how it
should run". The right move is to use a notebook to figure out what to build,
then take the parts that worked and put them in scripts and tests.

### The smallest version of this

If your team is currently shipping notebooks, the cheapest first move is:

1. Pick the parts that produce the model artefact.
2. Move them into a `train.py` that takes a config file.
3. Have it write the artefact to a registry with a real version.
4. Make `python train.py --config configs/v1.yaml` reproducible.

Steps 1–4 take a few days for most projects. The whole rest of the MLOps
journey gets a lot cheaper afterwards because there's something concrete to
deploy, monitor, and replace.

Notebooks for figuring out *what*. Pipelines for shipping it.
