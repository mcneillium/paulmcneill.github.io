# Research: portfolio patterns from senior AI / software engineers

**Methodology caveat**: this is synthesised from the patterns I've seen
across many ML / AI engineer and senior-software portfolios over the
last few years, not a fresh empirical study with screenshots and links.
The point is to encode the patterns as actionable rules, not to cite a
canon. Where a specific portfolio inspired a decision, the commit
messages name it.

## What works on senior portfolios

### 1. Specific over generic, always

The portfolios that read as senior open with **what you've shipped**
or **what specific problem you solve**, not "passionate developer".

> ❌ "I'm passionate about creating innovative AI-powered solutions."
>
> ✅ "I build production AI systems for healthcare and accessibility —
>     including NHS-aligned analytics and assistive communication tools
>     for non-verbal users."

**Applied here**: the hero leads with three concrete disciplines and
the about section names NHSCT, AAC, and analytics work directly.

### 2. Outcomes, not technologies

Listing the stack is fine; leading with it is junior signalling.
Senior portfolios surface **the outcome the work produced** before the
stack used.

> ❌ "Built using Python, TensorFlow, Power BI, and Azure."
>
> ✅ "Reduced reporting cycle from 5 days to 4 hours; tech stack:
>     Python, TensorFlow, Power BI, Azure."

**Applied here**: every project card has an `impact:` field rendered as
a ribbon in front of the tech tags. The placeholders are flagged for
verification — better to be honest about uncertainty than invent.

### 3. Calm, editorial design

The portfolios that read as serious tend to be quieter visually:

- One strong typeface for display, one for body, one mono.
- Generous whitespace.
- Single accent colour, used sparingly.
- Animation that respects `prefers-reduced-motion`.
- Dark themes are common but not required; what matters is that the
  design feels considered rather than templated.

**Applied here**: Instrument Serif (display) + DM Sans (body) +
JetBrains Mono (labels). Single lime accent (`#c9f270`). 1280px max
width. All animation disabled under reduced motion.

### 4. Case studies, not screenshot galleries

The portfolios that get cited as "great" tell stories: problem →
constraints → approach → outcome. The portfolios that get scrolled past
show eight screenshots with a tech list.

**Applied here**: `_layouts/post.html` has slots for impact, GitHub
shields, an optional architecture diagram, body prose, and an
auto-detected gallery — but the gallery is below the prose, not above.
The reader reads the story before they see the artefacts.

### 5. Live signals of being active

Some kind of "still doing this" signal is common:

- A "Currently" line.
- A GitHub contribution graph.
- Recent commit / blog dates.
- A small "Available for work" / "Open to opportunities" pill.

**Applied here**: availability pill in nav (configurable via
`_config.yml: available`); GitHub contribution graph as a section.
A "Currently" line is on the roadmap.

### 6. Credentials shown, not bragged

Credentials work best as small badge cards or a quiet list — not as a
hero element. Membership of professional bodies (BCS, IET) and platform
certs (GCP / AWS / TF Developer) signal seriousness without dominating.

**Applied here**: credentials are between About and Contact, in a
subdued grid that becomes a horizontal scroll-snap on mobile.

### 7. Calls to action are concrete

> ❌ "Get in touch"
>
> ✅ "Email me about an AI engineering role" / "Book a 30-minute call"
>     / "View the source on GitHub"

**Applied here**: hero has "View Projects" and "Download CV". Project
pages have "View on GitHub" and "Watch demo". Contact is split into
five concrete channels rather than one form.

### 8. Conspicuous absence of fluff

Senior portfolios usually omit:

- Marketing-style "Why hire me" lists.
- Skills percentage bars (90% Python, 85% TF). Read as junior because
  no skill is meaningfully a percentage and the precision is fake.
- Stock photos of code on a dark monitor.
- Auto-rotating carousels.
- Counters of "lines of code written" / "coffee consumed".
- Generic testimonials from "John D., CEO".

**Applied here**: skills are tiered (Daily driver / Strong working
knowledge / Familiar) instead of percentage bars. Testimonials are
flagged Placeholder until verified — better to remove the section
than to leave anonymous filler.

### 9. Light professional context, not biography

The strongest "About" sections give 60–80 words of professional
context — what you focus on, where you work, what kinds of problems
you solve — not a life story.

**Applied here**: the About paragraph is three short paragraphs
focused on NHS work, AI accessibility tools, and analytics rebuilds.
Personal context (Northern Ireland, location) is included but
secondary.

### 10. Discoverability without keyword-stuffing

Names and certifications are the queries that matter. Person schema
+ JSON-LD + a clean OG image + a clean URL → fine. SEO copywriting
tricks ("best AI engineer Northern Ireland | NHS data | machine
learning expert") don't help and read badly to humans.

**Applied here**: Person JSON-LD on home, Article JSON-LD on case
studies, OG / Twitter Card / canonical tags via `_includes/head.html`.
No keyword-stuffing.

## Anti-patterns I avoided

- **Light/dark mode toggle.** The site is intentionally dark. Adding a
  light variant doubles every CSS custom property and adds maintenance
  for ~5% of users who'd actively use the toggle.
- **A "Currently" widget that auto-pulls from somewhere.** Dynamic
  signals look fresh until they break silently (the data source moves,
  the API rate-limits, etc.). A static "Currently" string updated by
  hand is more honest.
- **A live blog feed pulled from Medium / dev.to.** Cross-posting
  splits attention. Better to publish on the portfolio first and
  syndicate.
- **A chatbot version of "Paul"**. Reads as a tech demo, not as
  evidence of shipping.
- **Custom cursor / page transitions / Konami easter egg.** Junior
  signalling; declined in commit messages with reasoning.

## Influences worth naming

This isn't a comprehensive list — just patterns I borrowed deliberately:

- **Editorial / news-site typography conventions** — large display serif
  for the hero, mono for micro-labels, sans for body. Pattern used
  across high-end personal sites in the last few years.
- **Bento grids** — popularised by Apple's product pages and adopted by
  many modern portfolios. Used here for projects with mixed `lg`/`md`
  card sizes.
- **The "principles" / "How I work" pattern** — common on consultancy
  sites, less common on personal portfolios. Adds methodology signal
  without claiming work that doesn't exist.
- **Lite YouTube embeds** — Paul Irish's `lite-youtube-embed` pattern.
  Implemented here as a small inline snippet rather than the full custom
  element.

## What I deliberately didn't copy

- **Anything that requires JavaScript to render text.** All content here
  is in the HTML at build time. No SPA, no client-side rendering.
- **Heavy hero animations.** Looks impressive once; gets tedious on
  return visits.
- **"Inspired by" walls of logos for tools that don't add evidence.**
  Tech stack icons appear in the marquee and skills tiers because they
  *are* the evidence. They don't appear as a "powered by" wall.
