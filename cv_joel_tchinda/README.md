# CV — Joël Deboston Tchinda (générateur `.docx`)

Deux méthodes pour reconstruire le CV au format Word (`.docx`).

## Méthode native (recommandée) — `build.js`

Reconstruit le `.docx` directement à partir de son **OOXML d'origine** : les
fichiers XML internes exacts écrits par Word (dans `src/`), simplement
re-compressés dans le conteneur ZIP `.docx`. Le rendu est **strictement
identique** à votre Word, car ce sont les mêmes octets.

```bash
npm install
node build.js
```

Les 9 parties internes du paquet généré sont identiques **octet pour octet**
à celles du document source.

## Méthode librairie (alternative) — `generate_cv.js`

Recrée le document programmatiquement avec la librairie `docx`. Le texte, les
liens et le formatage sont fidèles, mais le rendu peut légèrement différer car
la librairie regénère ses propres styles/thème.

```bash
npm run build:lib
```

Les deux produisent `Joel_Tchinda_alternance_data_EPITECH.docx`.

## Détails de reproduction

- **Page** : A4 portrait (11906 × 16838 twips), marges haut/bas 720, gauche/droite 900.
- **Police** par défaut : Aptos (11 pt) ; tailles spécifiques en demi-points (19 = 9,5 pt, etc.).
- **En-têtes de section** : gras 11 pt avec bordure inférieure simple.
- **Dates** alignées à droite via un taquet de tabulation à 10106 twips.
- **Puces** : tiret `–` avec retrait suspendu (left 420 / hanging 280).
- **Tableau** 3 colonnes (Soft skills / Langues / Centres d'intérêt) sans bordures.
- **Liens** soulignés avec les couleurs exactes de la source (`0563c1` / `1155cc`).

Fidélité vérifiée : 0 différence de texte, de liens et de formatage
(gras / italique / souligné / taille) au niveau caractère par rapport au document source.
