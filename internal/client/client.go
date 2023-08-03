package client

import (
	"context"
	appsv1 "k8s.io/api/apps/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/version"
	disc "k8s.io/client-go/discovery"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/kubectl/pkg/util/openapi"
	"log"
	"m8/internal/connect"
	"reflect"
	"strings"
)

type Client struct {
	version            *version.Info
	ResourcesPreferred []*v1.APIResourceList
	gvrMap             map[string]schema.GroupVersionResource
	gvkMap             map[string]schema.GroupVersionKind
	discoveryClient    *disc.DiscoveryClient
	dynamicClient      *dynamic.DynamicClient
	openApiSchema      openapi.Resources
	KnownTypesMap      map[schema.GroupVersionKind]reflect.Type
	KnownTypesObjMap   map[string]any
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

	gvrMap, gvkMap, err := allResources(disClient)
	if err != nil {
		log.Println(err)
	}

	openApiSchema, _ := newOpenAPIClient(disClient)
	knownTypesObjMap := make(map[string]any)

	client := &Client{
		ResourcesPreferred: preferredResources,
		version:            ver,
		gvrMap:             gvrMap,
		gvkMap:             gvkMap,
		discoveryClient:    disClient,
		dynamicClient:      dynClient,
		openApiSchema:      openApiSchema,
		KnownTypesMap:      scheme.Scheme.AllKnownTypes(),
		KnownTypesObjMap:   knownTypesObjMap,
	}
	client.getAllServerResources()
	return client, nil
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

func (c Client) getAllServerResources() {
	// TODO: make this faster and run on a timer to refresh
	for _, gvk := range c.gvkMap {
		name := gvk.Kind
		value := c.ResourceByName(gvk, "")
		if value.IsZero() {
			continue
		}
		switch name {
		// TODO write case every supported type
		case "Deployment":
			c.KnownTypesObjMap[name] = value.Interface().([]*appsv1.Deployment)
		}
	}
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
					_, gvrExists := gvrMap[resource.Kind]
					if !gvrExists {
						gvrMap[resource.Kind] = gvr
					} else if ver.Version > gvr.Version { // TODO: else, use/replace with latest api
						//m[resource.Name] = gvr
					}

					gvk := schema.GroupVersionKind{
						Group:   group.Name,
						Version: ver.Version,
						Kind:    resource.Kind,
					}
					// If same group/kind exist with different version, default to higher version
					_, gvkExists := gvkMap[resource.Kind] // keyed with Kind name
					if !gvkExists {
						gvkMap[resource.Kind] = gvk
					} else if ver.Version > gvk.Version { // TODO: else, use/replace with latest api
						//gvkMap[resource.Name] = gvk
					}
				}
			}
		}
	}
	return gvrMap, gvkMap, nil
}

// UnstructuredResourceByName returns resource json by querying gvr hashmap
func (c Client) UnstructuredResourceByName(name string, ns string) ([]unstructured.Unstructured, error) {
	gvr, _ := c.GvrFromName(name)
	u, _ := c.UnstructuredResourceList(context.TODO(), gvr, ns)
	return u, nil
}

// ResourceByName returns a reflection whose interface is an array of kube api objects
func (c Client) ResourceByName(gvk schema.GroupVersionKind, namespace string) reflect.Value {
	converter := runtime.DefaultUnstructuredConverter
	gvr, _ := c.GvrFromName(gvk.Kind)

	// Return nil if gvr or gvk not found
	if gvr.Resource == "" {
		log.Printf("nil gvr for %s\n", gvk.Kind)
		return reflect.ValueOf(0)
	}

	// Reflect type of unstructured object with goal of
	//  returning slice of typed object pointers
	gvkType := c.KnownTypesMap[gvk]
	if gvkType == nil {
		log.Printf("gvk %s not in KnownTypesMap \n", gvk.Kind)
		return reflect.ValueOf(0)
	}
	gvkSliceType := reflect.SliceOf(reflect.PtrTo(gvkType))
	gvkSlice := reflect.MakeSlice(gvkSliceType, 0, 0)

	// Range over unstructured objects
	uList, _ := c.UnstructuredResourceList(context.TODO(), gvr, namespace)
	for _, u := range uList {
		// new instance of reflect type
		gvkVal := reflect.New(gvkType)
		gvkObj := gvkVal.Interface()

		// Copy unstruc to typed gvkObj
		err := converter.FromUnstructured(u.Object, gvkObj)
		if err != nil {
			log.Println(err)
		}

		// append type gvkObject to slice
		gvkSlice = reflect.Append(gvkSlice, reflect.ValueOf(gvkObj))
	}

	return gvkSlice
}

// GvrFromName returns GVR from Resource Name
func (c Client) GvrFromName(name string) (schema.GroupVersionResource, error) {
	return c.gvrMap[name], nil
}

// GvkFromName returns GVR from Resource Name
func (c Client) GvkFromName(name string) (schema.GroupVersionKind, error) {
	return c.gvkMap[name], nil
}

// UnstructuredResourceList returns json representation of resource
func (c Client) UnstructuredResourceList(ctx context.Context, gvr schema.GroupVersionResource, namespace string) ([]unstructured.Unstructured, error) {
	// TODO error handling, ListOptions argument/defaults
	list, _ := c.dynamicClient.Resource(gvr).Namespace(namespace).List(ctx, v1.ListOptions{})
	if list == nil {
		return nil, nil
	}
	return list.Items, nil
}
