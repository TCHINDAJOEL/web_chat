/**
 * Génération du CV "Joël Deboston Tchinda" à l'identique du fichier Word source.
 *
 * Utilisation :
 *   npm install
 *   node generate_cv.js
 *   -> produit  Joel_Tchinda_alternance_data_EPITECH.docx
 *
 * Toutes les valeurs (tailles, couleurs, marges, espacements, taquets de
 * tabulation, indentations, liens) sont reprises exactement de l'OOXML du
 * document d'origine.
 */

const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  Tab,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
} = require("docx");

/* ------------------------------------------------------------------ *
 *  Constantes du document
 * ------------------------------------------------------------------ */
const FONT = "Aptos";
const NBSP = " "; // espace insécable utilisé dans les dates

// Liens hypertextes (cibles exactes du document source)
const URL = {
  linkedin: "https://www.linkedin.com/in/jo%C3%ABl-tchinda-b12311226/",
  portfolio: "https://portfolio.deboston.space",
  ratewatch: "https://ratewatch.deboston.space/",
  wecare: "https://wecare.deboston.space/",
  recommandation:
    "https://drive.google.com/file/d/1kyvtTUk1ez3UXjwUtldOsxGhRPHeRO1v/view?usp=sharing",
  certificat:
    "https://udemy-certificate.s3.amazonaws.com/pdf/UC-b5506a2c-1543-4ed5-a210-58892ad800ed.pdf",
  medicalGithub: "https://github.com/TCHINDAJOEL/Medical-VisionAI",
  pentestDemo: "https://raaj-shop.deboston.space/",
  pentestGithub: "https://github.com/TCHINDAJOEL/PentestLab.git",
  jeeGithub: "https://github.com/TCHINDAJOEL/projet_jee_test.git",
};

/* ------------------------------------------------------------------ *
 *  Helpers
 * ------------------------------------------------------------------ */

// Run de texte : t("texte", { b, i, u, size, color })
function t(text, o = {}) {
  return new TextRun({
    text,
    bold: o.b || false,
    italics: o.i || false,
    underline: o.u ? {} : undefined,
    size: o.size, // demi-points (ex. 19 = 9,5 pt) ; undefined => défaut doc
    color: o.color,
  });
}

// Lien hypertexte externe : souligné, couleur exacte de la source
// o = { color, i (italique), size }
function link(text, url, o = {}) {
  return new ExternalHyperlink({
    link: url,
    children: [
      new TextRun({
        text,
        size: o.size ?? 19,
        underline: {},
        color: o.color ?? "0563c1",
        italics: o.i || false,
      }),
    ],
  });
}

// Paragraphe générique
function p(children, opts = {}) {
  return new Paragraph({
    children,
    alignment: opts.align,
    spacing: {
      before: opts.before ?? 0,
      after: opts.after ?? 0,
      line: opts.line ?? 240,
      lineRule: "auto",
    },
    indent: opts.indent,
    tabStops: opts.tabStops,
    border: opts.border,
  });
}

// Taquet de tabulation à droite à 10106 twips (alignement des dates)
const RIGHT_TAB = [{ type: "right", position: 10106, leader: "none" }];

// En-tête de section : gras 22, bordure inférieure simple
function sectionHeader(text) {
  return p([t(text, { b: true, size: 22 })], {
    before: 240,
    after: 80,
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, space: 2, color: "000000" },
    },
  });
}

// Titre de poste/formation avec date alignée à droite via tabulation
function titleWithDate(titleRuns, dateRun, opts = {}) {
  return p([...titleRuns, new TextRun({ children: [new Tab()] }), dateRun], {
    before: opts.before ?? 160,
    after: opts.after ?? 0,
    tabStops: RIGHT_TAB,
  });
}

