# Comment héberger votre site sur Vercel gratuitement

Voici la méthode la plus simple et professionnelle pour mettre votre site en ligne. Vercel est excellent car il est gratuit pour les projets personnels, très rapide et sécurisé (HTTPS inclus).

## Méthode recommandée : Via GitHub (Automatique)
C'est la meilleure méthode car votre site se mettra à jour automatiquement à chaque fois que vous modifiez vos fichiers.

### Étape 1 : Préparer les fichiers
Assurez-vous que tous vos fichiers (`index.html`, `styles.css`, `script.js` et le dossier `assets`) sont bien dans votre dossier `dj lr`.

### Étape 2 : Mettre sur GitHub
1.  Créez un compte sur [GitHub.com](https://github.com) si ce n'est pas fait.
2.  Téléchargez et installez **GitHub Desktop** (plus simple que la ligne de commande).
3.  Dans GitHub Desktop :
    *   Allez dans `File` > `New Repository`.
    *   Nom : `dj-lr-events`.
    *   Local Path : Choisissez le dossier parent de votre projet.
    *   Une fois créé, copiez vos fichiers (html, css, images) DANS ce nouveau dossier créé par GitHub Desktop.
    *   Entrez un résumé (ex: "Premier commit") et cliquez sur **Commit to main**.
    *   Cliquez sur **Publish repository**.

### Étape 3 : Connecter Vercel
1.  Allez sur [Vercel.com](https://vercel.com) et créez un compte (connectez-vous avec GitHub, c'est plus simple).
2.  Sur votre tableau de bord (Dashboard), cliquez sur **"Add New..."** > **"Project"**.
3.  Vous verrez votre projet `dj-lr-events` dans la liste "Import Git Repository".
4.  Cliquez sur **Import**.
5.  Laissez les réglages par défaut (Framework Preset: Other / None).
6.  Cliquez sur **Deploy**.

🎉 **C'est fini !** Vercel va vous donner un lien (ex: `dj-lr-events.vercel.app`) que vous pourrez partager à tout le monde.

---

## Méthode alternative (Sans GitHub) : Vercel CLI

Si vous avez installé Node.js sur votre ordinateur :

1.  Ouvrez un terminal (PowerShell ou CMD) dans le dossier de votre site.
2.  Installez l'outil Vercel :
    ```bash
    npm i -g vercel
    ```
3.  Connectez-vous :
    ```bash
    vercel login
    ```
4.  Déployez :
    ```bash
    vercel
    ```
5.  Répondez aux questions (tapez Entrée à chaque fois pour dire "Oui/Défaut").

Votre site sera en ligne en quelques secondes !
