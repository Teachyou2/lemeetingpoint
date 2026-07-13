/* ============================================================
   LE MEETING POINT — Données du corpus
   ------------------------------------------------------------
   50 extraits classiques présentés AUX ÉLÈVES uniquement par
   leur code (A1, B3, …). Les titres/compositeurs ne sont
   révélés qu'en "Mode professeur".

   POUR AJOUTER LE SON :
   Déposez un fichier audio dans le dossier  audio/
   nommé exactement d'après le code, en .mp3
   Exemples :   audio/A1.mp3   audio/B3.mp3   audio/H6.mp3
   (Un extrait d'environ 30 secondes suffit.)
   Tant qu'un fichier est absent, la carte affiche
   « extrait à ajouter » — le reste du site fonctionne.
   ============================================================ */

const FAMILLES = {
  A: { nom: "Tristesse · deuil · mélancolie", couleur: "#5b6bce" },
  B: { nom: "Tension · violence · peur · suspense", couleur: "#c0392b" },
  C: { nom: "Joie · triomphe · fête", couleur: "#e39c1c" },
  D: { nom: "Sérénité · contemplation · douceur", couleur: "#2a9d8f" },
  E: { nom: "Mystère · étrange · onirique", couleur: "#7d5ba6" },
  F: { nom: "Grandeur · épique · héroïque", couleur: "#9c6b30" },
  G: { nom: "Énergie · mouvement · vitesse", couleur: "#d1495b" },
  H: { nom: "Tendresse · amour · intime", couleur: "#e07a9c" },
};

/* Chaque entrée : code, compositeur, oeuvre (révélés en mode prof). */
const CORPUS = [
  // A — Tristesse / deuil / mélancolie
  { code: "A1", compositeur: "Barber",        oeuvre: "Adagio for Strings" },
  { code: "A2", compositeur: "Albinoni",      oeuvre: "Adagio en sol mineur" },
  { code: "A3", compositeur: "Chopin",        oeuvre: "Marche funèbre (Sonate n°2)" },
  { code: "A4", compositeur: "Arvo Pärt",     oeuvre: "Spiegel im Spiegel" },
  { code: "A5", compositeur: "Purcell",       oeuvre: "Dido's Lament" },
  { code: "A6", compositeur: "Górecki",       oeuvre: "Symphonie n°3 (2e mvt)" },

  // B — Tension / violence / peur / suspense
  { code: "B1", compositeur: "Beethoven",     oeuvre: "Symphonie n°5 (ouverture)" },
  { code: "B2", compositeur: "Stravinsky",    oeuvre: "Le Sacre du printemps (Danse sacrale)" },
  { code: "B3", compositeur: "Orff",          oeuvre: "Carmina Burana — O Fortuna" },
  { code: "B4", compositeur: "Moussorgski",   oeuvre: "Une nuit sur le mont Chauve" },
  { code: "B5", compositeur: "Penderecki",    oeuvre: "Thrène pour les victimes d'Hiroshima" },
  { code: "B6", compositeur: "Holst",         oeuvre: "Mars (Les Planètes)" },
  { code: "B7", compositeur: "Grieg",         oeuvre: "Dans l'antre du roi de la montagne" },

  // C — Joie / triomphe / fête
  { code: "C1", compositeur: "Beethoven",     oeuvre: "Hymne à la joie (9e symphonie)" },
  { code: "C2", compositeur: "Haendel",       oeuvre: "Hallelujah (Le Messie)" },
  { code: "C3", compositeur: "Rossini",       oeuvre: "Guillaume Tell (final)" },
  { code: "C4", compositeur: "Offenbach",     oeuvre: "Galop infernal (Cancan)" },
  { code: "C5", compositeur: "Vivaldi",       oeuvre: "Le Printemps (Les Quatre Saisons)" },
  { code: "C6", compositeur: "J. Strauss II",  oeuvre: "Le Beau Danube bleu" },
  { code: "C7", compositeur: "Tchaïkovski",   oeuvre: "Ouverture 1812 (final)" },

  // D — Sérénité / contemplation / douceur
  { code: "D1", compositeur: "Debussy",       oeuvre: "Clair de lune" },
  { code: "D2", compositeur: "Satie",         oeuvre: "Gymnopédie n°1" },
  { code: "D3", compositeur: "Pachelbel",     oeuvre: "Canon en ré" },
  { code: "D4", compositeur: "Ravel",         oeuvre: "Pavane pour une infante défunte" },
  { code: "D5", compositeur: "Bach",          oeuvre: "Air (Suite en ré, BWV 1068)" },
  { code: "D6", compositeur: "Mascagni",      oeuvre: "Intermezzo (Cavalleria Rusticana)" },
  { code: "D7", compositeur: "Beethoven",     oeuvre: "Sonate « Clair de lune » (1er mvt)" },

  // E — Mystère / étrange / onirique
  { code: "E1", compositeur: "Debussy",       oeuvre: "Prélude à l'après-midi d'un faune" },
  { code: "E2", compositeur: "Ligeti",        oeuvre: "Atmosphères" },
  { code: "E3", compositeur: "Saint-Saëns",   oeuvre: "Aquarium (Le Carnaval des animaux)" },
  { code: "E4", compositeur: "Dukas",         oeuvre: "L'Apprenti sorcier" },
  { code: "E5", compositeur: "Moussorgski",   oeuvre: "Gnomus (Tableaux d'une exposition)" },
  { code: "E6", compositeur: "Saint-Saëns",   oeuvre: "Danse macabre" },

  // F — Grandeur / épique / héroïque
  { code: "F1", compositeur: "R. Strauss",    oeuvre: "Ainsi parlait Zarathoustra (ouverture)" },
  { code: "F2", compositeur: "Wagner",        oeuvre: "La Chevauchée des Walkyries" },
  { code: "F3", compositeur: "Holst",         oeuvre: "Jupiter (Les Planètes)" },
  { code: "F4", compositeur: "Verdi",         oeuvre: "Marche triomphale (Aïda)" },
  { code: "F5", compositeur: "Elgar",         oeuvre: "Pomp and Circumstance n°1" },

  // G — Énergie / mouvement / vitesse
  { code: "G1", compositeur: "Khatchatourian", oeuvre: "Danse du sabre" },
  { code: "G2", compositeur: "Rimski-Korsakov", oeuvre: "Le Vol du bourdon" },
  { code: "G3", compositeur: "Prokofiev",     oeuvre: "Danse des chevaliers (Roméo et Juliette)" },
  { code: "G4", compositeur: "Bizet",         oeuvre: "Danse bohème (Carmen)" },
  { code: "G5", compositeur: "Rossini",       oeuvre: "Guillaume Tell (galop)" },
  { code: "G6", compositeur: "Brahms",        oeuvre: "Danse hongroise n°5" },

  // H — Tendresse / amour / intime
  { code: "H1", compositeur: "Tchaïkovski",   oeuvre: "Roméo et Juliette (thème d'amour)" },
  { code: "H2", compositeur: "Rachmaninov",   oeuvre: "Concerto pour piano n°2 (2e mvt)" },
  { code: "H3", compositeur: "Puccini",       oeuvre: "O mio babbino caro" },
  { code: "H4", compositeur: "Massenet",      oeuvre: "Méditation de Thaïs" },
  { code: "H5", compositeur: "Elgar",         oeuvre: "Salut d'amour" },
  { code: "H6", compositeur: "Fauré",         oeuvre: "Après un rêve" },
];

