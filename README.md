# Nextjs 13 - Dashboard

# Instalação

Vamos instalar o Nextjs, Prisma ORM e o Next-Auth

```bash
npx create-next-app@latest
```

```bash
npm install prisma --save-dev
npx prisma init
```

O comando **npx prisma init** cria automaticamente o arquivo .env

- Adicione o arquivo .env no gitignore
- Configure a URL do seu banco de dados no arquivo .env
- Trocar o provider do banco de dados no arquivo schema.prisma

```bash
npx prisma generate
npx prisma db push
```

O comando **generate** e **db push** faz basicamente as mesma coisa, um cria e outro atualiza caso já criado.

```bash
npm install next-auth
```

## No final, o package.json ficará assim

```json
{
    "name": "zz-app",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "@prisma/client": "^5.4.2",
      "next": "13.5.6",
      "next-auth": "^4.24.3",
      "react": "^18",
      "react-dom": "^18"
    },
    "devDependencies": {
      "@types/node": "^20",
      "@types/react": "^18",
      "@types/react-dom": "^18",
      "eslint": "^8",
      "eslint-config-next": "13.5.6",
      "prisma": "^5.4.2",
      "typescript": "^5"
    }
  }
```

### Limpar arquivos gerados do Nextjs

- Apague os CSS gerados e os arquivo tsx, apague as imagens também e os imports inutilizáveis.

# Executar a aplicação

```bash
    npm run dev
```