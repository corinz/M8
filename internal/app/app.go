package app

import (
	"context"
	log "github.com/sirupsen/logrus"
	"k8s.io/client-go/tools/clientcmd"
	"m8/internal/client"
	"os"
	"path/filepath"
)

// App struct
type App struct {
	ctx      context.Context
	Clusters map[string]*client.Client
	Apollo   bool
}

// NewApp creates a new App application struct
func NewApp() *App {
	clusters := make(map[string]*client.Client)
	return &App{
		Clusters: clusters,
	}
}

// GetContexts returns a slice of available cluster contexts
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

// Startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	// TODO: replace with config discovery module
	home, exists := os.LookupEnv("HOME")
	if !exists {
		home = "/root"
	}
	path := filepath.Join(home, ".kube", "Config")
	contextsDiscovered := GetContexts(path)

	for _, contextDiscovered := range contextsDiscovered {
		a.Clusters[contextDiscovered] = client.NewCluster(contextDiscovered, path)
	}

	start(a)
}
