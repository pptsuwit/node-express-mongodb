# Basic nodejs + auth + crud + typescript

##

[![pptsuwit](https://avatars.githubusercontent.com/u/90542847?v=4)](https://github.com/pptsuwit)

## Installation

- requires [node](https://nodejs.org/en) v20+ to run.
- requires [ts-node](https://www.npmjs.com/package/ts-node)
- requires [mongodb](https://www.mongodb.com/)
- optional [jest](https://jestjs.io/docs/getting-started) v29.6.4+ to test.
- optional [husky](https://typicode.github.io/husky/getting-started.html) git hooks.

## Config

Copy example environment.

```sh
cp example.env.yaml env.yaml
```

Create database and change environment
`Create database`
`Change environments .env file`

# Run

(first time)

```sh
npm run build
```

dev

```sh
npm run dev
```

## Features

- Login
- Register
- CRUD

# Example

```sh
http://localhost:8000/api/login
```

# Test

Install jest

```sh
npm install --save-dev jest
```

Run test

```sh
npm run test
```

or watch mode

```sh
npm run test:watch
```

## pakage

Instructions on how to use them in your own application are linked below.

| Name |
| ---- |

| bcryptjs
| cors |
| dotenv |
| jsonwebtoken |
| express |
| mongoose |
