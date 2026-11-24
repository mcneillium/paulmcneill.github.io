# Paul Martin McNeill: facts for the portfolio voice assistant

Source: paulmartinmcneill.com (profile, education, experience, projects,
research, CV and the Voice case study), 24 November 2026. Only what is here may
be stated as fact.

## Who Paul is
- Paul Martin McNeill is an AI engineer, web developer and data analyst based
  on the island of Ireland, with over 15 years across IT, data and engineering.
- He builds LLM-powered tools, web platforms and analytics for healthcare,
  accessibility and day-to-day operations.
- He is open to AI engineering and data roles, and to freelance or short-term
  consultancy, and is seeking a PhD in machine learning for imperfect,
  multisource real-world data.
- Current work: on a consultancy contract with a UK water utility, he built and
  maintains the leakage intelligence platform used to plan leakage work across
  more than 1,250 district metered areas: a weekly 15-stage data and modelling
  pipeline, forecasting and risk models, and a 25-page web application. He also
  audited the platform's own models, found validation flaws that made results
  look better than they were, and rebuilt the evaluation against simple
  baselines. No accuracy figures for it are published. The client is not named
  on the site.
- Contact: the "Get in touch" button on the site (email), or LinkedIn and
  GitHub (github.com/mcneillium), linked from the site.

## Education
- MSc Artificial Intelligence, Queen's University Belfast: in progress, due to
  finish in September 2027. He has not yet graduated from it.
- BSc (Hons) Computer Science, First-Class Honours, The Open University, 2025. Focus:
  artificial intelligence, data analytics, cloud computing, software engineering.
- M816 Data Management, a postgraduate Open University module (completed):
  data governance, modelling and database optimisation.

## Experience
- Creative Director and Technical Lead, Paramount Perceptions (self-employed),
  2019 to present: AI-assisted digital solutions and web applications across
  healthcare, education and retail; data strategies that bring together machine
  learning, cloud services and automation; full project lifecycles with GDPR
  and ethical compliance.
- CRM Systems Coordinator, Industrial Temps, Belfast, 2018 to 2019: ran and
  improved CRM systems and reporting, trained staff, automated processes.
- IT and Database Systems Manager, Platinum Support and Care Services, 2016 to
  2018: built a central Access database for staff, client and compliance data;
  introduced Power BI dashboards.
- Earlier: IT support, web design and e-commerce.
- Volunteer: digital volunteer and technology adviser for the RSPB Rathlin
  Island project (Rathlin360.com) since 2024.

## Skills
- Daily: Python, TypeScript, React, Node.js, Power BI, Pandas, Git, the OpenAI and Claude APIs.
- Strong working knowledge (comfortable shipping in production): PyTorch, TensorFlow, scikit-learn, Hugging Face, MLflow, Kubernetes, GCP and Vertex AI, Jupyter, Java, LangChain, Next.js, PostgreSQL, Firebase, Docker, Azure, AWS, DAX and Power Query.
- The projects on the site show where each was used.

## Voice (AI-powered AAC app)
- Voice is an AAC app: a way to communicate for people who cannot rely on
  speech, with a caregiver dashboard alongside it. Built with React Native
  (Expo) and Firebase.
- The user taps words on colour-coded tiles. Every word keeps the same place,
  so the board can be learned by position. Child and Adult modes use the same
  positions.
- Word prediction runs on the device with no network calls: a trigram model
  built from 666 sentences written for Voice, an optional personal layer, and
  a small ranker. Each suggestion says why it was offered.
- Learning is off by default. When switched on, it learns only from messages
  the user actually speaks, and everything learned can be seen and forgotten.
- Visitors can try the board, the full app (guest mode) and the caregiver
  dashboard with made-up data on the Voice case study page. Trials can be
  requested through the "Request a trial" link there.

## Other projects on the site
- Leakage Intelligence Platform: Paul's current work for a UK water utility (see
  Current work above). The page describes the system and his role; it
  publishes no utility data or accuracy figures.
- Aurora Care Management, AI-enhanced: a Django care-management app for a
  fictional home-care provider, on synthetic data only. Live vital-signs
  monitoring scored with NEWS2, a 30-day admission-risk model whose every score
  is broken down by input, a model card with baselines and a check that the
  caseload resembles the training data, a plain-English assistant that answers
  from the records, care-team messaging and analytics; 93 tests. Not a medical
  device. The code is private; access on request.
- Aurora Domiciliary Care: Power BI analytics for the same fictional provider,
  on a synthetic 16-table dataset. Not commissioned by the NHS or any provider.
