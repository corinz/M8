package connect

import (
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

type ConfigFile struct {
	Context string `json:"context"`
	Path    string `json:"path"`
}

type Connection struct {
	ApiUrl string `json:"apiUrl"`
	ConfigFile
	Established bool `json:"established"`
	config      *rest.Config
	clientSet   *kubernetes.Clientset
}

func NewConnection(apiUrl string, context string, path string) Connection {
	configFile := ConfigFile{
		Context: context,
		Path:    path,
	}
	conn := Connection{
		ApiUrl:      apiUrl,
		ConfigFile:  configFile,
		Established: false,
		config:      nil,
		clientSet:   nil,
	}
	conn.Connect()
	return conn
}
