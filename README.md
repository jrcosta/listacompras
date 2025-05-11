# ListaCompras (Monorepo)

Este repositório contém:

- **backend/**: API Java + Spring Boot + PostgreSQL  
- **frontend/**: App mobile com Expo (React Native)  
- **docker-compose.yml**: Orquestra serviços (Postgres, backend e frontend)  
- **docker-compose-build-dev.yml**: Mesma orquestração, mas faz build local das imagens  
- **.gitignore**: Ignora build outputs, dependências e arquivos de IDE

## Pré-requisitos

- Docker e Docker Compose instalados  
- Portas `8080`, `5432`, `19000`, `19001`, `19002` e `19006` liberadas no host  

## Modo Teste (usar imagens públicas)

1. Clone o repositório:
   ```bash
   git clone https://github.com/jrcosta/listacompras.git
   cd lista-compras
   ```

2. (Opcional) Defina variáveis de ambiente para Postgres:
   ```bash
   export POSTGRES_USER=postgres
   export POSTGRES_PASSWORD=postgres
   export POSTGRES_DB=listacompras
   ```

3. Suba usando as imagens Docker publicadas:
   ```bash
   docker-compose up -d
   ```

4. Acesse:
   - **API**: `http://localhost:8080`  
   - **App Web (React Native Web)**: `http://localhost:8081`  

5. Para parar e remover:
   ```bash
   docker-compose down
   ```

---

## Modo Desenvolvimento (build docker local)

Quando você estiver fazendo alterações ativas no backend ou frontend, você pode usar o `docker-compose-build-dev.yml` para construir as imagens a partir dos Dockerfiles locais em vez de puxar do Docker Hub.

1. Clone e posicione-se na pasta:
   ```bash
   git clone https://github.com/jrcosta/listacompras.git
   cd lista-compras
   ```

2. (Opcional) Variáveis de ambiente Postgres:
   ```bash
   export POSTGRES_USER=postgres
   export POSTGRES_PASSWORD=postgres
   export POSTGRES_DB=listacompras
   ```

3. Suba os serviços com build local:
   ```bash
   docker-compose -f docker-compose-build-dev.yml up --build -d
   ```

4. Acesse:
   - **API**: `http://localhost:8080`  
   - **App Web**: `http://localhost:8081`  

5. Para parar:
   ```bash
   docker-compose -f docker-compose-build-dev.yml down
   ```

---

## Estrutura de pastas

```
/backend                # API Java + Spring Boot + Dockerfile
/frontend               # App Expo + Dockerfile
/docker-compose.yml
/docker-compose-build-dev.yml
```

## Principais arquivos

- **backend/**  
  - `pom.xml`  
  - `src/`  
  - `Dockerfile`

- **frontend/**  
  - `package.json`  
  - `app.json`  
  - `src/`  
  - `Dockerfile`
  
- **docker-compose.yml**: serviços com imagens públicas  
- **docker-compose-build-dev.yml**: serviços com build local  

## .gitignore sugerido

```gitignore
# Java
/backend/target/
/backend/.mvn/
/backend/*.iml

# Node
/frontend/node_modules/
/frontend/.expo/
/frontend/.expo-shared/
/frontend/web-build/

# IDEs
/.idea/
/.vscode/

# Logs e sistema
*.log
.DS_Store
```