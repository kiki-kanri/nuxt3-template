# Base nuxt3 template

This is a basic nuxt3 template with some modules and plugins.

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Table of contents

- [Base nuxt3 template](#base-nuxt3-template)
  - [Table of contents](#table-of-contents)
  - [Setup](#setup)
  - [Env config](#env-config)
    - [Fields](#fields)
  - [Modules](#modules)
  - [Plugins](#plugins)
  - [Development Server](#development-server)
    - [Local](#local)
    - [With nginx](#with-nginx)
  - [Production](#production)

## Setup

Make sure to install the dependencies:

```bash
npm install  # npm
pnpm install # pnpm
yarn install # yarn
```

## Env config

Copy `.env.example` to `.env` and edit it.

```bash
cp .env.example .env
vim .env
```

### Fields
- `HMR_CLIENT_PORT` - Set the port that hmr ws connects to on the client side, usually set when using a proxy server such as nginx.
- `HMR_PATH` - Set the path for hmr ws to connect to on the client side, usually set when using a proxy server such as nginx, **note that the actual connection path will be prefixed with /_nuxt**.
- `HMR_PORT` - Setting the port of the hmr ws server.
- `HMR_PROTOCOL` - Set the protocol (ws/wss) that hmr ws will use for the client connection, usually set when using a proxy server such as nginx.
- `SERVER_HOST` - Development server host.
- `SERVER_PORT` - Development server port.

## Modules
- [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org) - Nuxt tailwindcss module.
- [@vueuse/nuxt](https://vueuse.org/nuxt/README.html) - An add-on of VueUse, which provides better Nuxt integration auto-import capabilities.
- [nuxt-purgecss](https://nuxt.com/modules/purgecss) - Drop superfluous CSS!

## Plugins
- [vite-plugin-remove-console](https://www.npmjs.com/package/vite-plugin-remove-console) - A vite plugin that remove all the specified console types in the production environment.

## Development Server

Start the development command is:

```bash
npm run dev #npm
pnpm dev    #pnpm
```

### Local

1. Remove or comment out these env fields:
  - `HMR_CLIENT_PORT`
  - `HMR_PATH`
  - `HMR_PORT`
  - `HMR_PROTOCOL`

2. Start the development server on `http://localhost:SERVER_PORT`, default is `http://localhost:3000`.

### With nginx

This is a basic nginx configuration with ssl for a development server:

```nginx
server {
  listen 443 http2 ssl;
  server_name SERVER_NAME; # Replace SERVER_NAME with your real domain

  # Load your ssl configuration or setup certificate

  # Nuxt hmr
  location /_nuxt/HMR_PATH { # Replace HMR_PATH with .env field value
    proxy_buffering off;
    proxy_http_version 1.1;
    proxy_redirect off;
    proxy_request_buffering off;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header REMOTE_ADDR $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_pass http://SERVER_HOST:HMR_PORT; # Replace SERVER_HOST and HMR_PORT with .env field value
  }

  # Dev server
  location / {
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header REMOTE_ADDR $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://SERVER_HOST:SERVER_PORT; # Replace SERVER_HOST and SERVER_PORT with .env field value
  }
}
```

Why don't you just expose the port of the server and hmr and link it from an external network?
  - To avoid CORS problems.

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
