# frontend/Dockerfile
FROM node:18-alpine

RUN apk add --no-cache bash \
    && npm install -g @expo/ngrok

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Expõe as portas do Metro e Web
EXPOSE 19000 19001 19002 19006 8081

ENV EXPO_NO_INTERACTIVE=1
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# Inicia em web mode e escuta em todas interfaces via 'lan'
CMD ["npx", "expo", "start", "--web", "--host", "lan"]
