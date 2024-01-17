package cluster

import (
	connect "m8/internal/connect"
	discovery "m8/internal/discovery"
)

type cluster struct {
	connect.Connection
	*discovery.Discovery
}

func NewCluster(apiUrl string, configContext string, configPath string) *cluster {
	c := connect.NewConnection(apiUrl, configContext, configPath)
	d := discovery.NewDiscovery(c)

	return &cluster{
		Connection: c,
		Discovery:  d,
	}
}
