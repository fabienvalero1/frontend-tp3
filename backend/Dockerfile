# --- Étape 1 : base Node ---
FROM node:18-alpine

# Crée un répertoire de travail
WORKDIR /app

# Copie package.json + package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install --production

# Copie le code du projet
COPY . .

# Assure-toi que le dossier de la bdd existe
RUN mkdir -p /app/data

# Expose le port utilisé par Express
EXPOSE 4000

# Commande de démarrage
CMD ["npm", "start"]
