package client

import (
	"context"
	log "github.com/sirupsen/logrus"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/version"
	disc "k8s.io/client-go/discovery"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes/scheme"
	"m8/internal/connect"
	"reflect"
	"strings"
)

type Client struct {
	version                *version.Info
	PreferredResourcesList []*v1.APIResourceList
	PreferredResourcesMap  map[string]v1.APIResource
	gvrMap                 map[string]schema.GroupVersionResource
	gvkMap                 map[string]schema.GroupVersionKind
	discoveryClient        *disc.DiscoveryClient
	dynamicClient          *dynamic.DynamicClient
	KnownTypesMap          map[schema.GroupVersionKind]reflect.Type
	KnownTypesObjMap       map[string]any
}

func NewClient(c connect.Connection) (*Client, error) {
	disClient, err := newDiscovery(c)
	if err != nil {
		log.Errorln(err)
	}

	dynClient, err := newDynamic(c)
	if err != nil {
		log.Errorln(err)
	}

	ver, err := disClient.ServerVersion()
	if err != nil {
		log.Errorln(err)
	}

	PreferredResourcesList, err := disClient.ServerPreferredResources()
	if err != nil {
		log.Errorln(err)
	}
	PreferredResourcesMap := make(map[string]v1.APIResource)
	for _, apiResourceList := range PreferredResourcesList {
		for _, apiResource := range apiResourceList.APIResources {
			// Group param is missing, set this?
			//apiResource.Group = apiResourceList.GroupVersion
			PreferredResourcesMap[apiResource.Kind] = apiResource
		}
	}

	gvrMap, gvkMap, err := allResources(disClient)
	if err != nil {
		log.Errorln(err)
	}

	client := &Client{
		PreferredResourcesList: PreferredResourcesList,
		PreferredResourcesMap:  PreferredResourcesMap,
		version:                ver,
		gvrMap:                 gvrMap,
		gvkMap:                 gvkMap,
		discoveryClient:        disClient,
		dynamicClient:          dynClient,
		KnownTypesMap:          scheme.Scheme.AllKnownTypes(),
		KnownTypesObjMap:       make(map[string]any),
	}

	return client, nil
}

// NewDiscovery creates a client discoveryClient and obtains server version and list of
func newDiscovery(c connect.Connection) (*disc.DiscoveryClient, error) {
	var err error
	client, err := disc.NewDiscoveryClientForConfig(c.Config)
	if err != nil {
		log.Errorln(err)
	}
	return client, err
}

func newDynamic(c connect.Connection) (*dynamic.DynamicClient, error) {
	dynClient, err := dynamic.NewForConfig(c.Config)
	if err != nil {
		log.Fatalln("Failed to create Dynamic Kubernetes Client.", err)
	}
	return dynClient, err
}

func allResources(client *disc.DiscoveryClient) (map[string]schema.GroupVersionResource, map[string]schema.GroupVersionKind, error) {
	// TODO: handle errors
	// Get all Groups & Versions from cluster
	apiGroupList, _ := client.ServerGroups()
	gvrMap := make(map[string]schema.GroupVersionResource)
	gvkMap := make(map[string]schema.GroupVersionKind)

	// Loop through all Groups and Versions
	for _, group := range apiGroupList.Groups {
		for _, ver := range group.Versions {
			serverResources, _ := client.ServerResourcesForGroupVersion(ver.GroupVersion)
			for _, resource := range serverResources.APIResources {
				// Filter out any sub Resources (like pod/status) since it's not an actual Resource
				if !strings.Contains(resource.Name, "/") {
					// TODO: if im going to build a hashmap, need to handle 2 version types
					//2023/07/26 22:49:30 group:  autoscaling version: v2 resource:  horizontalpodautoscalers
					//2023/07/26 22:49:30 group:  autoscaling version: v1 resource:  horizontalpodautoscalers
					gvr := schema.GroupVersionResource{
						Group:    group.Name,
						Version:  ver.Version,
						Resource: resource.Name,
					}
					// If same group/kind exist with different version, default to higher version
					_, gvrExists := gvrMap[strings.ToLower(resource.Kind)]
					if !gvrExists {
						gvrMap[strings.ToLower(resource.Kind)] = gvr
					} else if ver.Version > gvr.Version { // TODO: else, use/replace with latest api
						//m[resource.Kind] = gvr
					}

					gvk := schema.GroupVersionKind{
						Group:   group.Name,
						Version: ver.Version,
						Kind:    resource.Kind,
					}
					// If same group/kind exist with different version, default to higher version
					_, gvkExists := gvkMap[strings.ToLower(resource.Kind)] // keyed with Kind name
					if !gvkExists {
						gvkMap[strings.ToLower(resource.Kind)] = gvk
					} else if ver.Version > gvk.Version { // TODO: else, use/replace with latest api
						//gvkMap[resource.Kind] = gvk
					}
				}
			}
		}
	}
	return gvrMap, gvkMap, nil
}

// GvrFromName returns GVR from Resource Name
func (c Client) GvrFromName(name string) (schema.GroupVersionResource, error) {
	return c.gvrMap[name], nil
}

// GvkFromName returns GVR from Resource Name
func (c Client) GvkFromName(name string) (schema.GroupVersionKind, error) {
	return c.gvkMap[name], nil
}

func (c Client) GetResources(name string, ns string) (any, error) {
	listOptions := metav1.ListOptions{}
	name = strings.ToLower(name)

	gvr, err := c.GvrFromName(name)
	if err != nil {
		log.Warnln("Bad resource name")
	}
	resource := c.dynamicClient.Resource(gvr)
	unstruc, _ := resource.Namespace(ns).List(context.TODO(), listOptions)
	var unstrucList = make([]map[string]interface{}, 0)
	for _, v := range unstruc.Items {
		unstrucList = append(unstrucList, v.Object)
	}

	return unstrucList, nil
}
