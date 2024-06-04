package app

import (
	"log"
	"m8/internal/api/graph"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
)

const defaultPort = "8080"

var apolloHtml = []byte(`
		<!DOCTYPE html>
		<html lang="en">
		<body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
		<div id="sandbox" style="height:100vh; width:100vw;"></div>
		<script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
		<script>
		new window.EmbeddedSandbox({
		  target: "#sandbox",
		  // Pass through your server href if you are embedding on an endpoint.
		  // Otherwise, you can pass whatever endpoint you want Sandbox to start up with here.
		  initialEndpoint: "http://localhost:8080/graphql",
		});
		// advanced options: https://www.apollographql.com/docs/studio/explorer/sandbox#embedding-sandbox
		</script>
		</body>
		</html>`)

func start(m8 *App) {
	port := os.Getenv("GRAPHQL_PORT")
	if port == "" {
		port = defaultPort
	}

	// GqlGen main handler
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{Clusters: m8.Clusters}}))
	http.Handle("/graphql", srv)

	// Apollo handler
	if m8.Apollo {
		http.Handle("/sandbox", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { w.Write(apolloHtml) }))
	}

	log.Printf("connect to http://localhost:%s/sandbox for Apollo GraphQL UI", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
