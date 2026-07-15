# CLAUDE.md — contexte projet pour Claude Code

## Le projet
**Le Meeting Point (LMP)** — site web pédagogique (éducation musicale, collège cycle 4).
L'élève crée une image/vidéo, écoute un corpus de 50 musiques classiques « aveugles »
(codées, sans titre), choisit celle qui épouse sa création, puis en discute avec le prof.

- **Site 100 % statique**, sans build, sans dépendance (JavaScript vanilla).
- **En ligne** : https://lemeetingpoint.onrender.com (Render, static site).
- **Dépôt** : github.com/Teachyou2/lemeetingpoint (branche `main`).

## Fichiers
| Fichier | Rôle |
|---|---|
| `index.html` | Toute la structure du parcours (5 étapes, sections `[data-step]`). |
| `styles.css` | Styles. Thème clair/sombre via `prefers-color-scheme`. Variables CSS dans `:root`. |
| `app.js` | Toute la logique (navigation, jeu étape 1, corpus, création élève, mode prof, fiche). |
| `corpus.js` | Données des 50 musiques (`CORPUS`), familles (`FAMILLES`), et `AUDIO_FOURNIS` (extraits déjà présents). |
| `zip.js` | Générateur ZIP maison (export des musiques prof), sans dépendance. |
| `audio/` | Fichiers audio, nommés par code (`A1.mp3`, `B7.ogg`, …). |
| `render.yaml` | Config Render (déploiement statique). |
| `.github/workflows/deploy-render.yml` | Auto-déploiement (appelle le Deploy Hook Render). |

## Concepts clés
- **Corpus « aveugle »** : les élèves ne voient que le code (A1…H6). Titres/compositeurs sont
  dans `corpus.js` et révélés seulement en **mode prof** (bouton en haut à droite, code `prof`,
  défini dans `app.js`).
- **Étape 1** = mini-jeu « devine l'émotion » (voir `EMO`, `GAME_ROUNDS`, `renderGame` dans app.js).
  La scène est un SVG dont la teinte change en JS (fonction `applyMood`).
- **Création de l'élève** (étapes 2-3) : upload vidéo/image ou lien YouTube, stocké en **IndexedDB**
  (`IDB`, clé `__creation__`). Voir `refreshCreation`.
- **Import audio prof** : glisser des fichiers → IndexedDB (jouent aussitôt sur ce poste) +
  export `audio.zip` à pousser dans `audio/`. Voir le panneau `#prof-audio`.
- **Sauvegarde élève** : `localStorage` (clé `meetingpoint.v1`).

## Lancer en local
Pas de build. Ouvrir `index.html` dans un navigateur suffit pour l'essentiel.
Pour tester l'audio proprement (requêtes Range), servir le dossier via un petit serveur statique.

## Déployer
`git push` sur `main`. Si le secret `RENDER_DEPLOY_HOOK` est configuré (GitHub → Settings →
Secrets → Actions), la GitHub Action redéploie Render **automatiquement**. Sinon : Render →
service lemeetingpoint → **Manual Deploy → Deploy latest commit**.

## Conventions
- Interface **en français**, ton adapté aux collégiens.
- JavaScript vanilla, pas de framework, pas d'étape de build.
- Ne pas committer `.claude/` (déjà dans `.gitignore`).
- Extraits audio : privilégier le **domaine public / Creative Commons** (voir `CREDITS-AUDIO.md`)
  et ~30 s par extrait.
