# AmalaJS App

## SETUP
- Create your `.env` file, using `.env.example` as an example, then set your environmental variables in `.env`.
- Run `npm install` to initialize dependencies and dist folder. (This is important!)

## Running
- To run in dev mode, simply run `npm run dev`
- To run in Prod mode, first `npm run build` then `npm start`. This will compile and run from the `dist/` folder.
- To run tests, `npm test`

## Docker
Amala apps come docker ready for your containerization needs. 
The default docker file uses a multi-stage approach to greatly minimize the size of the resulting final docker image.

### Dockerizing
- First make sure the name in your package.json adequately represents the name of your docker image (default is "amala-app")
- Also replace "myrepo" from the docker scripts in `package.json` with your actual container repo name.
- Execute `npm run docker:build` to build the image locally.
- If you wish to build and push to your docker repo, `npm run docker:build:push`. This tags `latest` by default. Feel free to modify and push specific versions.


## Docker-Compose
This app also comes docker-compose ready for your dev orchestration needs.
`docker compose up`


## API library
[Amala](https://github.com/iyobo/amala)

