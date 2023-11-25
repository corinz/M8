package main

import (
	"context"
	"github.com/graphql-go/graphql/gqlerrors"
	"github.com/graphql-go/handler"
	"github.com/rs/cors"
	log "github.com/sirupsen/logrus"
	"k8s.io/client-go/tools/clientcmd"
	"m8/internal/api"
	"m8/internal/cluster"
	"net/http"
	"os"
	"path/filepath"
)

// App struct
type App struct {
	ctx      context.Context
	clusters map[string]*cluster.Cluster
}

// NewApp creates a new App application struct
func NewApp() *App {
	clusters := make(map[string]*cluster.Cluster)
	return &App{
		clusters: clusters,
	}
}

func GetContexts(path string) []string {
	var contextNames []string
	clientConfig, err := clientcmd.LoadFromFile(path)
	if err != nil {
		log.Error(err)
	}
	if len(clientConfig.Contexts) == 0 {
		log.Error("No contexts present in \"%s\" config file", path)
	}
	for _, v := range clientConfig.Contexts {
		contextNames = append(contextNames, v.Cluster)
	}
	return contextNames
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	// TODO: replace with config discovery module
	home, exists := os.LookupEnv("HOME")
	if !exists {
		home = "/root"
	}
	path := filepath.Join(home, ".kube", "Config")

	a.clusters["kind-kind"] = cluster.NewCluster("kind-kind", path)
	a.clusters["kind-secondary"] = cluster.NewCluster("kind-secondary", path)

	graphqlStartup(a.clusters, true, GetContexts(path))
}

// startup is called when from main() when -headless=true
func headlessStartup() {
	// TODO: replace with config discovery module
	home, exists := os.LookupEnv("HOME")
	if !exists {
		home = "/root"
	}
	path := filepath.Join(home, ".kube", "Config")
	clusters := make(map[string]*cluster.Cluster)
	clusters["kind-kind"] = cluster.NewCluster("kind-kind", path)
	clusters["kind-secondary"] = cluster.NewCluster("kind-secondary", path)
	graphqlStartup(clusters, true, GetContexts(path))
}

func graphqlStartup(clusters map[string]*cluster.Cluster, apollo bool, contexts []string) {
	schema, err := api.BuildSchema(clusters, contexts)
	if err != nil {
		log.Fatalln(err)
	}
	graphqlHandler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: false,
		FormatErrorFn: func(err error) gqlerrors.FormattedError {
			gqlErr := gqlerrors.FormattedError{
				Message: err.Error(),
			}
			log.Warnln("GraphQL Error: ", err)
			return gqlErr
		},
	})

	// TODO: the default policy is very open
	graphqlHandlerWithCors := cors.Default().Handler(graphqlHandler)
	http.Handle("/graphql", graphqlHandlerWithCors)

	if apollo {
		var sandboxHTML = []byte(`
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

		http.Handle("/sandbox", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Write(sandboxHTML)
		}))

		err = http.ListenAndServe(":8080", nil)
		if err != nil {
			println("Error:", err.Error())
		}
	} else {
		err = http.ListenAndServe(":8080", graphqlHandlerWithCors)
		if err != nil {
			println("Error:", err.Error())
		}
	}
}
