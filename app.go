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
	var err error
	a.ctx = ctx
	configPath := flag.String("configPath", "", "Full path to Kube config file e.g. ~/.kube/config")
	configContext := flag.String("configContext", "", "Kube config context name")
	apiUrl := flag.String("apiUrl", "", "Fully-qualified Kube API URL")

	a.cluster = cluster.NewCluster(*apiUrl, *configContext, *configPath)
	a.cluster.PrintApiGroups()

	schema, err := api.BuildSchema(a.cluster)
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
	err = http.ListenAndServe(":8080", graphqlHandlerWithCors)
	if err != nil {
		println("Error:", err.Error())
	}
}

func (a *App) AppGetApiResourcesByName(name string) v1.APIResource {
	// experimenting with async and delays on f/e
	// time.Sleep(5 * time.Second)
	return a.cluster.GetApiResourceByName(name)
}

func (a *App) AppGetApiResources() []v1.APIResource {
	// experimenting with async and delays on f/e
	// time.Sleep(5 * time.Second)
	return a.cluster.GetApiResources()
}
