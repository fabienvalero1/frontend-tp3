# --- Étape 1 : Build Vite ---
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Build production
RUN npm run build

# --- Étape 2 : Serveur NGINX ---
FROM nginx:alpine

# Supprimer la config nginx par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
