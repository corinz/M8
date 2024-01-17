![logo](./docs/logo.svg)

# Kube m8 (pronounced like "cube mate")
A sort-of-working desktop app implementation of a Kubernetes client viewer, that stands on the shoulders of framework giants Svelte and Wails.

Here's a list of things that work:
1. A working UI/desktop application
2. A working backend that connects to a local cluster
3. A working GraphQL API and the infrastructure to extend it
4. A bunch of UI stuff broke in a recent commit, and I haven't gotten back to fixing it yet...

## Goals
1. A good looking, keyboard driven UI that ain't slow
2. Ability to issue complex api queries *across* clusters

## Getting Started
1. Install requirements
2. Run `make` or `make run-with-deps` if it's your first time
3. Navigate to http://localhost:8080/sandbox to interact with the GraphQL API via Apollo
4. Or run `wails dev` and follow the prompts see below

## Requirements
1. Go
2. Docker
3. Kind
4. Wails

## Contributions
Together, with combined brain-power, we might discover that this project isn't worth working on.

## Live Development
To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building
To build a redistributable, production mode package, use `wails build`.
