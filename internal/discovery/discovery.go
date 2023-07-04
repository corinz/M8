package discovery

import (
	"fmt"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/version"
	disc "k8s.io/client-go/discovery"
	"log"
	"m8/internal/connect"
	"os"
	"strings"
	"text/tabwriter"
)

type Discovery struct {
	client    *disc.DiscoveryClient
	version   *version.Info
	Resources []*v1.APIResourceList
	writer    *tabwriter.Writer
}

// NewDiscovery creates a discovery client and obtains server version and list of
// API Resources
func NewDiscovery(c connect.Connection) *Discovery {
	client, err := disc.NewDiscoveryClientForConfig(c.Config)
	if err != nil {
		log.Println(err)
	}

	version, err := client.ServerVersion()
	if err != nil {
		log.Println(err)
	}

	preferredResources, _ := client.ServerPreferredResources()
	if err != nil {
		log.Println(err)
	}
	writer := tabwriter.NewWriter(os.Stdout, 2, 2, 1, ' ', 0)
	return &Discovery{
		client:    client,
		Resources: preferredResources,
		version:   version,
		writer:    writer,
	}
}

//func (d Discovery) PrintAllResources() {
//	for _, resourceList := range d.Resources {
//		fmt.Printf("Group Version: %s\n", resourceList.GroupVersion)
//
//		fmt.Fprintf(d.writer, "Name\tKind\n")
//		for _, apiResource := range resourceList.APIResources {
//			d.PrintApiResource(apiResource)
//		}
//		fmt.Fprintln(d.writer, "")
//		d.writer.Flush()
//	}
//}

// TODO: better way to look up? hash table?
func (d Discovery) GetApiResourceByName(name string) v1.APIResource {
	api := v1.APIResource{}
	for _, rlist := range d.Resources {
		for _, r := range rlist.APIResources {
			if r.Name == name {
				api = r
			}
		}
	}
	return api
}

func (d Discovery) GetApiResources() []v1.APIResource {
	var apiResources []v1.APIResource
	for _, resourcesByGroup := range d.Resources {
		for _, resource := range resourcesByGroup.APIResources {
			apiResources = append(apiResources, resource)
		}
	}
	return apiResources
}

func (d Discovery) PrintApiResource(r v1.APIResource) {
	if !strings.Contains(r.Name, "/") {
		fmt.Fprintf(d.writer, "%s\t%s\n", r.Name, r.Kind)
	}
}

func (d Discovery) PrintApiResources(rs []v1.APIResource) {
	fmt.Fprintf(d.writer, "Name\tKind\n")
	for _, r := range rs {
		d.PrintApiResource(r)
	}
}

func (d Discovery) PrintApiResourcesByGroup(gv string) {
	gvrs, _ := d.client.ServerResourcesForGroupVersion(gv)
	fmt.Fprintf(d.writer, "Group Version: %s\n", gvrs.GroupVersion)
	d.PrintApiResources(gvrs.APIResources)
	fmt.Fprintln(d.writer)
	d.writer.Flush()
}

func (d Discovery) PrintApiGroups() {
	// Should print the equivalent of d.Resources
	gvs, _ := d.client.ServerGroups()
	for _, g := range gvs.Groups {
		var gv = ""
		if g.Name == "" {
			gv = g.PreferredVersion.Version // i.e. "v1"
		} else {
			gv = g.Name + "/" + g.PreferredVersion.Version
		}
		d.PrintApiResourcesByGroup(gv)
	}
}
