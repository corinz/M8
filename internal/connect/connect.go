package connect

import (
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"log"
	"os"
	"path/filepath"
)

func (c Connection) Connect() {
	c.establish()
	c.getClientSet()
}

func (c Connection) establish() {
	// Establish Connection precedence
	// #1 URL
	// #2 config File
	// #3 Local Connection
	var cfg *rest.Config
	var err error

	cfg, err = c.establishUrl() // #1
	if err != nil {
		cfg, err = c.establishConfig() // #2
		if err != nil {
			cfg, err = c.establishLocal() // #3
		}
	}
	if err != nil {
		log.Println(err)
		log.Fatalln("Failed to establish Connection to Kubernetes API")
	} else {
		c.Established = true
		c.config = cfg
	}
}

func (c Connection) getClientSet() {
	cs, err := kubernetes.NewForConfig(c.config)
	if err != nil {
		log.Println(err)
		log.Fatalln("Failed to create Kubernetes Client Set")
	}
	c.clientSet = cs
}

func (c Connection) establishUrl() (*rest.Config, error) {
	config, err := clientcmd.BuildConfigFromFlags(c.ApiUrl, "")
	if err != nil {
		log.Println("Failed to establish Connection by Api Url")
	}
	return config, err
}

func (c Connection) establishConfig() (*rest.Config, error) {
	home, exists := os.LookupEnv("HOME")
	if !exists {
		home = "/root"
	}
	var configPath string
	if c.ConfigFile.Path != "" {
		configPath = c.ConfigFile.Path
	} else {
		configPath = filepath.Join(home, ".kube", "config")
	}
	// TODO: pass context override
	config, err := clientcmd.BuildConfigFromFlags("", configPath)
	if err != nil {
		log.Println("failed to create K8s config")
	}
	return config, err
}

func (c Connection) establishLocal() (*rest.Config, error) {
	config, err := rest.InClusterConfig()
	return config, err
}
