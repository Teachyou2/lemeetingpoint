# Le Meeting Point — Guide du professeur

Site web autonome pour la séquence *« Quand une image cherche sa musique »*
(éducation musicale, cycle 4). Aucune installation, aucune connexion requise.

---

## 1. Ouvrir le site

Double-cliquez sur **`index.html`**.
Il s'ouvre dans n'importe quel navigateur (Chrome, Edge, Firefox…).

Les fichiers du dossier :

| Fichier | Rôle |
|---|---|
| `index.html` | La page du parcours élève |
| `styles.css` | La mise en forme |
| `app.js` | Le fonctionnement (navigation, sélection, sauvegarde) |
| `corpus.js` | La liste des 50 musiques + leurs noms (à modifier ici si besoin) |
| `audio/` | **Vous y déposez les extraits sonores** (voir §2) |

---

## 2. Ajouter le son

**10 extraits libres de test sont DÉJÀ fournis** (domaine public + Creative Commons)
pour les codes : A2, B1, B7, C4, C5, D1, E4, F2, G2, H4.
👉 Détail des sources et licences dans **`CREDITS-AUDIO.md`**.

Le corpus est **« aveugle »** : les élèves ne voient qu'un code (A1, B3…), jamais le titre.
Pour compléter les **40 autres**, déposez vos extraits dans le dossier **`audio/`**.

- Un fichier **MP3** par extrait, nommé **exactement d'après le code** :
  `audio/A1.mp3`, `audio/A3.mp3`, … `audio/H6.mp3`
- **~30 secondes** suffisent (cadre de la citation courte / exception pédagogique).
- Tant qu'un fichier manque, la carte affiche « extrait à ajouter » — le reste marche quand même.
- Où trouver d'autres extraits libres : **musopen.org** (filtre « Public Domain ») et
  **Wikimedia Commons**. Formats acceptés : `.mp3`, `.ogg`, `.oga`, `.wav`.

> La correspondance code → œuvre est dans `corpus.js` et dans le **Mode professeur** (§4).

**Où trouver les extraits ?** À partir de vos propres CD/fichiers, ou d'un enregistrement
que vous découpez (Audacity, gratuit). Rappel : gardez les montages **en classe**, ne les
publiez pas en ligne sans autorisation des ayants droit.

---

## 3. Le parcours élève (5 étapes)

1. **Ressentir** — une même image change de sens selon la musique.
2. **Créer** — l'élève fabrique son image de 30-60 s (sans musique).
3. **Chercher** — il explore les 50 mystères, met des ♡, garde 2 finalistes ⭐, choisit 🏆.
4. **Expliquer** — sa fiche se remplit ; il l'imprime et en discute avec vous.

Tout ce que l'élève saisit est **sauvegardé automatiquement dans son navigateur**
(bouton *Tout recommencer* dans le pied de page pour effacer).

> ⚠️ La sauvegarde est **locale à l'ordinateur/navigateur utilisé**. Si les élèves changent
> de poste, ils repartent de zéro. Pour garder une trace : **« Imprimer / enregistrer ma fiche »**
> à l'étape 4 (imprime uniquement la fiche, ou l'enregistre en PDF).

---

## 4. Mode professeur

Bouton **« 👩‍🏫 Mode prof »** en haut à droite.
**Code d'accès : `prof`** (modifiable dans `app.js`, cherchez `=== "prof"`).

Une fois activé :
- la **légende des 8 familles sensibles** apparaît ;
- chaque carte affiche **compositeur + œuvre** ;
- à l'étape 4, un bouton **« Révéler son nom »** dévoile la musique choisie par l'élève —
  le fameux moment *« C'est ça, du classique ?! »*.

---

## 5. Personnaliser

- **Changer/retirer des musiques** : éditez `corpus.js` (respectez le format des codes).
- **Réduire le corpus** (élèves fragiles) : supprimez des lignes dans `corpus.js`.
- **Changer le code prof** ou les textes : `app.js` / `index.html`.

---

## 6. Mettre en ligne (facultatif)

Pour que les élèves y accèdent depuis chez eux ou l'ENT, déposez **tout le dossier**
(y compris `audio/`) sur :
- l'**ENT** ou le serveur du collège,
- ou un hébergement gratuit type **Netlify / GitHub Pages** (glisser-déposer du dossier).

Le site est 100 % statique : pas de base de données, pas de serveur à maintenir.
