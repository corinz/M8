package main

import (
	"context"
	"flag"
	"fmt"
	"github.com/graphql-go/graphql/gqlerrors"
	"github.com/graphql-go/handler"
	"github.com/rs/cors"
	"log"
	"m8/internal/api"
	"m8/internal/cluster"
	"net/http"
)

// App struct
type App struct {
	ctx context.Context
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

	cluster := cluster.NewCluster(*apiUrl, *configContext, *configPath)
	cluster.PrintApiGroups()

	schema, err := api.BuildSchema(cluster)
	if err != nil {
		log.Fatal(err)
	}
	h := handler.New(&handler.Config{
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
	http.Handle("/graphql", h)

	h2 := cors.Default().Handler(h)
	err2 := http.ListenAndServe(":8080", h2)
	if err2 != nil {
		println("Error:", err2.Error())
	}
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
