package connect

import (
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"log"
	"os"
	"path/filepath"
)

func (c *Connection) Connect() {
	c.establish()
	c.newClientSet()
}

func (c *Connection) establish() {
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

func (c *Connection) newClientSet() {
	cs, err := kubernetes.NewForConfig(c.config)
	if err != nil {
		log.Println(err)
		log.Fatalln("Failed to create Kubernetes Client Set")
	}
	c.ClientSet = cs
}

func (c *Connection) establishUrl() (*rest.Config, error) {
	config, err := clientcmd.BuildConfigFromFlags(c.ApiUrl, "")
	if err != nil {
		log.Println("Failed to establish connection by API URL: ", err)
	} else {
		log.Println("Successfully established connection via API URL")
	}
	return config, err
}

func (c *Connection) establishConfig() (*rest.Config, error) {
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
		log.Println("Failed to establish connection via Kube Config file: ", err)
	} else {
		log.Println("Successfully established connection via Kube Config file")
	}
	return config, err
}

func (c *Connection) establishLocal() (*rest.Config, error) {
	config, err := rest.InClusterConfig()
	if err != nil {
		log.Println("Failed to establish connection via local method: ", err)
	} else {
		log.Println("Successfully established connection via local method")
	}
	return config, err
}