// Puce "–" : indent suspendu (left 420, hanging 280) + tabulation initiale
function bullet(children) {
  return new Paragraph({
    children: [new TextRun({ children: [new Tab()] }), ...children],
    spacing: { before: 20, after: 20, line: 240, lineRule: "auto" },
    indent: { left: 420, hanging: 280 },
  });
}

// Cellule de tableau sans bordure ; paragraphes alignés (cellAlign)
function tableCell(width, paragraphs) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.NIL },
      bottom: { style: BorderStyle.NIL },
      left: { style: BorderStyle.NIL },
      right: { style: BorderStyle.NIL },
    },
    children: paragraphs,
  });
}

// Paragraphe simple dans une cellule
function cellPara(runs, { align, before = 0, after = 0 } = {}) {
  return new Paragraph({
    children: runs,
    alignment: align,
    spacing: { before, after, line: 240, lineRule: "auto" },
  });
}

// Tableau 3 colonnes : SoftSkills / Langues / Centres d'intérêt
const infoTable = new Table({
  width: { size: 9106, type: WidthType.DXA },
  columnWidths: [3035, 3035, 3036],
  layout: "fixed",
  borders: {
    top: { style: BorderStyle.NIL },
    bottom: { style: BorderStyle.NIL },
    left: { style: BorderStyle.NIL },
    right: { style: BorderStyle.NIL },
    insideHorizontal: { style: BorderStyle.NIL },
    insideVertical: { style: BorderStyle.NIL },
  },
  rows: [
    new TableRow({
      height: { value: 300, rule: "atLeast" },
      children: [
        tableCell(3035, [
          cellPara([t("SOFTSKILLS", { b: true, size: 22 })], { before: 160 }),
        ]),
        tableCell(3035, [
          cellPara([t("LANGUES", { b: true, size: 22 })], { before: 160 }),
        ]),
        tableCell(3036, [
          cellPara([t("CENTRES D’INTÉRÊT", { b: true, size: 22 })], {
            before: 160,
            align: AlignmentType.RIGHT,
          }),
        ]),
      ],
    }),
    new TableRow({
      children: [
        tableCell(3035, [
          cellPara([t("Esprit d’analyse,", { size: 19 })]),
          cellPara([t("communication et autonomie", { size: 19 })]),
        ]),
        tableCell(3035, [
          cellPara([t("Français (natif)", { size: 19 })]),
          cellPara([t("Anglais B1+ (professionnel)", { size: 19 })]),
        ]),
        tableCell(3036, [
          cellPara([t("Running, Lecture", { size: 19 })], {
            align: AlignmentType.RIGHT,
          }),
        ]),
      ],
    }),
  ],
});

/* ------------------------------------------------------------------ *
 *  Corps du document
 * ------------------------------------------------------------------ */
