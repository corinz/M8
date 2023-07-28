package cluster

import (
	"context"
	"log"
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

	gvr := cl.GvrFromName("daemonsets")
	jsonO, _ := cl.GetUnstructuredResourceList(context.TODO(), gvr, "")
	log.Println(jsonO)

	return &Cluster{
		Connection: conn,
		Client:     cl,
	}
}
