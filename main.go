package main

import (
	"flag"
	"github.com/graphql-go/handler"
	"m8/internal/api"
	"m8/internal/cluster"
	"net/http"
)

func main() {
	configPath := flag.String("configPath", "", "Full path to Kube config file e.g. ~/.kube/config")
	configContext := flag.String("configContext", "", "Kube config context name")
	apiUrl := flag.String("apiUrl", "", "Fully-qualified Kube API URL")

	cluster := cluster.NewCluster(*apiUrl, *configContext, *configPath)
	//cluster.PrintApiGroups()

	schema, _ := api.BuildSchema(cluster)
	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})
	http.Handle("/graphql", h)

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

	http.ListenAndServe(":8080", nil)
}
