# 🎯 Spotlight Studio

**Spotlight Studio** est un outil de présentation commerciale pour la vente de sites vitrines — conçu pour montrer des démos live à des clients, leur permettre de choisir le style qui leur correspond, et livrer rapidement grâce à une base technique prête à l'emploi.

🔗 **Live demo :** [baudryalexandre.github.io/Spotlight_Studio](https://baudryalexandre.github.io/Spotlight_Studio/)

---

## 💡 Le concept

Spotlight Studio est conçu pour **simplifier la vente et la livraison de sites vitrines** grâce à :

- Une **démonstration interactive** pour les clients.
- Un **prototype universel** pour une personnalisation rapide.
- Une **livraison accélérée** grâce à une base technique prête à l’emploi.


### Processus de vente en 4 étapes :

1. **Découverte** : Le client explore les démos live des sites vitrines.
2. **Choix** : Il sélectionne le style qui lui convient.
3. **Personnalisation** : Adaptation rapide du contenu (textes, couleurs, images).
4. **Livraison** : Site vitrine professionnel livré en un temps record.

➡️ **Chaque démo est fonctionnelle** – pas de maquettes statiques, mais des sites réels !

---

## 🗂️ Structure du projet

```
Spotlight_Studio/
├── index.html            # Interface client (visualisateur)
├── server.js             # Serveur Node.js (développement local)
├── assets/
│   ├── css/              # Css complet du visualisateur
│   ├── js/               # Logique JavaScript
│   └── images/           # Images partagées
├── tmp_proto/            # Prototype universel (base technique commune)
└── salon_de_coiffure/    # Exemple de site vitrine personnalisé
```

---


## 🧩 Fonctionnement

### 1️⃣ Le Visualisateur – Interface Client
- **Navigation intuitive** : Filtres par statut (`Stable`/`Proto`).
- **Prévisualisation live** : Le client voit le rendu en temps réel.
- **Comparaison facile** : Basculer entre les styles en un clic.

### 2️⃣ `tmp_proto` – Le Prototype Universel
- **Squelette commun** : Structure HTML/CSS finalisée, sans contenu spécifique.
- **Personnalisation rapide** :
  - Remplacement des textes, logos et images.
  - Adaptation des couleurs à la charte client.
- **Gain de temps** : Pas de développement à partir de zéro.

### 3️⃣ Les Sites Vitrines – Démos Client
- **Exemples concrets** : Chaque site montre le résultat final possible.
- **Catalogue évolutif** : Ajout de nouveaux secteurs d’activité (ex : salon de coiffure, restaurant, etc.).
---

## 🛠️ Stack technique

| Technologie | Usage |
|---|---|
| HTML | Structure des pages |
| CSS | Mise en forme et design |
| JavaScript | Logique du visualisateur |
| Go Template | Templating (rendu dynamique) |
| Node.js | Serveur de développement local |

---

## 🚀 Installation en local

```bash
# Cloner le dépôt
git clone https://github.com/baudryalexandre/Spotlight_Studio.git
cd Spotlight_Studio

# Installer les dépendances
npm install

# Démarrer le serveur
node server.js
```

Puis ouvrir `http://localhost:[PORT]` dans le navigateur.

---

## 👤 Auteur

**Alexandre Baudry**
© 2025 — Tous droits réservés