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

  // I11-I15 — peintures, styles variés
  { code: "I11", titre: "Le Cri",                                     auteur: "Edvard Munch" },
  { code: "I12", titre: "Nymphéas",                                   auteur: "Claude Monet" },
  { code: "I13", titre: "Bal du moulin de la Galette",                auteur: "Auguste Renoir" },
  { code: "I14", titre: "Le Trois Mai 1808",                          auteur: "Francisco de Goya" },
  { code: "I15", titre: "Composition en rouge, bleu et jaune",        auteur: "Piet Mondrian" },

  // I16-I20 — photographies, genres variés
  { code: "I16", titre: "Lever de Terre (Earthrise)",                 auteur: "NASA, 1968" },
  { code: "I17", titre: "Vallée de Yosemite",                         auteur: "Carleton Watkins, v. 1865" },
  { code: "I18", titre: "Dust Bowl, Texas",                           auteur: "Arthur Rothstein, 1936" },
  { code: "I19", titre: "La Vallée de l'ombre de la mort",            auteur: "Roger Fenton, 1855" },
  { code: "I20", titre: "Portrait de Charles Darwin",                 auteur: "Julia Margaret Cameron, 1868" },

  // I21-I24 — dessins
  { code: "I21", titre: "L'Homme de Vitruve",                         auteur: "Léonard de Vinci" },
  { code: "I22", titre: "Mains en prière",                            auteur: "Albrecht Dürer, 1508" },
  { code: "I23", titre: "Le Rhinocéros",                              auteur: "Albrecht Dürer, 1515" },
  { code: "I24", titre: "Croquis (Hokusai Manga)",                    auteur: "Katsushika Hokusai" },

  // I25-I26 — vidéos très courtes
  { code: "I25", titre: "Cheval au galop (étude de mouvement)",       auteur: "Eadweard Muybridge, 1878" },
  { code: "I26", titre: "Premier éternuement filmé",                  auteur: "Thomas Edison, 1894" },
];

/* Codes I27 à I50 : emplacements libres pour vos propres images/vidéos
   (titre/auteur à renseigner ici une fois ajoutés, facultatif). */
for (let n = 27; n <= 50; n++) IMAGE_CORPUS.push({ code: "I" + n, titre: "", auteur: "" });

/* Chaque entrée pointe par défaut vers images/bank/<code>.jpg */
IMAGE_CORPUS.forEach((e) => { e.src = "images/bank/" + e.code + ".jpg"; });

/* --- Images/vidéos déjà fournies (autres extensions que .jpg) --- */
const IMAGES_FOURNIES = {
  I25: "images/bank/I25.webm", // Muybridge — Cheval au galop (domaine public)
  I26: "images/bank/I26.webm", // Edison — Premier éternuement filmé (domaine public)
};
IMAGE_CORPUS.forEach((e) => { if (IMAGES_FOURNIES[e.code]) e.src = IMAGES_FOURNIES[e.code]; });
