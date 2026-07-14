# Donner à Richard les droits d'éditer le site avec Claude Code

**Le principe :** Richard édite le site sur son ordinateur avec Claude Code →
il « pousse » (push) ses changements sur GitHub → Render redéploie automatiquement
le site en ligne. Il n'a donc rien à toucher sur Render au quotidien.

Pour ça, il faut : (A) lui donner l'accès en écriture au dépôt GitHub, et
(B) qu'il installe les outils sur sa machine.

---

## A. Côté Jan — donner l'accès au dépôt (2 minutes)

> Richard doit d'abord avoir un **compte GitHub** et vous communiquer son
> **nom d'utilisateur** (ou l'e-mail de son compte).

1. Ouvrez le dépôt : `https://github.com/Teachyou2/lemeetingpoint`
2. Onglet **Settings** (en haut à droite).
3. Menu de gauche : **Collaborators** (sous « Access »).
   GitHub peut redemander votre mot de passe.
4. Bouton **Add people** → tapez le nom d'utilisateur GitHub de Richard → sélectionnez-le
   → **Add to repository**.
5. Richard reçoit une **invitation par e-mail** qu'il doit **accepter**.

✅ Il a alors un accès **en écriture** : il peut récupérer le code, le modifier, le
renvoyer, et le site se met à jour tout seul.

### Nuance « exactement les mêmes droits que moi »
Sur un dépôt personnel, un collaborateur a le droit d'**écrire/pousser** (largement
suffisant pour éditer et publier), mais **pas** de supprimer le dépôt ni de gérer les
réglages/les autres collaborateurs — ça reste réservé au propriétaire (vous).
Si vous voulez que Richard ait un pouvoir **strictement égal** au vôtre, il faut déplacer
le dépôt dans une **Organisation GitHub** (gratuite) et l'y ajouter comme **Owner**.
Pour un usage d'édition normal, ce n'est pas nécessaire.

---

## B. Côté Richard — installer les outils (une seule fois)

Sur son ordinateur Windows 11 :

### 1. Installer Git
Télécharger et installer **Git for Windows** : https://git-scm.com/downloads/win
(garder toutes les options par défaut).

### 2. Installer Claude Code
Ouvrir **PowerShell** et lancer :
```powershell
irm https://claude.ai/install.ps1 | iex
```
Vérifier :
```powershell
claude --version
```

> Il lui faut son **propre compte Claude** (abonnement Pro/Max recommandé). La première
> fois, `claude` ouvre le navigateur pour se connecter — ensuite c'est mémorisé.

### 3. Récupérer le site
Choisir un dossier de travail, puis :
```powershell
cd C:\Users\Richard\Documents
git clone https://github.com/Teachyou2/lemeetingpoint.git
cd lemeetingpoint
```
(La première fois, Git lui demandera de se connecter à GitHub — il accepte dans le navigateur.)

### 4. Éditer avec Claude Code
Dans le dossier du projet :
```powershell
claude
```
Il peut alors demander à Claude Code de modifier le site (textes, couleurs, corpus…).

### 5. Publier ses changements
Une fois content de ses modifs, il peut demander à Claude Code de les envoyer, ou taper :
```powershell
git add -A
git commit -m "Mes modifications"
git push
```
👉 Render détecte le push et **redéploie automatiquement** https://lemeetingpoint.onrender.com
en ~1 minute.

---

## C. (Optionnel) Accès à Render

Éditer le contenu **ne nécessite pas** d'accès à Render (le redéploiement est automatique
via GitHub). Si Richard doit aussi **gérer le service** lui-même (réglages, redéploiement
manuel, logs) :
- Render → votre projet → **Settings** → **Members** → inviter Richard par e-mail.
- (Selon le plan Render, l'ajout de membres peut nécessiter un plan payant.)

---

## Bonnes pratiques pour éditer à deux
- **Avant de commencer à modifier**, faire `git pull` pour récupérer la dernière version.
- Faire des `commit` courts et fréquents avec un message clair.
- Si deux personnes modifient le même fichier en même temps, Git peut signaler un
  « conflit » : Claude Code sait aider à le résoudre.
