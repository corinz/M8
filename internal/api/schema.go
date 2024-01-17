package api

import "github.com/graphql-go/graphql"
import "m8/internal/cluster"

func BuildSchema(c *cluster.Cluster) (graphql.Schema, error) {
	var api = graphql.ObjectConfig{
		Name:        "Kubernetes API",
		Description: "A single Kubernetes API",
		Fields: graphql.Fields{
			"groupVersion": &graphql.Field{
				Type:        graphql.String,
				Name:        "Group Version",
				Description: "Group Version",
			},
			"name": &graphql.Field{
				Type:        graphql.String,
				Name:        "API Name",
				Description: "API Name",
			},
			"kind": &graphql.Field{
				Type:        graphql.String,
				Name:        "API Kind",
				Description: "API Kind",
			},
		},
	}

	var apiObject = graphql.NewObject(api)

	var apis = graphql.ObjectConfig{
		Name: "Kubernetes APIs",
		Fields: graphql.Fields{
			"api": &graphql.Field{
				Type:        apiObject,
				Description: "Get single API",
				Name:        "Kubernetes API",
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
			"apis": &graphql.Field{
				Type:        graphql.NewList(apiObject),
				Description: "All APIs",
				Name:        "All APIs",
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					// TODO  what to return here? must be json type?
					return "something", nil
				},
			},
		},
	}

	var apisObject = graphql.NewObject(apis)
	return graphql.NewSchema(graphql.SchemaConfig{
		Query: apisObject,
	})
}
