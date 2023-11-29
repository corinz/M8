package api

import (
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
	"m8/internal/cluster"
)

func BuildSchema(clusters map[string]*cluster.Cluster, contexts []string) (graphql.Schema, error) {
	mapStringAnyScalar := graphql.NewScalar(
		graphql.ScalarConfig{
			Name:        "MapStringAnyScalar",
			Description: "Map of String Any",
			Serialize: func(value interface{}) interface{} {
				if keyValue, ok := value.(map[string]any); ok {
					return keyValue
				}
				return nil
			},
			ParseValue: func(value interface{}) interface{} {
				if keyValue, ok := value.(map[string]any); ok {
					return keyValue
				}
				return nil
			},
			ParseLiteral: func(valueAST ast.Value) interface{} {
				return nil // Not implemented for simplicity
			},
		},
	)

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

	apiResourceListType := graphql.NewObject(graphql.ObjectConfig{
		Name:        "APIResourceList",
		Description: "A Kubernetes API List",
		Fields: graphql.Fields{
			"GroupVersion": &graphql.Field{
				Type:        graphql.String,
				Name:        "API GroupVersion",
				Description: "API GroupVersion",
			},
			"APIResources": &graphql.Field{
				Type:        graphql.NewList(apiResourceType),
				Name:        "API Resource List",
				Description: "API Resource List",
			},
		},
	})

	metadata := graphql.NewObject(graphql.ObjectConfig{
		Name:        "metadata",
		Description: "Resource metadata",
		Fields: graphql.Fields{
			"namespace": &graphql.Field{
				Type:        graphql.String,
				Name:        "namespace",
				Description: "Resource Namespace",
			},
			"name": &graphql.Field{
				Type:        graphql.String,
				Name:        "name",
				Description: "Resource Name",
			},
			"labels": &graphql.Field{
				Type:        mapStringAnyScalar,
				Name:        "labels",
				Description: "Resource Labels",
			},
			"annotations": &graphql.Field{
				Type:        mapStringAnyScalar,
				Name:        "annotations",
				Description: "Resource Annotations",
			},
		},
	})

	resource := graphql.NewObject(graphql.ObjectConfig{
		Name:        "Resource",
		Description: "Kubernetes Resource",
		Fields: graphql.Fields{
			"metadata": &graphql.Field{
				Type:        metadata,
				Name:        "metadata",
				Description: "Resource Metadata",
			},
			"spec": &graphql.Field{
				Type:        mapStringAnyScalar,
				Name:        "spec",
				Description: "Resource Spec",
			},
			"status": &graphql.Field{
				Type:        mapStringAnyScalar,
				Name:        "status",
				Description: "Resource Status",
			},
			"kind": &graphql.Field{
				Type:        graphql.String,
				Name:        "kind",
				Description: "Resource Kind",
			},
			"apiVersion": &graphql.Field{
				Type:        graphql.String,
				Name:        "apiVersion",
				Description: "Resource API Version",
			},
		},
	})

	rootQuery := graphql.NewObject(graphql.ObjectConfig{
		Name: "RootQuery",
		Fields: graphql.Fields{
			"apiResources": &graphql.Field{
				Type:        graphql.NewList(apiResourceListType),
				Description: "List of API ResourcesPreferred",
				Name:        "API ResourcesPreferred",
				Args: graphql.FieldConfigArgument{
					"clusterContext": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					clusterCtx := p.Args["clusterContext"].(string)
					return clusters[clusterCtx].PreferredResourcesList, nil
				},
			},
			"resources": &graphql.Field{
				Type:        graphql.NewList(resource),
				Description: "Kubernetes Resources",
				Name:        "Resource",
				Args: graphql.FieldConfigArgument{
					"clusterContext": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"name": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"namespace": &graphql.ArgumentConfig{
						Type:         graphql.String,
						DefaultValue: "",
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					name := p.Args["name"].(string)
					namespace := p.Args["namespace"].(string)
					clusterCtx := p.Args["clusterContext"].(string)
					return clusters[clusterCtx].GetResources(name, namespace)
				},
			},
			"contexts": &graphql.Field{
				Type:        graphql.NewList(graphql.String),
				Description: "Kubernetes Contexts",
				Name:        "Contexts",
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return contexts, nil
				},
			},
		},
	})

	return graphql.NewSchema(graphql.SchemaConfig{
		Query: rootQuery,
	})
}
