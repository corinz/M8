package main

import (
	"flag"
	"m8/internal/cluster"
)

func main() {
	configPath := flag.String("configPath", "", "Full path to Kube config file e.g. ~/.kube/config")
	configContext := flag.String("configContext", "", "Kube config context name")
	apiUrl := flag.String("apiUrl", "", "Fully-qualified Kube API URL")

	cluster := cluster.NewCluster(*apiUrl, *configContext, *configPath)
	cluster.PrintApiGroups()
}
