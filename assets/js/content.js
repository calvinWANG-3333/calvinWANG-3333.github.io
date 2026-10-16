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
      en: "I work on the data behind luxury prices: where it comes from, whether it can be trusted, and how to show it so someone can decide.",
      fr: "Je travaille sur la donnée derrière les prix du luxe : d’où elle vient, si l’on peut s’y fier, et comment la montrer pour qu’on puisse décider.",
    },
    body: {
      en: [
        "Master’s student in Data Sciences & Business Analytics at ESSEC Business School and CentraleSupélec. Before Paris, investments in Shanghai, then equity research and healthcare consulting.",
        "My last internship was on the pricing data team of a luxury market-intelligence company. The hard part was rarely the chart. It was knowing the number underneath was right, every week, for every market. So I build the parts that make a dashboard worth believing: models, tests, pipelines.",
      ],
      fr: [
        "Master Data Sciences & Business Analytics à l’ESSEC Business School et CentraleSupélec. Avant Paris, la finance d’investissement à Shanghai, puis l’equity research et le conseil santé.",
        "Mon dernier stage s’est déroulé dans l’équipe pricing d’une société d’intelligence de marché pour le luxe. La difficulté était rarement le graphique : c’était de savoir que le chiffre derrière était juste, chaque semaine, sur chaque marché. Je construis donc ce qui rend un dashboard digne de confiance : modèles, tests, pipelines.",
      ],
    },
    facts: [
      { k: { en: "Based in", fr: "Basé à" }, v: { en: "Paris", fr: "Paris" } },
      { k: { en: "Languages", fr: "Langues" }, v: { en: "Chinese, English, French", fr: "chinois, anglais, français" } },
      { k: { en: "Looking for", fr: "Recherche" }, v: { en: "A six-month graduation internship from July 2027, in Paris or Madrid", fr: "Un stage de fin d’études de six mois dès juillet 2027, à Paris ou Madrid" } },
    ],
    carnet: [
      { k: { en: "Reading", fr: "Je lis" }, v: "Ocean Vuong, Annie Ernaux, Sanmao" },
      { k: { en: "Watching", fr: "Je regarde" }, v: { en: "French New Wave cinema", fr: "La Nouvelle Vague" } },
      { k: { en: "On repeat", fr: "En boucle" }, v: "Daniel Caesar, oklou, Charli XCX" },
      { k: { en: "Thinking with", fr: "Je pense avec" }, v: { en: "Camus and the absurd", fr: "Camus et l’absurde" } },
      { k: { en: "Rooms", fr: "Intérieurs" }, v: { en: "Vincent Van Duysen", fr: "Vincent Van Duysen" } },
      { k: { en: "Training", fr: "Sport" }, v: { en: "Six days a week", fr: "Six jours sur sept" } },
    ],
  },

  /* ── EXPERIENCE (newest first) ───────────────────────────── */
  experience: [
    {
      when: { en: "2026", fr: "2026" },
      role: { en: "Quantitative Data Analyst, intern", fr: "Quantitative Data Analyst, stage" },
      org: "LuxuryNsight, Paris",
      note: {
        en: "QA and delivery of luxury pricing data for seven client brands. Automated the quarterly price-increases deck; built an AI price-verification agent.",
        fr: "Contrôle qualité et livraison des données de prix pour sept marques clientes. Automatisation du rapport trimestriel des hausses de prix ; création d’un agent IA de vérification.",
      },
    },
    {
      when: { en: "2022", fr: "2022" },
      role: { en: "Equity Research, intern", fr: "Equity Research, stage" },
      org: "Minsheng Securities, Shanghai",
      note: {
        en: "A 100-page initiation report on FESCO, with a segment revenue model, DCF and sensitivity analysis.",
        fr: "Un rapport d’initiation de 100 pages sur FESCO : modèle de revenus par segment, DCF et analyse de sensibilité.",
      },
    },
    {
      when: { en: "2021", fr: "2021" },
      role: { en: "Consultant Assistant, intern", fr: "Assistant consultant, stage" },
      org: "ZS Associates, Shanghai",
      note: {
        en: "Market research on China’s Huiminbao health insurance and more than 40 expert interviews.",
        fr: "Étude de marché sur l’assurance santé Huiminbao en Chine et plus de 40 entretiens d’experts.",
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
