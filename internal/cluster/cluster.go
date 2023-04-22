package cluster

import (
	connect "m8/internal/connect"
	discovery "m8/internal/discovery"
)

// TODO: dont export this struct
type Cluster struct {
	connect.Connection
	*discovery.Discovery
}

func NewCluster(apiUrl string, configContext string, configPath string) *Cluster {
	c := connect.NewConnection(apiUrl, configContext, configPath)
	d := discovery.NewDiscovery(c)

	return &Cluster{
		Connection: c,
		Discovery:  d,
	}
}