const children = [
  // En-tête : nom
  p([t("Joël Deboston Tchinda", { b: true, size: 28 })], {
    align: AlignmentType.CENTER,
    after: 40,
  }),

  // Sous-titre
  p(
    [
      t("Data & Business Intelligence ", { size: 21, color: "000000" }),
      t("| Alternance 12 ou 24 mois dès septembre 2026", {
        size: 21,
        color: "000000",
      }),
    ],
    { align: AlignmentType.CENTER, after: 180 }
  ),

  // Rythme alternance
  p([t("(6 semaines d’entreprise / 2 semaines d’école)", { i: true, size: 19 })], {
    align: AlignmentType.CENTER,
    after: 20,
  }),

  // Coordonnées
  p(
    [
      t("tchindajoel25120@gmail.com  |  07 44 82 17 80  | ", { size: 19 }),
      t("Mobile en France", { size: 19 }),
      t("  |  ", { size: 19 }),
      link("LinkedIn", URL.linkedin),
      t("  |  ", { size: 19 }),
      link("Portfolio", URL.portfolio),
    ],
    { align: AlignmentType.CENTER, after: 60 }
  ),

  /* ----------------------------- FORMATION ----------------------------- */
  sectionHeader("FORMATION"),

  // EPITECH (alignement de la date par espaces, comme la source)
  p(
    [
      t("EPITECH –  ", { b: true }),
      t("Master of Science Big Data  ", { b: true }),
      t("Paris, France", { i: true, size: 19, color: "444444" }),
      t(
        "                                                                      ",
        { b: true }
      ),
      t(`2026${NBSP}–${NBSP}2028         Cours: `, {}),
      t("Bigdata, visualisation de données, IA, python", {}),
      t("              ", { b: true }),
    ],
    { before: 20, after: 100, line: 259 }
  ),

  // 3iL Ingénieurs
  titleWithDate(
    [
      t("3iL Ingénieurs – Diplôme d’ingénieur informatique ", {
        b: true,
        size: 20,
      }),
      t("(en cours)  ", { b: true }),
      t("Limoges, France", { i: true, size: 19, color: "444444" }),
    ],
    t(`2023${NBSP}–${NBSP}2026`, { size: 20 })
  ),
  p([t("Cours: Java avancé, programmation web, IA, python", {})], {
    before: 20,
    after: 100,
    line: 259,
  }),

  // Prépavogt
  titleWithDate(
    [
      t("Prépavogt ", { b: true, size: 20 }),
      t("– Classes Préparatoires MPSI", { b: true }),
    ],
    t(`2021${NBSP}–${NBSP}2023`, { size: 20 })
  ),

  /* --------------------- EXPÉRIENCE PROFESSIONNELLE -------------------- */
  sectionHeader("EXPÉRIENCE PROFESSIONNELLE"),

  // Connect France
  titleWithDate(
    [
      t(
        "Ingénieur d’Application (alternance) – Connect France Financial Services, Reims",
        { b: true }
      ),
    ],
    t(`Oct.${NBSP}2025${NBSP}–${NBSP}Août${NBSP}2026`, {})
  ),
  p(
    [
      t("CeynaPay – Plateforme de transfert d’argent Europe-Afrique", {
        i: true,
        size: 19,
        color: "444444",
      }),
    ],
    { before: 20, after: 40 }
  ),
  bullet([
    t(
      "–Conçu et exécuté des campagnes de tests API automatisées (Postman, Newman)",
      { size: 19 }
    ),
  ]),
  bullet([
    t(
      "–Conçu et exécuté de campagnes de tests fonctionnels via cypress et maestro(en cours)",
      { size: 19 }
    ),
  ]),
  bullet([
    t(
      "–Assuré la recette et la validation des livrables, tenu le registre d’anomalies QA",
      { size: 19 }
    ),
  ]),
  bullet([
    t(
      "–Construit un outil de veille concurrentielle (React, Python, PostgreSQL) collectant les taux de change concurrents → déployé, utilisé par les sales pour ajuster la stratégie tarifaire. ",
      { size: 19 }
    ),
    link("Lien", URL.ratewatch, { color: "1155cc" }),
  ]),
  bullet([
    t(
      "–Audité l’infrastructure AWS (EU-West-3) : identifié des points d’optimisation, de sécurité et d’accessibilité, documentés dans un rapport",
      { size: 19 }
    ),
  ]),
  bullet([
    t(
      "–Rédiger la documentation pour les équipes support sur l’application, la structuration du drive",
      { size: 19 }
    ),
  ]),
  bullet([t("", { size: 19 })]),

  // KOMA EXPERTISE
  p(
    [
      t("KOMA EXPERTISE & SCI WECARE  – Plateforme BTP", {
        i: true,
        size: 19,
        color: "444444",
      }),
    ],
    { before: 20, after: 20 }
  ),
  bullet([
    t("–    Supervision du développement de la plateforme", { size: 19 }),
  ]),
  bullet([
    t("–Développement du site web wecare avec CMS intégré. ", { size: 19 }),
    link("site", URL.wecare, { color: "1155cc" }),
  ]),
  bullet([t("–Developpement du site web Koma Expertise", { size: 19 })]),

  // Symetrie
  titleWithDate(
    [
      t("Data Ingénieur & Data Analyst (", { b: true, size: 20 }),
      t("s", { b: true }),
      t("tage) – Symetrie, Nîmes", { b: true, size: 20 }),
    ],
    t(`Avr.${NBSP}–${NBSP}Sept.${NBSP}2025`, { size: 20 })
  ),
  p([link("Lettre de recommandation disponible", URL.recommandation, {
    color: "1155cc",
    i: true,
  })], {
    before: 20,
    after: 40,
  }),
  bullet([
    t(
      "–Construit un pipeline ETL (Python, SQL, Airflow, MariaDB, Docker) automatisant l’ingestion de données de production → éliminé des heures par semaine de manipulation manuelle et de chargement de données",
      { size: 19 }
    ),
  ]),
  bullet([
    t(
      "–Développé des tableaux de bord Power BI (DAX, Power Query) pour le suivi financier et la facturation, pour l’équipe de suivi de projet",
      { size: 19 }
    ),
  ]),
  bullet([
    t(
      "–Automatisé la mise à jour des rapports Power BI via des flux de données programmés",
      { size: 19 }
    ),
  ]),
  bullet([
    t("–Analysé les projets clôturés pour affiner les chiffrages futurs", {
      size: 19,
    }),
  ]),
  bullet([
    t(
      "–Rédigé une documentation complète et assuré la passation à l’alternant présent",
      { size: 19 }
    ),
  ]),

  // Boston Sarl
  titleWithDate(
    [
      t("Assistant Analyste ", { b: true, size: 20 }),
      t("(stage)", { b: true }),
      t(" – Boston Sarl", { b: true, size: 20 }),
    ],
    t(`Juin${NBSP}–${NBSP}Août${NBSP}2022`, { size: 20 })
  ),
  bullet([
    t(
      "–Nettoyé, structuré et analysé les données sous Excel, créé des vues SQL métier et modélisé un schéma en étoile",
      { size: 19 }
    ),
  ]),

  /* ------------------------------ PROJETS ----------------------------- */
  sectionHeader("PROJETS"),

  p(
    [
      t("Pipeline ELT – Google Cloud Platform", { b: true, size: 19 }),
      t("  (", { size: 19 }),
      link("certificat", URL.certificat),
      t(")", { size: 19 }),
    ],
    { before: 100, after: 20 }
  ),
  p(
    [
      t(
        "Déployé un pipeline ELT complet (BigQuery, GCS, Airflow) pour analyser les trajets de taxis new-yorkais. Automatisé l’ingestion de fichiers Parquet (Python, SQL) et modélisé les tendances avec BigQuery ML.",
        { size: 19 }
      ),
    ],
    { after: 60 }
  ),

  p(
    [
      t("Plateforme Agentic BI", { b: true, size: 19 }),
      t("  (en cours)", { i: true, size: 19 }),
    ],
    { before: 100, after: 20 }
  ),
  p(
    [
      t(
        "Assistant IA d’analyse de données interrogeant des sources en langage naturel. Architecture agentique avec orchestrateur, connecteurs multi sources et génération SQL automatisée.",
        { size: 19 }
      ),
    ],
    { after: 60 }
  ),

  p(
    [
      t("Détection d’anomalies médicales par IA", { b: true, size: 19 }),
      t("  (", { size: 19 }),
      link("GitHub", URL.medicalGithub),
      t(")", { size: 19 }),
    ],
    { before: 100, after: 20 }
  ),
  p(
    [
      t(
        "Modèle CNN de détection d’anomalies sur images médicales avec interface Tkinter pour l’analyse en temps réel.",
        { size: 19 }
      ),
    ],
    { after: 60 }
  ),

  p(
    [
      t("Plateforme de pentesting – MaBoutique CTF", { b: true, size: 19 }),
      t("  (", { size: 19 }),
      link("démo", URL.pentestDemo),
      t(")(", { size: 19 }),
      link("GitHub", URL.pentestGithub, { color: "1155cc" }),
      t(")", { size: 19 }),
    ],
    { before: 100, after: 20 }
  ),
  p(
    [
      t(
        "API REST simulant une boutique en ligne (Laravel 12, PostgreSQL) avec 12 challenges de sécurité web (SQLi, XSS, IDOR, CSRF…) et scoring dynamique HMAC-SHA256. Couverture PHPUnit complète.",
        { size: 19 }
      ),
    ],
    { after: 60 }
  ),

  p(
    [
      t("Gestion de Parcelles Agricoles – Java EE", { b: true, size: 19 }),
      t("(", { size: 19 }),
      link("GitHub", URL.jeeGithub, { color: "1155cc" }),
      t(")", { size: 19 }),
    ],
    { before: 100, after: 20 }
  ),
  p(
    [
      t(
        "Application web modulaire (JSF, EJB, JPA, PostgreSQL) en architecture 4 couches avec services métier distants et modèle relationnel complet. Développé en équipe avec la méthode agile",
        { size: 19 }
      ),
    ],
    { after: 60 }
  ),

  // Tableau 3 colonnes : Soft skills / Langues / Centres d'intérêt
  infoTable,

  p([t("", { size: 19 })], {}),

  /* --------------------------- CERTIFICATIONS ------------------------- */
  sectionHeader("CERTIFICATIONS"),
  p(
    [
      t("Certifications : ", { b: true, size: 19 }),
      t(
        "Python, Java, Data Engineers, Power BI Analyst, SQL, Data Science, ANSSI Sécurité numérique, AWS Cloud Practitioner",
        { size: 19 }
      ),
    ],
    { after: 30 }
  ),

  /* ----------------------- COMPÉTENCES TECHNIQUES --------------------- */
  sectionHeader("COMPÉTENCES TECHNIQUES"),
  p(
    [
      t("Data & Visualisation : ", { b: true, size: 19 }),
      t("Power BI (DAX, Power Query), Tableau, Matplotlib, Seaborn, Excel", {
        size: 19,
      }),
    ],
    { before: 60, after: 30 }
  ),
  p(
    [
      t("Bases de données : ", { b: true, size: 19 }),
      t("PostgreSQL, MySQL, MariaDB, MongoDB, BigQuery", { size: 19 }),
    ],
    { after: 30 }
  ),
  p(
    [
      t("Langages : ", { b: true, size: 19 }),
      t("Python (Pandas, NumPy, TensorFlow), SQL, Java, R, C#, PHP, JavaScript", {
        size: 19,
      }),
    ],
    { after: 30 }
  ),
  p(
    [
      t("DevOps & Outils : ", { b: true, size: 19 }),
      t("Docker, Git, Airflow, Postman, Cypress, Maestro, JIRA", { size: 19 }),
    ],
    { after: 30 }
  ),
  p(
    [
      t("Cloud & Infra : ", { b: true, size: 19 }),
      t("AWS, GCP, Linux, Shell scripting", { size: 19 }),
    ],
    { after: 30 }
  ),
  p([t("", { size: 19 })], { before: 60 }),
];

/* ------------------------------------------------------------------ *
 *  Assemblage du document (A4, marges identiques à la source)
 * ------------------------------------------------------------------ */
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 22 }, // défaut Aptos 11 pt (runs sans taille)
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838, orientation: "portrait" },
          margin: {
            top: 720,
            bottom: 720,
            left: 900,
            right: 900,
            header: 720,
            footer: 720,
          },
        },
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  const out = "Joel_Tchinda_alternance_data_EPITECH.docx";
  fs.writeFileSync(out, buffer);
  console.log("✓ Document généré :", out);
});
