package graph

// Tells go generate what command to run when we want to regenerate our code
// To run go generate recursively over your entire project, use this command: go generate ./...
//go:generate go run github.com/99designs/gqlgen generate

import (
	"m8/internal/api/graph/model"
	"m8/internal/client"
)

// Resolver serves as dependency injection for our api server
type Resolver struct {
	resources   []*model.Resource
	Clusters    map[string]*client.Client
	ContextList []string
}
