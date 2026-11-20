
# Product API

API REST CRUD de gestion de produits, développée avec **Node.js** et **Express**.

Elle permet de créer, consulter, modifier et supprimer des produits.

> **Remarque :** Les données sont conservées en mémoire. Elles sont donc réinitialisées à chaque redémarrage du serveur.

## Fonctionnalités

- Opérations CRUD sur les produits.
- Validation des paramètres et du corps des requêtes.
- Gestion centralisée des erreurs.
- Documentation interactive avec Swagger UI.
- Architecture organisée en routes, contrôleurs, services et repositories.

## Prérequis

- Node.js 18 ou une version plus récente.
- npm.

## Installation

Clonez le dépôt, puis installez les dépendances :

```bash
git clone <URL_DU_DEPOT>
cd node-product-api
npm install
```

Créez ensuite un fichier `.env` à la racine du projet :

```env
PORT=3000
NODE_ENV=development
```

## Démarrage

### Mode développement

Démarrez le serveur avec redémarrage automatique :

```bash
npm run dev
```

### Mode normal

```bash
npm start
```

L'API est alors accessible à l'adresse suivante :

http://localhost:3000

## Documentation Swagger

Une fois le serveur démarré, accédez à :

- **Swagger UI :** http://localhost:3000/api-docs
- **Spécification OpenAPI JSON :** http://localhost:3000/api-docs.json

Pour régénérer manuellement la documentation :

```bash
npm run swagger
```

## Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Vérifier que l'API fonctionne |
| GET | `/api/products` | Récupérer tous les produits |
| GET | `/api/products/:id` | Récupérer un produit par son identifiant |
| POST | `/api/products` | Créer un produit |
| PUT | `/api/products/:id` | Remplacer entièrement un produit |
| PATCH | `/api/products/:id` | Modifier partiellement un produit |
| DELETE | `/api/products/:id` | Supprimer un produit |

## Format d'un produit

Un produit est représenté au format JSON :

```json
{
  "id": 1,
  "name": "Laptop Pro",
  "price": 1200.5,
  "stock": 15
}
```

### Règles de validation

- `name` : chaîne de caractères non vide.
- `price` : nombre positif ou nul.
- `stock` : entier positif ou nul.

## Exemples d'utilisation

### 1. Créer un produit

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Écran 24 pouces","price":199.99,"stock":10}'
```

### 2. Récupérer tous les produits

```bash
curl -X GET http://localhost:3000/api/products
```

### 3. Récupérer un produit par son ID

```bash
curl -X GET http://localhost:3000/api/products/1
```

### 4. Modifier entièrement un produit

```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop Pro","price":1500,"stock":5}'
```

### 5. Modifier le stock d'un produit

```bash
curl -X PATCH http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"stock":20}'
```

### 6. Supprimer un produit

```bash
curl -X DELETE http://localhost:3000/api/products/1
```

## Structure du projet

```text
node-product-api/
├── src/
│   ├── controllers/     # Traitement des requêtes HTTP
│   ├── docs/            # Spécification OpenAPI générée
│   ├── middlewares/     # Validation et gestion des erreurs
│   ├── models/          # Modèle et règles métier du produit
│   ├── repositories/    # Accès aux données en mémoire
│   ├── routes/          # Définition des endpoints
│   ├── services/        # Logique métier
│   └── server.js        # Point d'entrée de l'application
├── .env                 # Variables d'environnement
├── .gitignore           # Fichiers ignorés par Git
├── package.json         # Dépendances et scripts
└── swagger.js           # Configuration de Swagger
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | Démarrer le serveur |
| `npm run dev` | Démarrer le serveur en mode surveillance |
| `npm run swagger` | Régénérer la documentation OpenAPI |

## Configuration Git

Pour éviter de publier les dépendances et les variables d'environnement sur GitHub, ajoutez un fichier `.gitignore` :

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
build/
*.log
```

Les fichiers `package.json` et `package-lock.json` doivent être conservés dans le dépôt.

Pour réinstaller les dépendances :

```bash
npm install
```

## Remarque importante

Ce projet utilise un tableau JavaScript comme source de données.

Les produits créés, modifiés ou supprimés ne sont donc pas conservés après le redémarrage du serveur.

Pour une utilisation en production, il faudra remplacer le repository en mémoire par une base de données persistante, comme :

- MongoDB
- PostgreSQL
- MySQL

Il sera également nécessaire de renforcer la sécurité, la validation des données et la gestion des erreurs.