- CRM reporting for Industrial Temps (the agency's CRM was bespoke): a data quality framework, ETL with Access
  and Power Query, and Power BI dashboards.
- AI Assistant: GPT-2 fine-tuned on dialogue data with Hugging Face
  Transformers, served through a Flask API with web, desktop, Streamlit and
  React interfaces. First trained on a CPU in 2024. Revisited in November 2026:
  a sampling bug fixed, then retrained on three public dialogue datasets
  (ConvAI2, DailyDialog, Blended Skill Talk). Held-out perplexity is 48 to 66
  per cent below untuned GPT-2 across the three. It still only makes small
  talk and forgets what it said. The code is public; the weights are not,
  because DailyDialog is non-commercial.
- McNeillium_AI: a Python pipeline that makes narrated, captioned explainer
  videos (Claude scripts, ElevenLabs narration, FFmpeg assembly) with
  speech-to-text and source checks; six explainers of Paul's work are built but
  not yet published.
- Custom CRM, built from scratch in November 2026: companies, contacts, a deal
  pipeline, an activity log, tasks, email templates and a dashboard, in
  TypeScript with Fastify and PostgreSQL and a React web app that installs as a
  PWA. The live demo on the site runs PostgreSQL inside the browser on invented
  sample data. 31 automated tests.
- Four small 2023 apps, revisited in November 2026 with tests (found and fixed
  bugs in every one, working with Claude as a pair programmer): a Java ticket
  machine (it charged for one ticket whatever the quantity), data structures in
  Python (a search crash and lost hash entries; the tree is now drawn), SQL and
  MongoDB side by side (both now refuse duplicate emails), and an expense
  tracker (its chart added dollars to pounds; Delete All deleted nothing).
  They now run on current tools: Java 25 for the ticket machine, and typed
  Python on versions 3.13 to 3.15 with uv, Ruff and mypy for the other three.
  The expense tracker holds money as exact decimals.

## Research (four studies on public data, one of them a first look; none peer reviewed)
- River early warning across 671 British catchments (CAMELS-GB): how far ahead
  river flow and flood or low-flow warnings can be forecast without future
  weather. Findings: most skill beyond a day depends on knowing the weather (at
  7 days, 0.24 without future weather against 0.72 with it, median NSE); a whole
  unseen region costs little but a different climate costs much more; an LSTM
  did no better than gradient boosting, and when trained only on wetter
  catchments it transferred to drier ones much worse than boosting; at 7 days
  most high-flow warnings are false alarms; calibrated forecast ranges
  under-cover in winter; a general time-series foundation model (Chronos-2)
  used without training beat "same as today" but stayed well below the trained
  models, because it does not turn rainfall into an expected rise.
- Drug response beyond a single marker (GDSC, 924 cancer cell lines, the AKT
  inhibitor Ipatasertib and the PTEN marker): wider gene data raises the share
  of response explained from about 11% to 14 to 19%, so most stays unexplained.
  The study measures how choosing genes before cross-validation produces a
  believable score from noise. Cell lines only; nothing about patients.
- Flood mapping from labels that are partly wrong (Sen1Floods11, Sentinel-1
  radar), started 17 November 2026: when flood-mapping models are trained on
  automatic threshold (Otsu) labels, how many of the labels' errors do they
  repeat? Three models, three seeds each: a UNet trained from scratch, and a
  pretrained model (TerraMind) with a small decoder, once with its encoder
  frozen and once with it updated in training. The one-time held-out
  evaluation was run on 23 November 2026, with Paul's prediction recorded
  first. On 90 new chips from the ten training floods the UNet repeated 75.0%
  of the labels' false water and 87.6% of their missed water; the frozen
  pretrained model 90.0% and 90.9%; the updated one 96.2% and 95.9%. All 18
  of Paul's predicted directions held there. On Bolivia, a flood no model had
  seen, the order for false water did not carry over (UNet 69.7%, frozen
  80.0%, updated 71.6%), and 12 of 18 predicted directions held; 15
  hand-labelled chips are limited evidence. Earlier, on development data, Paul
  had predicted the frozen encoder would repeat less false water than the
  UNet and reports that he was wrong. The repository is not public yet.
- Leak repairs inferred from a drop in flow (L-Town, a public simulated
  benchmark; no water company's data): a first look, run on 23 November 2026.
  When a rule infers leak repairs from a drop in night flow, how many real
  repairs does it find? With thresholds chosen on 2018, a 3-night rule found
  3 of the 7 repairs in 2019 and a 7-night rule found 6 of 7, with no false
  flag in either year. Paul chose the rule and recorded predictions before
  the test year was opened. The code is public on GitHub as
  leak-repair-labels.
- The river and drug studies: protocol written before any model was fitted, baselines first,
  fixed splits, negative results reported, and a log of every decision. Both
  were re-run on a second machine on 14 November 2026, and the river study's
  uncertainty experiment was repeated with three seeds on 15 November.
- How they were produced: all four studies were built making use of AI tools,
  under research rules Paul set, and each study's log records how. Paul re-ran
  the river and drug studies on his own hardware; in the flood study he set
  the design, recorded a prediction before each result, and ran the training
  and the held-out evaluation on his own GPU; in the leak repair study he
  chose the rule and the predictions, the code was written with AI tools, and
  he re-ran it on his own machine. He takes responsibility for the work and
  its conclusions; decisions still awaiting his review are marked in the logs.

## Pages
- Projects and case studies: the homepage.
- Research: paulmartinmcneill.com/research
- Live demos: paulmartinmcneill.com/lab
- CV: paulmartinmcneill.com/cv (public version; printable). For the full CV, contact Paul through "Get in touch".
