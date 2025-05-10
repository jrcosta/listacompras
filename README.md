# ListaCompras (Monorepo)

Este repositório contém:

- **backend/**: API Java + Spring Boot + PostgreSQL  
- **frontend/**: App mobile com Expo (React Native)

## Como rodar (desenvolvimento)

### 1) Banco + API

#### Com Docker
```bash
docker-compose up -d
```

#### Sem Docker
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 2) Front-end

```bash
cd frontend
npm install       # ou yarn
npx expo start
```

Após isso, abra no emulador ou no Expo Go, ou pressione `w` para rodar no browser.

## Estrutura de pastas

```
/backend                # API Java + Spring Boot
/frontend               # App Expo (React Native)
/docker-compose.yml     # Orquestra backend + Postgres
```

## Estrutura de arquivos

- **backend/**  
  - `pom.xml`  
  - `src/`  
  - (Opcional) `Dockerfile`  

- **frontend/**  
  - `package.json`  
  - `app.json`  
  - `src/`  
  - (Opcional) `Dockerfile`  

- **docker-compose.yml**: Serviço Postgres e backend.

## .gitignore sugerido

```
# Java
/backend/target/
/backend/.mvn/
/backend/*.iml

# Node
/frontend/node_modules/
/frontend/.expo/
/frontend/web-build/

# Logs e sistema
*.log
.DS_Store
```

