package api

import "github.com/graphql-go/graphql"
import "m8/internal/cluster"

func BuildSchema(c *cluster.Cluster) (graphql.Schema, error) {
	// API Resource Type
	apiResourceType := graphql.NewObject(graphql.ObjectConfig{
		Name:        "APIResource",
		Description: "A single Kubernetes API",
		Fields: graphql.Fields{
			"Name": &graphql.Field{
				Type:        graphql.String,
				Name:        "API Name",
				Description: "API Name",
			},
			"Kind": &graphql.Field{
				Type:        graphql.String,
				Name:        "API Kind",
				Description: "API Kind",
			},
		},
	})

	// API Resources Type
	apiResourcesType := graphql.NewObject(graphql.ObjectConfig{
		Name:        "APIResources",
		Description: "A list of Kubernetes APIs",
		Fields: graphql.Fields{
			"APIResources": &graphql.Field{
				Type:        graphql.NewList(apiResourceType),
				Name:        "APIResources",
				Description: "A list of Kubernetes APIs",
			},
		},
	})

	rootQuery := graphql.NewObject(graphql.ObjectConfig{
		Name: "RootQuery",
		Fields: graphql.Fields{
			"apiResource": &graphql.Field{
				Type:        apiResourceType,
				Description: "Get single API",
				Name:        "API Resource",
				Args: graphql.FieldConfigArgument{
					"name": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					name, _ := p.Args["name"].(string)
					// TODO type check second return val
					return c.PrintApiResourceByName(name), nil
				},
			},
			"apiResources": &graphql.Field{
				Type:        apiResourcesType,
				Description: "Get all APIs",
				Name:        "API Resources",
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					// TODO  unexport Resources
					return c.Resources[0], nil
				},
			},
		},
	})

	return graphql.NewSchema(graphql.SchemaConfig{
		Query: rootQuery,
	})
}
