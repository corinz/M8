package main

import (
	"context"
	"flag"
	"github.com/graphql-go/graphql/gqlerrors"
	"github.com/graphql-go/handler"
	"github.com/rs/cors"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"log"
	"m8/internal/api"
	"m8/internal/cluster"
	"net/http"
)

// App struct
type App struct {
	ctx     context.Context
	cluster *cluster.Cluster
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	configPath := flag.String("configPath", "", "Full path to Kube config file e.g. ~/.kube/config")
	configContext := flag.String("configContext", "", "Kube config context name")
	apiUrl := flag.String("apiUrl", "", "Fully-qualified Kube API URL")

	a.cluster = cluster.NewCluster(*apiUrl, *configContext, *configPath)
	graphqlStartup(a.cluster, true)
}

// startup is called when from main() when -headless=true
func headlessStartup() {
	configPath := flag.String("configPath", "", "Full path to Kube config file e.g. ~/.kube/config")
	configContext := flag.String("configContext", "", "Kube config context name")
	apiUrl := flag.String("apiUrl", "", "Fully-qualified Kube API URL")

	c := cluster.NewCluster(*apiUrl, *configContext, *configPath)
	graphqlStartup(c, true)
}

func graphqlStartup(cluster *cluster.Cluster, apollo bool) {
	schema, err := api.BuildSchema(cluster)
	if err != nil {
		log.Fatal(err)
	}
	graphqlHandler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: false,
		FormatErrorFn: func(err error) gqlerrors.FormattedError {
			gqlErr := gqlerrors.FormattedError{
				Message: err.Error(),
			}
			log.Println("GraphQL Error: ", err)
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

// AppGetApiResource for Wails type binding
func (a *App) AppGetApiResource() v1.APIResource {
	return v1.APIResource{}
}
