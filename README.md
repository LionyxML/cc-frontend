# CC-Frontend

A frontend for the CC-API project.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn format`

Formats all js, ts, jsx, tsx, scss, sass, css documents inside `src/` with prettier.

### `yarn prettier`

Checks all `src/` documents mentioned above for proper formatting.

### `yarn lint`

Run esliner to lint the project.

### `yarn ts`

Run typescript compiler for linting.

### `yarn precommit`

Performs basic operations in sequence:

- prettier
- lint
- ts
- build

## Setup and Launch

### Method 1 - On your host system with node and yarn installed

Clone this repo.

Issue `yarn install`.

Minimum requirements for "node" and "yarn" are provided inside `package.json`.

Copy `.env_example` to `.env` and fill it in as needed (look for process.env calls inside the code, most if not all are inside `/src/config`).

Server can be run in two modes: `development` and `production`:

- production mode: `yarn start`

- development mode: `yarn dev`

Start making requests to [http://localhost:3000](http://localhost:3000) (where 3000 is the default port you can set in .env)

### Method 2 - In a container

`Dockerfile.dev` and `Dockerfile.prod` are provided for both a Development and Production server respectively.

Clone this repo and follow the instructions for creating the `.env` file on method 1.

#### Method 2.1 - Usual Docker Setup

For development:

- Run `docker build -f ./Dockerfile.dev -t cc-frontend:dev .` for building the development image.
- Run `docker run -it --rm -p 3000:3000 cc-frontend:dev` for running the development image.

For production:

- Run `docker build -f ./Dockerfile.prod -t cc-frontend:prod .` for building the production image.
- Run `docker run -it --rm -p 3000:3000 cc-frontend:prod` for running the production image.

#### Method 2.2 - Using docker-compose

Development mode:

- Run `docker-compose -f "docker-compose-dev.yml" up -d --build `
- When done, run `docker-compose -f "docker-compose-dev.yml" down` to stop the server.
- If you need to restart the server, run `docker-compose -f "docker-compose-dev.yml" restart`.

Production mode ([http://localhost:1337](http://localhost:1337) ):

- Run `docker-compose -f "docker-compose-prod.yml" up -d --build `
- When done, run `docker-compose -f "docker-compose-prod.yml" down` to stop the server.
- If you need to restart the server, run `docker-compose -f "docker-compose-prod.yml" restart`.
