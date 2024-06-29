package app

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"log"
	"m8/internal/api/graph"
	"net/http"
	"os"
	"time"
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

// checkOrigin enables Apollo sandbox access by bypassing cors policy
func checkOrigin(r *http.Request) bool {
	return r.Host == "localhost:8080" && r.RequestURI == "/graphql"
}

// start init http handlers and start the server
func start(m8 *App) {
	port := os.Getenv("GRAPHQL_PORT")
	if port == "" {
		port = defaultPort
	}

	// GqlGen handler
	srv := handler.New(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		Clusters:    m8.Clusters,
		ContextList: m8.Contexts,
	}},
	))

	// Customize graph handler
	upgrader := websocket.Upgrader{
		CheckOrigin: checkOrigin,
	}
	srv.AddTransport(transport.Websocket{
		Upgrader:              upgrader,
		KeepAlivePingInterval: 10 * time.Second,
	})
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})
	srv.SetQueryCache(lru.New(1000))
	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})

	// enable cors access for frontend
	graphqlHandlerWithCors := cors.Default().Handler(srv)
	http.Handle("/graphql", graphqlHandlerWithCors)

	// Apollo handler
	//if m8.Apollo {
	http.Handle("/sandbox", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { w.Write(apolloHtml) }))
	//}

	log.Printf("connect to http://localhost:%s/sandbox for Apollo GraphQL UI", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
