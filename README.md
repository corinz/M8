![logo](./docs/logo.svg)

A desktop app Kubernetes client viewer, that stands on the shoulders of framework giants Svelte and Wails.

This project is under active development
Here's a list of things that work:
1. A dead simple UI/desktop application that features cross-context resource querying
2. A backend that connects to any cluster in your ~/.kube/config
3. A working GraphQL API with an Apollo client

![screenshot](./docs/screenshot.png)

## Goals
1. A good looking, fast, keyboard driven UI for front-line Kubernets admins
2. Ability to issue resource queries *across* clusters

## Getting Started
1. Install requirements below
2. Run `make` or `make run-with-deps` if it's your first time
3. Navigate to http://localhost:8080/sandbox to interact with the GraphQL API via Apollo
4. Or run `wails dev` and follow the prompts. See below

## Requirements for dev
1. Go
2. Docker
3. Kind
4. Wails

## Live Development
To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building
To build a redistributable, production mode package, use `wails build`.
