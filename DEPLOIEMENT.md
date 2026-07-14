# Mettre le site en ligne pour Richard

Le site est **100 % statique** : n'importe quel hébergeur de fichiers convient.
Voici les deux chemins possibles. Tout est déjà prêt (dépôt Git initialisé + archive
`le-meeting-point.zip` dans `C:\Users\User\`).

---

## 🟢 Option A — La plus RAPIDE (sans compte, lien temporaire) : Netlify Drop

Idéale pour donner vite un accès à Richard.

1. Décompressez `C:\Users\User\le-meeting-point.zip` dans un dossier.
2. Allez sur **https://app.netlify.com/drop**
3. **Glissez le dossier décompressé** dans la zone indiquée.
4. En quelques secondes, vous obtenez un lien du type
   `https://nom-au-hasard.netlify.app` → **envoyez-le à Richard**.

> Sans compte, le site reste en ligne un moment puis expire. Pour le garder,
> créez un compte gratuit Netlify quand il vous le propose (bouton « Claim this site »).

---

## 🔵 Option B — Render (ce que vous avez demandé)

Render déploie un site statique **depuis un dépôt Git (GitHub)**. Il faut donc d'abord
mettre le code sur GitHub, puis brancher Render dessus.

### Étape 1 — Mettre le code sur GitHub
**Le plus simple (par le navigateur, sans ligne de commande) :**
1. Créez un compte sur **https://github.com** (gratuit) si besoin.
2. Cliquez **New repository** → nommez-le `le-meeting-point` → **Create**.
3. Sur la page du dépôt vide : **« uploading an existing file »**.
4. Décompressez le ZIP et **glissez tous les fichiers + le dossier `audio/`** dans la page.
5. **Commit changes**.

### Étape 2 — Déployer sur Render
1. Créez un compte sur **https://render.com** (gratuit) et connectez votre GitHub.
2. **New +** → **Static Site**.
3. Choisissez le dépôt `le-meeting-point`.
4. Réglages :
   - **Build Command** : *(laisser vide)*
   - **Publish Directory** : `.`  (un simple point)
5. **Create Static Site**. Render construit et vous donne une URL du type
   `https://le-meeting-point.onrender.com` → **envoyez-la à Richard**.

> Le fichier `render.yaml` déjà présent configure ça automatiquement : Render peut aussi
> le détecter via **New + → Blueprint**.

---

## ⚠️ À savoir avant de publier
- **Crédits musique** : le fichier `CREDITS-AUDIO.md` doit rester en ligne — il sert
  d'attribution pour les 4 extraits en Creative Commons (voir ce fichier).
- **Ne mettez PAS en ligne les montages d'élèves** contenant des extraits de films : en classe
  c'est couvert par l'exception pédagogique, mais **pas** en diffusion publique.
- Les sauvegardes de progression des élèves restent **locales à leur navigateur** (rien n'est
  envoyé au serveur) — c'est valable aussi en ligne.
