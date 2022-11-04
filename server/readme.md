# Dependencias

```
npm i typescript -D
npx tsc --init
npm i fastify
npm i @fastify/cors
```

# Compilar Codigo

```JSON
  "scripts": {
    "dev": "tsx watch src/server.ts"
  },
```

# Setup do Prisma

```
npm i prisma -D
npm i @prisma/client
npx prisma init --datasource-provider SQLite
```

```
npx prisma migrate dev
```

Comando para executar as migrations no prisma

```
npx prisma studio

```

Visualizar o Banco de Dados Pelo Navegador

```
npm prisma-erd-generator @mermaid-js/mermaid-cli -D
```

Criar Diagramas de Entidade e Relacionamento

```
npx prisma generate
```

## Criando Seed no banco de dados

`npx prisma db seed`

# schema Validation

`npm i zod`
