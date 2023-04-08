package m8

import (
	"flag"
	"m8/internal/connect"
)

func main() {
	configPath := flag.String("configPath", "", "Full path to Kube config file e.g. ~/.kube/config")
	configContext := flag.String("configContext", "", "Kube config context name")
	apiUrl := flag.String("apiUrl", "", "Fully-qualified Kube API URL")

	conn := connect.NewConnection(*apiUrl, *configContext, *configPath)
	// TODO
}
