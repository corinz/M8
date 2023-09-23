package client

import (
	"context"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

// UnstructuredResourceListByName returns resource json by querying gvr hashmap
func (c Client) UnstructuredResourceListByName(name string, ns string) ([]unstructured.Unstructured, error) {
	// Use resource name to get gvr
	gvr, _ := c.GvrFromName(name)

	// Use gvr to get full list of resources
	u, _ := c.UnstructuredResourceListByGvr(context.TODO(), gvr, ns)
	return u, nil
}

// UnstructuredResourceListByGvr returns json representation of resource
func (c Client) UnstructuredResourceListByGvr(ctx context.Context, gvr schema.GroupVersionResource, namespace string) ([]unstructured.Unstructured, error) {
	// TODO: ListOptions argument/defaults
	list, err := c.dynamicClient.Resource(gvr).Namespace(namespace).List(ctx, v1.ListOptions{})
	if err != nil || list == nil {
		return nil, err
	}
	return list.Items, nil
}
