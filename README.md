# Le Meeting Point 🎬🎼

Site pédagogique pour faire découvrir la musique classique au collège.
**En ligne :** https://lemeetingpoint.onrender.com

---

## ✏️ Modifier le site avec Claude Code (guide pour Richard)

Tu peux éditer le site depuis ton ordinateur, en langage naturel, avec **Claude Code**.
Tes changements se publient ensuite en ligne tout seuls.

### 1. Une seule fois : installer les outils
1. **Git** : https://git-scm.com/downloads/win (garder les options par défaut).
2. **Claude Code** — ouvrir **PowerShell** et lancer :
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
   Puis se connecter avec ton **compte Claude** (au premier lancement de `claude`).
3. **Accès au projet** : demande à Jan de t'ajouter comme *collaborateur* du dépôt GitHub
   (il le fait dans Settings → Collaborators). Tu recevras une invitation à accepter.

### 2. Récupérer le site (une fois)
```powershell
cd C:\Users\Richard\Documents
git clone https://github.com/Teachyou2/lemeetingpoint.git
cd lemeetingpoint
```

### 3. Éditer
Dans le dossier du projet :
```powershell
claude
```
Puis demande simplement ce que tu veux, par exemple :
- « Ajoute une 7e émotion au jeu de l'étape 1. »
- « Change les couleurs pour un thème plus doux. »
- « Ajoute 5 musiques au corpus. »

### 4. Publier tes changements
Quand tu es content, demande à Claude Code de publier, ou tape :
```powershell
git pull        # récupérer d'éventuels changements récents
git add -A
git commit -m "Ce que j'ai changé"
git push
```
➡️ Le site en ligne se met à jour automatiquement en ~1 minute.

> 💡 Réflexe : fais `git pull` **avant** de commencer à éditer, pour partir de la dernière version.

---

Pour tout le détail technique du projet, voir **`CLAUDE.md`** (lu automatiquement par Claude Code)
et **`GUIDE-PROFESSEUR.md`** (utilisation en classe).
