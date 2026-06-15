# CV — Joël Deboston Tchinda (générateur `.docx`)

Script Node.js qui reconstruit le CV au format Word (`.docx`) **à l'identique**
du fichier d'origine : même mise en page, mêmes polices, tailles, couleurs,
espacements, taquets de tabulation, indentations, tableau et liens hypertextes.

## Utilisation

```bash
npm install
node generate_cv.js
```

Cela produit le fichier `Joel_Tchinda_alternance_data_EPITECH.docx`.

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
