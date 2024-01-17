package client

import v1 "k8s.io/apimachinery/pkg/apis/meta/v1"

// TODO: better way to look up? hash table?
func (c Client) GetApiResourceByName(name string) v1.APIResource {
	api := v1.APIResource{}
	for _, rlist := range c.ResourcesPreferred {
		for _, r := range rlist.APIResources {
			if r.Name == name {
				api = r
			}
		}
	}
	return api
}

func (c Client) GetApiResources() []v1.APIResource {
	var apiResources []v1.APIResource
	for _, resourcesByGroup := range c.ResourcesPreferred {
		for _, resource := range resourcesByGroup.APIResources {
			apiResources = append(apiResources, resource)
		}
	}
	return apiResources
}
