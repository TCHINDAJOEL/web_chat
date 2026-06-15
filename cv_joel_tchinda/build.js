/**
 * Reconstruction NATIVE du CV au format .docx
 * ------------------------------------------------------------------
 * Au lieu de passer par une librairie qui regénère ses propres styles
 * (et change donc le rendu), ce script reconstruit le .docx directement
 * à partir de son OOXML d'origine : les fichiers XML internes exacts que
 * Word a écrits, simplement re-compressés dans le conteneur ZIP .docx.
 *
 * Résultat : strictement identique à l'ouverture dans Word.
 *
 * Utilisation :
 *   npm install
 *   node build.js
 *   -> produit  Joel_Tchinda_alternance_data_EPITECH.docx
 */

const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");

const SRC = path.join(__dirname, "src");
const OUT = path.join(__dirname, "Joel_Tchinda_alternance_data_EPITECH.docx");

// Ordre des parties du paquet OOXML (WordprocessingML)
const PARTS = [
  "[Content_Types].xml",
  "_rels/.rels",
  "word/document.xml",
  "word/_rels/document.xml.rels",
  "word/styles.xml",
  "word/settings.xml",
  "word/fontTable.xml",
  "word/numbering.xml",
  "word/theme/theme1.xml",
];

const zip = new JSZip();

for (const part of PARTS) {
  const full = path.join(SRC, part);
  if (!fs.existsSync(full)) {
    console.error("✗ Partie manquante :", part);
    process.exit(1);
  }
  // Les fichiers OOXML sont insérés tels quels (octet pour octet)
  zip.file(part, fs.readFileSync(full));
}

zip
  .generateNodeStream({
    type: "nodebuffer",
    streamFiles: true,
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
    // .docx attend application/... ; pas de mimetype non compressé requis
  })
  .pipe(fs.createWriteStream(OUT))
  .on("finish", () => {
    console.log("✓ Document généré (méthode native) :", path.basename(OUT));
  });
