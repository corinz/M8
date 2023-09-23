package api

import (
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
)
import "m8/internal/cluster"

func BuildSchema(c *cluster.Cluster) (graphql.Schema, error) {
	mapStringStringScalar := graphql.NewScalar(
		graphql.ScalarConfig{
			Name:        "Map",
			Description: "Represents a map with string key/value pairs",
			Serialize: func(value interface{}) interface{} {
				if keyValue, ok := value.(map[string]string); ok {
					return keyValue
				}
				return nil
			},
			ParseValue: func(value interface{}) interface{} {
				if keyValue, ok := value.(map[string]string); ok {
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

	metaType := graphql.NewObject(graphql.ObjectConfig{
		Name:        "Meta",
		Description: "A Kubernetes Resource's Meta",
		Fields: graphql.Fields{
			"Kind": &graphql.Field{
				Type:        graphql.String,
				Name:        "Resource Kind",
				Description: "Resource Kind",
			},
			"APIVersion": &graphql.Field{
				Type:        graphql.String,
				Name:        "Resource API Version",
				Description: "Resource API Version",
			},
		},
	})

	objectMetaType := graphql.NewObject(graphql.ObjectConfig{
		Name:        "ObjectMeta",
		Description: "A Kubernetes Resource's Object Meta",
		Fields: graphql.Fields{
			"Name": &graphql.Field{
				Type:        graphql.String,
				Name:        "Resource Name",
				Description: "Resource Name",
			},
			"Namespace": &graphql.Field{
				Type:        graphql.String,
				Name:        "Resource Namespace",
				Description: "Resource Namespace",
			},
			"Labels": &graphql.Field{
				Type:        mapStringStringScalar, //<--- issues with this
				Name:        "Resource Labels",
				Description: "Resource Labels",
			},
		},
	})

	_ = graphql.NewObject(graphql.ObjectConfig{
		Name:        "Spec",
		Description: "A Kubernetes Resource's Spec",
		Fields: graphql.Fields{
			"Replicas": &graphql.Field{
				Type:        graphql.String,
				Name:        "Replicas",
				Description: "Replicas",
			},
		},
	})

	resourceType := graphql.NewObject(graphql.ObjectConfig{
		Name:        "Resource",
		Description: "A Kubernetes Resource",
		Fields: graphql.Fields{
			"TypeMeta": &graphql.Field{
				Type:        metaType,
				Name:        "Resource Meta",
				Description: "Resource Meta",
			},
			"ObjectMeta": &graphql.Field{
				Type:        objectMetaType,
				Name:        "Resource Object Meta",
				Description: "Resource Object Meta",
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
					resource, _ := c.PreferredResourcesMap[name]
					return resource, nil
				},
			},
			"apiResources": &graphql.Field{
				Type:        graphql.NewList(apiResourceListType),
				Description: "List of API ResourcesPreferred",
				Name:        "API ResourcesPreferred",
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return c.PreferredResourcesList, nil
				},
			},
			"resources": &graphql.Field{
				Type:        graphql.NewList(resourceType),
				Description: "Kubernetes Resources",
				Name:        "Kubernetes Resources",
				Args: graphql.FieldConfigArgument{
					"name": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					name, _ := p.Args["name"].(string)
					return c.KnownTypesObjMap[name], nil
				},
			},
		},
	})

	return graphql.NewSchema(graphql.SchemaConfig{
		Query: rootQuery,
	})
}
