---
layout: post
title: "McNeillium_AI: A Checked Video Pipeline"
subtitle: "Claude writes, ElevenLabs narrates, Python and FFmpeg assemble, and nothing ships until every fact is traced and every clip is transcribed"
modal-id: project-video-pipeline
alt: "Diagram of the McNeillium_AI video pipeline"
architecture: video-pipeline
project-date: 2026-05-11
category: projects
client: Personal project
permalink: /projects/mcneillium-ai-video-pipeline/
description: "A Python pipeline that turns a topic into a narrated, captioned video, with automated audio and speech-to-text checks. Used to make six explainers."
impact: "Six fact-checked explainers of my own work, built end to end"
github-url: https://github.com/mcneillium/McNeillium_AI
youtube-url:
---

### Overview
McNeillium_AI started in May 2026 as an experiment: how much of making a short explainer video can be automated without losing control of what it says? It grew into a pipeline of about 24,000 lines of Python with 43 defined roles, from trend research and scriptwriting to sound design and quality review, which Claude takes on in turn under rules I set.

Its most useful output so far is a series of six short explainers of my own work, filmed from this site.

---

### How it works
1. **Research and script.** A researcher role scores candidate topics; Claude writes a structured script with segments, narration and shots; a reviewer role checks it against a checklist.
2. **Narration.** Each segment is voiced separately (ElevenLabs, or Edge TTS for drafts), then checked automatically for audio quality and loudness.
3. **Visuals.** Shots are screenshots of real pages taken with Playwright, images from open libraries, icons and generated diagrams, chosen by a "visual director" step.
4. **Assembly.** FFmpeg renders each scene, joins them, times captions to the speech word by word and burns them in, and makes a thumbnail.
5. **Packaging.** An SRT caption file, YouTube metadata and a private upload. A cost governor refuses paid API calls once a daily or monthly spending limit is reached.

---

### The explainer series
Six videos of 1 to 2 minutes each: Voice, the river study, the drug-response study, six rules for checkable research, the portfolio's narration and voice assistant, and the Lab demos. The rules for this series are stricter than for anything else the pipeline makes:
- Every fact must come from this site or a public repository. Research videos say the work has not been peer reviewed.
- The narrator is an AI voice, speaks in the third person, and every description says it is not my voice.
- Each clip is transcribed with Whisper and compared with its script, and the frames are reviewed, before packaging.
- Uploads are private first; I watch each one before anything is published.

Checking caught two errors before recording: a figure from the drug study quoted for the wrong drug, and a river experiment described as re-run when it had not been yet.

All six are below, hosted on this site.

{% include explainers.html inline=true card_level="h4" %}

---

### What went wrong, and what changed
The early versions chased engagement: daily news topics, fast cuts, stock imagery. The results were busy and hard to verify. The explainer series reverses that: fewer, slower videos about work I can stand behind, where every claim has a source.

---

### Tech stack
Python, Anthropic API (Claude), ElevenLabs, Edge TTS, Whisper, Playwright, Pillow, FFmpeg and libass, PyYAML, GitPython.
