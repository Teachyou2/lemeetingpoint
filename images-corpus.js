/* ============================================================
   LE MEETING POINT — Données de la banque d'images
   ------------------------------------------------------------
   Une image/vidéo « mystère » par code (I1, I2, …), symétrique au
   corpus musical de corpus.js. L'élève ne voit que le code ; le
   titre/auteur ne sont révélés qu'en "Mode professeur".

   POUR AJOUTER UNE IMAGE :
   Déposez un fichier dans  images/bank/  nommé exactement d'après
   le code, ex. images/bank/I11.jpg — ou utilisez le panneau d'import
   du mode prof (étape 2) pour l'ajouter depuis cet ordinateur.
   Tant qu'un fichier est absent, la carte affiche « image à ajouter ».
   ============================================================ */

const IMAGE_CORPUS = [
  { code: "I1",  titre: "La Grande Vague de Kanagawa",              auteur: "Hokusai" },
  { code: "I2",  titre: "La Nuit étoilée",                          auteur: "Van Gogh" },
  { code: "I3",  titre: "La Jeune Fille à la perle",                 auteur: "Vermeer" },
  { code: "I4",  titre: "Un dimanche après-midi à l'île de la Grande Jatte", auteur: "Seurat" },
  { code: "I5",  titre: "La Liberté guidant le peuple",               auteur: "Delacroix" },
  { code: "I6",  titre: "Le Radeau de la Méduse",                     auteur: "Géricault" },
  { code: "I7",  titre: "Impression, soleil levant",                  auteur: "Monet" },
  { code: "I8",  titre: "Le Baiser",                                  auteur: "Klimt" },
  { code: "I9",  titre: "Composition VIII",                           auteur: "Kandinsky" },
  { code: "I10", titre: "Migrant Mother",                             auteur: "Dorothea Lange (photographie, 1936)" },
];

/* Codes I11 à I50 : emplacements libres pour vos propres images/vidéos
   (titre/auteur à renseigner ici une fois ajoutés, facultatif). */
for (let n = 11; n <= 50; n++) IMAGE_CORPUS.push({ code: "I" + n, titre: "", auteur: "" });

/* Chaque entrée pointe par défaut vers images/bank/<code>.jpg */
IMAGE_CORPUS.forEach((e) => { e.src = "images/bank/" + e.code + ".jpg"; });

/* --- Images déjà fournies (autres extensions que .jpg) --- */
const IMAGES_FOURNIES = {
  // (aucune pour l'instant — les 10 premières sont déjà en .jpg)
};
IMAGE_CORPUS.forEach((e) => { if (IMAGES_FOURNIES[e.code]) e.src = IMAGES_FOURNIES[e.code]; });
