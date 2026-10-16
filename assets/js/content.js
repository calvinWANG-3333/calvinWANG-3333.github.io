/*
  CONTENT
  Everything written on the site lives in this file.
  Text that changes with the language is written { en: "...", fr: "..." }.

  To add a project: copy one block inside `projects`, edit it,
  then remove its name from `upcoming`. See README.md.
*/
window.SITE = {
  person: {
    name: "Ruihang Wang",
    email: "b00821188@essec.edu",
    linkedin: "https://www.linkedin.com/in/ruihang-w",
    github: "https://github.com/calvinWANG-3333",
    // Put the PDF at assets/cv/Ruihang_Wang_CV.pdf and write that path here.
    // While this is empty, the CV link stays hidden.
    cv: "",
  },

  roles: { en: "Data Analyst, Analytics Engineer", fr: "Data Analyst, Analytics Engineer" },

  /* ── COLLECTION ─────────────────────────────────────────────
     work.prints : one or two images hung on the wall of the room
     work.text   : or a text piece, set in large type instead of an image */
  projects: [
    {
      id: "pipeline",
      title: "Point-in-Time Pricing Pipeline",
      year: "2026",
      stack: "dbt, Databricks, SQL, Python, GitHub Actions",
      summary: {
        en: "A luxury price-monitoring pipeline rebuilt with dbt on Databricks, so the order in which files arrive can never change the prices a client receives. Synthetic data, a write-audit-publish delivery gate, CI/CD and BI pages, all published by the pipeline itself.",
        fr: "Un pipeline de veille des prix du luxe reconstruit avec dbt sur Databricks : l’ordre d’arrivée des fichiers ne peut plus changer les prix livrés au client. Données synthétiques, contrôle write-audit-publish, CI/CD et pages BI, le tout publié par le pipeline lui-même.",
      },
      numbers: [
        { n: "58", l: { en: "dbt models and sources", fr: "modèles et sources dbt" } },
        { n: "142", l: { en: "data tests", fr: "tests de données" } },
        { n: "10 → 0", l: { en: "wrong country reports", fr: "rapports pays faux" } },
      ],
      links: [
        { label: { en: "View the site", fr: "Voir le site" }, url: "https://calvinwang-3333.github.io/balenciaga-pricing-pipeline/" },
        { label: { en: "Repository", fr: "Dépôt" }, url: "https://github.com/calvinWANG-3333/balenciaga-pricing-pipeline" },
      ],
      work: {
        prints: [
          { src: "assets/img/work-lineage.jpg", w: 2040, h: 650, alt: { en: "The pipeline’s dbt lineage, from raw files to published models", fr: "La lignée dbt du pipeline, des fichiers bruts aux modèles publiés" } },
          { src: "assets/img/work-grid.jpg", w: 1272, h: 680, alt: { en: "BI page: price changes for eight products across eight markets", fr: "Page BI : variations de prix de huit produits sur huit marchés" } },
        ],
      },
    },
    {
      id: "agent",
      title: "Price Update Agent",
      year: "2026",
      stack: "Python, browser-use, Playwright, Claude Sonnet 4.5",
      summary: {
        en: "A browser agent that re-checks luxury prices on brand websites and writes the result back into the price-check workbook. The model only reads the page; a fixed rule engine decides what gets written, and anything uncertain goes to a human.",
        fr: "Un agent navigateur qui revérifie les prix sur les sites des marques et réécrit le résultat dans le fichier de contrôle. Le modèle ne fait que lire la page ; un moteur de règles décide de ce qui est écrit, et tout doute part en revue humaine.",
      },
      numbers: [
        { n: "1", l: { en: "LLM call per row", fr: "appel LLM par ligne" } },
        { n: "1 %", l: { en: "price tolerance", fr: "tolérance de prix" } },
        { n: "4", l: { en: "priority rules", fr: "règles de priorité" } },
      ],
      links: [
        { label: { en: "Repository", fr: "Dépôt" }, url: "https://github.com/calvinWANG-3333/AI-agent-for-price-update" },
      ],
      work: {
        text: {
          en: ["Open the page.", "Read the price.", "Write the remark."],
          fr: ["Ouvrir la page.", "Lire le prix.", "Écrire la remarque."],
        },
      },
    },
  ],

  // Shown in grey at the end of the collection index. Remove a line when its project ships.
  upcoming: [
    { en: "Forecasting", fr: "Prévision" },
    { en: "Machine Learning", fr: "Machine Learning" },
    { en: "Marketing Analytics", fr: "Marketing Analytics" },
    { en: "Big Data, Spark", fr: "Big Data, Spark" },
  ],

  /* ── THE HOUSE ───────────────────────────────────────────── */
  house: {
    statement: {
      en: "I build analytics pipelines: from raw, messy data to tested models and reports that people can trust and act on.",
      fr: "Je construis des pipelines analytiques : de la donnée brute et désordonnée jusqu’à des modèles testés et des rapports sur lesquels on peut s’appuyer pour décider.",
    },
    body: {
      en: [
        "Master’s student in Data Sciences & Business Analytics at ESSEC Business School and CentraleSupélec. Before Paris, a degree in investments in Shanghai, then equity research and consulting.",
        "In research, in consulting and on a pricing data team, the lesson was the same: the hard part is rarely the chart. It is knowing the number underneath is right, every time it refreshes. When a number goes wrong, I look for the part of the setup that let it happen, and fix that.",
      ],
      fr: [
        "Master Data Sciences & Business Analytics à l’ESSEC Business School et CentraleSupélec. Avant Paris, une licence en finance d’investissement à Shanghai, puis l’equity research et le conseil.",
        "En recherche, en conseil puis dans une équipe de données de prix, la leçon a été la même : la difficulté est rarement le graphique. C’est de savoir que le chiffre derrière est juste, à chaque mise à jour. Quand un chiffre est faux, je cherche ce qui, dans l’organisation, l’a rendu possible, et je corrige cela.",
      ],
    },
    // What I do, in any industry
    practice: [
      {
        k: { en: "Analytics pipelines", fr: "Pipelines analytiques" },
        v: { en: "Raw data to staging to marts, in SQL and dbt. Rebuilt the same way every run, readable at any date.", fr: "De la donnée brute aux marts, en SQL et dbt. Reconstruits à l’identique à chaque exécution, lisibles à n’importe quelle date." },
      },
      {
        k: { en: "Data quality", fr: "Qualité des données" },
        v: { en: "Tests at every layer, reconciliation and a release gate, so a wrong number is caught before anyone sees it.", fr: "Des tests à chaque couche, des rapprochements et un contrôle avant publication : un chiffre faux est arrêté avant d’être vu." },
      },
      {
        k: { en: "Automation and AI", fr: "Automatisation et IA" },
        v: { en: "Scripts and AI agents that take over repetitive checks, with fixed rules and a person for anything uncertain.", fr: "Des scripts et des agents IA qui prennent en charge les contrôles répétitifs, avec des règles fixes et une personne pour tout cas incertain." },
      },
      {
        k: { en: "BI and reporting", fr: "BI et reporting" },
        v: { en: "Metric definitions, dashboards and automated reports, built around the question someone needs answered.", fr: "Définitions de métriques, dashboards et rapports automatisés, pensés pour la question à laquelle il faut répondre." },
      },
    ],
    facts: [
      { k: { en: "Based in", fr: "Basé à" }, v: { en: "Paris", fr: "Paris" } },
      { k: { en: "Languages", fr: "Langues" }, v: { en: "Chinese, English, French", fr: "chinois, anglais, français" } },
      { k: { en: "Looking for", fr: "Recherche" }, v: { en: "A six-month graduation internship from July 2027, in Paris or Madrid", fr: "Un stage de fin d’études de six mois dès juillet 2027, à Paris ou Madrid" } },
    ],
    // A few lines about life outside work
    offDuty: {
      en: "Away from data, I read Ocean Vuong, Annie Ernaux and Sanmao, watch films from the French New Wave, and keep Daniel Caesar and oklou on repeat. I train six days a week, and I’m learning French one lesson at a time; Paris makes a good classroom.",
      fr: "Loin des données, je lis Ocean Vuong, Annie Ernaux et Sanmao, je regarde les films de la Nouvelle Vague, et Daniel Caesar et oklou tournent en boucle. Je m’entraîne six jours sur sept et j’apprends le français, une leçon à la fois ; Paris est une bonne salle de classe.",
    },
  },

  /* ── EXPERIENCE (newest first) ───────────────────────────── */
  experience: [
    {
      when: { en: "Apr – Sep 2026", fr: "avr. – sept. 2026" },
      role: { en: "Quantitative Data Analyst, intern", fr: "Quantitative Data Analyst, stage" },
      org: "LuxuryNsight, Paris",
      note: {
        en: "Ran the quality gate of a weekly and monthly pricing data pipeline for seven clients: reconciliation, anomaly checks, release. Automated the quarterly pricing report in Python and built an AI agent that re-checks flagged prices.",
        fr: "Contrôle qualité d’un pipeline de données de prix hebdomadaire et mensuel pour sept clients : rapprochements, détection d’anomalies, mise en production. Automatisation du rapport trimestriel en Python et création d’un agent IA qui revérifie les prix signalés.",
      },
    },
    {
      when: { en: "Jan – May 2023", fr: "janv. – mai 2023" },
      role: { en: "Equity Research, intern", fr: "Equity Research, stage" },
      org: "Guotai Junan Securities, Shanghai",
      note: {
        en: "Company and industry research: revenue models, DCF valuation and sensitivity analysis, with data prepared in MySQL for weekly Power BI tracking reports.",
        fr: "Recherche sur des entreprises et des secteurs : modèles de revenus, valorisation DCF et analyse de sensibilité, avec des données préparées sous MySQL pour des suivis hebdomadaires sous Power BI.",
      },
    },
    {
      when: { en: "Jun 2022 – Jan 2023", fr: "juin 2022 – janv. 2023" },
      role: { en: "Equity Research, intern", fr: "Equity Research, stage" },
      org: "Minsheng Securities, Shanghai",
      note: {
        en: "A 100-page initiation report on FESCO, with a segment revenue model, DCF and sensitivity analysis. Built small data warehouses in SSAS on top of a MySQL ETL to compare industry metrics.",
        fr: "Un rapport d’initiation de 100 pages sur FESCO : modèle de revenus par segment, DCF et analyse de sensibilité. Petits entrepôts de données sous SSAS, alimentés par un ETL MySQL, pour comparer des indicateurs sectoriels.",
      },
    },
    {
      when: { en: "Aug 2021 – Feb 2022", fr: "août 2021 – févr. 2022" },
      role: { en: "Part-time Associate, business intelligence", fr: "Associate à temps partiel, business intelligence" },
      org: "ZS Associates, Shanghai",
      note: {
        en: "Maintained the team’s daily pharma-market dashboard in Power BI and built more than 50 interactive reports and visuals that the team used for day-to-day decisions.",
        fr: "Suivi du dashboard quotidien du marché pharmaceutique sous Power BI et création de plus de 50 rapports et visuels interactifs utilisés par l’équipe pour ses décisions au quotidien.",
      },
    },
  ],

  education: [
    { when: "2024 – 2027", degree: { en: "MSc Data Sciences & Business Analytics", fr: "MSc Data Sciences & Business Analytics" }, school: "ESSEC Business School & CentraleSupélec" },
    { when: "2020 – 2024", degree: { en: "Bachelor of Economics, Investments", fr: "Licence d’économie, investissement" }, school: "Shanghai University of Finance and Economics" },
  ],

  skills: [
    { k: { en: "Modeling", fr: "Modélisation" }, v: "SQL, dbt, Databricks, DuckDB" },
    { k: { en: "Engineering", fr: "Ingénierie" }, v: "Python, GitHub Actions, CI/CD" },
    { k: { en: "BI", fr: "BI" }, v: "Power BI, Power Query, Tableau" },
    { k: { en: "AI", fr: "IA" }, v: "Playwright, browser-use, Claude API" },
  ],
};