/* Chaque extrait pointe par défaut vers audio/<code>.mp3 */
CORPUS.forEach((e) => {
  e.famille = e.code[0];
  e.src = "audio/" + e.code + ".mp3";
});

/* --- Extraits libres de test déjà fournis (autres extensions que .mp3) ---
   Voir CREDITS-AUDIO.md pour les sources et licences.
   Pour ajouter les vôtres : déposez audio/<code>.mp3 et retirez la ligne ici. */
const AUDIO_FOURNIS = {
  A2: "audio/A2.wav",   // Albinoni — Adagio (CC BY-SA 4.0)
  B1: "audio/B1.ogg",   // Beethoven — Symphonie n°5 (domaine public)
  B7: "audio/B7.ogg",   // Grieg — Antre du roi de la montagne (domaine public)
  C4: "audio/C4.ogg",   // Offenbach — Galop infernal / Cancan (domaine public)
  C5: "audio/C5.oga",   // Vivaldi — Le Printemps (CC BY-SA)
  D1: "audio/D1.ogg",   // Debussy — Clair de lune (CC BY 3.0)
  E4: "audio/E4.ogg",   // Dukas — L'Apprenti sorcier (domaine public)
  F2: "audio/F2.ogg",   // Wagner — Chevauchée des Walkyries (domaine public)
  G2: "audio/G2.oga",   // Rimski-Korsakov — Vol du bourdon (domaine public)
  H4: "audio/H4.ogg",   // Massenet — Méditation de Thaïs (CC BY-SA 4.0)
};
CORPUS.forEach((e) => { if (AUDIO_FOURNIS[e.code]) e.src = AUDIO_FOURNIS[e.code]; });
