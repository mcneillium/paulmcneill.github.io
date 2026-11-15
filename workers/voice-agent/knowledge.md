# Paul Martin McNeill: facts for the portfolio voice assistant

Source: paulmartinmcneill.com (profile, education, experience, projects,
research, CV and the Voice case study), 15 November 2026. Only what is here may
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
- BSc (Hons) Computing, First-Class Honours, The Open University, 2025. Focus:
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
- Aurora: a Northern Ireland, NHSCT-aligned analytics platform covering
  operations, finance, workforce and compliance, built on Access and SQL data
  layers with Power BI.
- CRM reporting for Industrial Temps: a data quality framework, ETL with Access
  and Power Query, and Power BI dashboards.
- AI-enhanced social healthcare management system: client management, an NLP
  assistant, predictive analytics and safety monitoring.
- An LLM-powered productivity assistant, a custom CRM web application, a
  cloud-based data management system, and a Java ticket machine (object-oriented
  programming showcase).

## Research (two reproducible studies on public data; neither peer reviewed)
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
- Both studies: protocol written before any model was fitted, baselines first,
  fixed splits, negative results reported, and a log of every decision. Both
  were re-run on a second machine on 14 November 2026, and the river study's
  uncertainty experiment was repeated with three seeds on 15 November.
- How they were produced: both studies were built making use of AI tools, under
  research rules Paul set, and each study's log records how. Paul re-ran both
  on his own hardware and takes responsibility for the work and its
  conclusions; decisions still awaiting his review are marked in the logs.

## Pages
- Projects and case studies: the homepage.
- Research: paulmartinmcneill.com/research
- Live demos: paulmartinmcneill.com/lab
- CV: paulmartinmcneill.com/cv (public version; printable). For the full CV, contact Paul through "Get in touch".
