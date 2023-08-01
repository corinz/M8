package client

import (
	"context"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/version"
	disc "k8s.io/client-go/discovery"
	"k8s.io/client-go/dynamic"
	"k8s.io/kubectl/pkg/util/openapi"
	"log"
	"m8/internal/connect"
	"strings"
)

type Client struct {
	version            *version.Info
	ResourcesPreferred []*v1.APIResourceList
	resourceMap        map[string]schema.GroupVersionResource
	discoveryClient    *disc.DiscoveryClient
	dynamicClient      *dynamic.DynamicClient
	openApiSchema      openapi.Resources
}

func NewClient(c connect.Connection) (*Client, error) {
	disClient, _ := newDiscovery(c)
	dynClient, _ := newDynamic(c)

	ver, err := disClient.ServerVersion()
	if err != nil {
		log.Println(err)
	}

	preferredResources, err := disClient.ServerPreferredResources()
	if err != nil {
		log.Println(err)
	}

	resourceMap, err := allResources(disClient)
	if err != nil {
		log.Println(err)
	}

	openApiSchema, _ := newOpenAPIClient(disClient)

	return &Client{
		ResourcesPreferred: preferredResources,
		version:            ver,
		resourceMap:        resourceMap,
		discoveryClient:    disClient,
		dynamicClient:      dynClient,
		openApiSchema:      openApiSchema,
	}, err
}

// NewDiscovery creates a client discoveryClient and obtains server version and list of
func newDiscovery(c connect.Connection) (*disc.DiscoveryClient, error) {
	var err error

	// TODO return error
	client, err := disc.NewDiscoveryClientForConfig(c.Config)
	if err != nil {
		log.Println(err)
	}

	return client, err
}

func newDynamic(c connect.Connection) (*dynamic.DynamicClient, error) {
	dynClient, err := dynamic.NewForConfig(c.Config)
	if err != nil {
		log.Println(err)
		log.Fatalln("Failed to create Dynamic Kubernetes Client")
	}
	return dynClient, err
}

func newOpenAPIClient(client *disc.DiscoveryClient) (openapi.Resources, error) {
	parser := openapi.NewOpenAPIParser(client)
	openApiSchema, err := parser.Parse()
	if err != nil {
		log.Println(err)
	}

	return openApiSchema, err
}

func allResources(client *disc.DiscoveryClient) (map[string]schema.GroupVersionResource, error) {
	// TODO handle errors
	// Get all Groups & Versions from cluster
	apiGroupList, _ := client.ServerGroups()
	m := make(map[string]schema.GroupVersionResource)

	// Loop through all Groups and Versions
	for _, group := range apiGroupList.Groups {
		for _, ver := range group.Versions {
			serverResources, _ := client.ServerResourcesForGroupVersion(ver.GroupVersion)
			for _, resource := range serverResources.APIResources {
				// Filter out any sub Resources (like pod/status) since it's not an actual Resource
				if !strings.Contains(resource.Name, "/") {
					// TODO if im going to build a hasmap, need to handle 2 version types
					//2023/07/26 22:49:30 group:  autoscaling version: v2 resource:  horizontalpodautoscalers
					//2023/07/26 22:49:30 group:  autoscaling version: v1 resource:  horizontalpodautoscalers
					gvr := schema.GroupVersionResource{
						Group:    group.Name,
						Version:  ver.Version,
						Resource: resource.Name,
					}

					// If same group/kind exist with different version, default to higher version
					_, exists := m[resource.Name]
					if !exists {
						m[resource.Name] = gvr
					} else if ver.Version > gvr.Version { // TODO replace with latest api
						//m[resource.Name] = gvr
					}

					log.Println("group: ", group.Name, "version:", ver.Version, "resource: ", resource.Name)
				}
			}
		}
	}
	return m, nil
}

// buildHashMap ...
func buildHashMap(resources []*v1.APIResourceList) (map[string]schema.GroupVersionResource, error) {
	m := make(map[string]schema.GroupVersionResource)
	for _, resourceList := range resources {
		for _, resource := range resourceList.APIResources {
			gvr := schema.GroupVersionResource{
				Group:    resource.Group,
				Version:  resource.Version,
				Resource: resource.Name, // Resource == Name ?
			}
			m[resource.Name] = gvr
		}
	}
	return m, nil
}

// ResourceByName returns resource json by querying gvr hashmap
func (c Client) ResourceByName(name string, ns string) ([]unstructured.Unstructured, error) {
	gvr, _ := c.GvrFromName(name)
	u, _ := c.UnstructuredResourceList(context.TODO(), gvr, ns)
	return u, nil
}

// GvrFromName returns GVR from Resource Name
func (c Client) GvrFromName(name string) (schema.GroupVersionResource, error) {
	return c.resourceMap[name], nil
}

// UnstructuredResourceList returns json representation of resource
func (c Client) UnstructuredResourceList(ctx context.Context, gvr schema.GroupVersionResource, namespace string) ([]unstructured.Unstructured, error) {
	// TODO error handling, ListOptions argument/defaults
	list, _ := c.dynamicClient.Resource(gvr).Namespace(namespace).List(ctx, v1.ListOptions{})
	return list.Items, nil
}
