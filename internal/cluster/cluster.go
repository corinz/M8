package cluster

import (
	"m8/internal/client"
	"m8/internal/connect"
)

type Cluster struct {
	connect.Connection
	*client.Client
}

func NewCluster(apiUrl string, configContext string, configPath string) *Cluster {
	conn := connect.NewConnection(apiUrl, configContext, configPath)
	cl, _ := client.NewClient(conn)

	return &Cluster{
		Connection: conn,
		Client:     cl,
	}
}
