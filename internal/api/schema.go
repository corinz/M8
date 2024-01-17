package api

import "github.com/graphql-go/graphql"
import "m8/internal/cluster"

func BuildSchema(c *cluster.Cluster) (graphql.Schema, error) {
	// API Resource Type
	apiResourceType := graphql.NewObject(graphql.ObjectConfig{
		Name:        "APIResource",
		Description: "A Kubernetes API",
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
			"ShortNames": &graphql.Field{
				Type:        graphql.NewList(graphql.String),
				Name:        "API Version",
				Description: "API Version",
			},
		},
	})

	apiGroupType := graphql.NewObject(graphql.ObjectConfig{
		Name:        "APIGroup",
		Description: "A Kubernetes API Group",
		Fields: graphql.Fields{
			"GroupVersion": &graphql.Field{
				Type: graphql.String,
				Name: "API Group Version",
			},
			"APIResources": &graphql.Field{
				Type: graphql.NewList(apiResourceType),
				Name: "API Resources",
			},
		},
	})

	rootQuery := graphql.NewObject(graphql.ObjectConfig{
		Name: "RootQuery",
		Fields: graphql.Fields{
			"apiResource": &graphql.Field{
				Type:        apiResourceType,
				Description: "API",
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
				Type:        graphql.NewList(apiResourceType),
				Description: "List of API Resources",
				Name:        "API Resources",
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					// TODO  unexport Resources
					return c.Resources[0].APIResources, nil
				},
			},
			"apiGroups": &graphql.Field{
				Type:        graphql.NewList(apiGroupType),
				Description: "List of API Groups and APIs",
				Name:        "API Groups",
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					// TODO  unexport Resources
					return c.Resources, nil
				},
			},
		},
	})

	return graphql.NewSchema(graphql.SchemaConfig{
		Query: rootQuery,
	})
}
