import {gql} from "@urql/svelte";

export const apiResourcesQuery = gql`query RootQuery {
          apiResources {
            APIResources {
              Kind
              Name
              ShortNames
            }}}`
export const resourcesQuery = gql`query RootQuery($name: String) {
  resources(name: $name) {
    kind
    apiVersion
    metadata {
      namespace
      name
      labels
      annotations
    }
  }
}`