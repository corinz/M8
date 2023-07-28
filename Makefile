.SILENT: requirements run
default: run
clean:
	go clean
	kind delete cluster

run:
	echo "INFO: see Apollo Backend here: http://localhost:8080/sandbox"
	go run app.go main.go -headless=true > /dev/null

run-with-deps: requirements build-cluster
	go mod tidy
	go fmt ./...
	open http://localhost:8080/sandbox
	echo "INFO: see Apollo Backend here: http://localhost:8080/sandbox"
	go run app.go main.go -headless=true > /dev/null

build:
	CGO_ENABLED=0 GOOS=darwin go build -o bin/apigateway-darwin cmd/server/main.go
	CGO_ENABLED=0 GOOS=linux go build -o bin/apigateway cmd/server/main.go
	CGO_ENABLED=0 GOOS=windows go build -o bin/apigateway.exe cmd/server/main.go

build-cluster:
	kind create cluster || true

requirements:
	# Check if all required commands are installed
	REQUIRED_CLI=("go" "kind" "docker") && \
	for command in "$${REQUIRED_CLI[@]}"; \
  do \
	    if ! command -v "$$command" &> /dev/null; \
      then \
	      echo "ERROR: Please make sure $$command is installed and try again."; \
	      exit 1; \
	    fi \
	done
