import type {AnyVariables, OperationResult, OperationResultStore, TypedDocumentNode} from "@urql/svelte";
import type {tableObject} from "./jsonTable";
import {Client, getContextClient, gql, queryStore} from "@urql/svelte";
import {BaseQuery} from "./gqlQuery";

// resourceClass represent the structure of the graphql resource object
class resourceClass {
    apiVersion: string
    kind: string
    metadata: {
        name: string
        namespace: string
        labels: {
            //TODO
        }
        annotations: {
            //TODO
        }
    }
}

export class GqlResourceQuery extends BaseQuery {
    query: TypedDocumentNode<any, AnyVariables> = gql`query RootQuery($clusterContext: String, $name: String) {
      resources(clusterContext: $clusterContext, name: $name) {
        apiVersion
        kind
        metadata {
          annotations
          labels
          name
          namespace
        }
      }
    }`

    transform(resultObj: OperationResult): tableObject {
        let obj = resultObj["resources"]
        return Object.entries(obj).map(([i, v]) => {
            const vv = v as resourceClass
            // TODO https://basarat.gitbook.io/typescript/future-javascript/destructuring
            return {
                "name": vv.metadata.name,
                "namespace": vv.metadata.namespace,
                "kind": vv.kind,
                "apiVersion": vv.apiVersion,
                "labels": vv.metadata.labels,
                "annotations": vv.metadata.annotations
            }
        })
    }
}