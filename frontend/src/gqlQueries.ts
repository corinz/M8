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
            ObjectMeta {
              Name
              Namespace
            }
            TypeMeta {
              APIVersion
              Kind
            }}}`