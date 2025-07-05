![padel-app logo](docs/assets/logo2.png)

# Web UI

## Table of contents

* [Quick Start](#quick-start)


___
## Quick start

You should first read the [Architecture](#arquitecture) chapter before even cloning the repo, but, anyway... for sure that you want to start the application locally and see it running, don't you? 😉

```sh
git clone git@github.com
docker-compose run dev npm install
docker-compose run -p 3000:3000 dev npm start
```

...ok, you need also an API. Open another terminal window and run `docker-compose run -p 3100:3100 dev npm run mocks`.

## Local Quick Start
* First install node: https://nodejs.org/es/download/

* Then install dependencies:
```sh 
cd src
npm install
```
* Run mocks 
```sh 
npm run mocks
```

* Run front
```sh 
npm start
```

* Deactivate Chrome autocomplete in forms - It is a hard task, but it needs to be investigated. Chrome does not like developers deciding when it should autocomplete a form or not, but let's try.
