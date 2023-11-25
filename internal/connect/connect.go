package connect

import (
	log "github.com/sirupsen/logrus"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
)

type ConfigFile struct {
	Context string `json:"context"`
	Path    string `json:"path"`
}

type Connection struct {
	ConfigFile
	Config    *rest.Config
	ClientSet *kubernetes.Clientset
}

func NewConnection(context string, path string) Connection {
	configFile := ConfigFile{
		Context: context,
		Path:    path,
	}
	conn := Connection{
		ConfigFile: configFile,
		Config:     nil,
		ClientSet:  nil,
	}
	conn.Connect()

	return conn
}

func (c *Connection) Connect() {
	c.establish()
	c.newClientSet()
}

func (c *Connection) newClientSet() {
	cs, err := kubernetes.NewForConfig(c.Config)
	if err != nil {
		log.Fatalln("Failed to create Kubernetes Client Set.", err)
	}
	c.ClientSet = cs
}

func (c *Connection) establish() {
	// Establish Connection precedence
	// #1 Config File
	// #2 Local Connection
	var cfg *rest.Config
	var err error

	cfg, err = c.establishConfig() // #1
	if err != nil {
		err = nil
		cfg, err = c.establishLocal() // #2
		if err != nil {
			log.Fatalln("Failed to establish Connection to Kubernetes API.", err)
		}
	}

	c.Config = cfg
}

// establishConfig creates a connection to the kube API using the config file and context provided
// if no context is provided e.g. "", it will default to the "current-context"
func (c *Connection) establishConfig() (*rest.Config, error) {
	clientConfig := &clientcmd.ClientConfigLoadingRules{ExplicitPath: c.Path}
	clientConfigOverrides := &clientcmd.ConfigOverrides{CurrentContext: c.Context}
	config, err := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(clientConfig, clientConfigOverrides).ClientConfig()
	if err != nil {
		log.Warnf("Failed to establish connection to context: \"%s\" via Kube Config file. %s", c.Context, err)
	} else {
		log.Infof("Successfully established connection to context: \"%s\" via Kube Config file.", c.Context)
	}
	return config, err
}

// establishLocal is used as a backup connection method for in-cluster deployments of this app
func (c *Connection) establishLocal() (*rest.Config, error) {
	config, err := rest.InClusterConfig()
	if err != nil {
		log.Warn("Failed to establish connection via local method.", err)
	} else {
		log.Info("Successfully established connection via local method.")
	}
	return config, err
}
