## Getting Started
1. Install requirements
2. Run `make`
3. Navigate to http://localhost:8080/sandbox to interact with the GraphQL API via Apollo

## Requirements
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
