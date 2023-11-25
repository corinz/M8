import type {AnyVariables, OperationResult, OperationResultStore, TypedDocumentNode} from "@urql/svelte";
import type {tableObject} from "./jsonTable";
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
    enableTemplating = true
    rootQueryString = `query RootQuery($name: String, CONTEXT-TYPE-PLACEHOLDER) {\n`
    bodyQueryString = `CONTEXT-PLACEHOLDER: resources(clusterContext: $CONTEXT-PLACEHOLDER, name: $name) {
        apiVersion
        kind
        metadata {
          annotations
          labels
          name
          namespace
        }
      }\n`
    footerQueryString = `}`

    transform(resultObj: OperationResult): tableObject {
        let obj = []
        Object.entries(resultObj).map(([i, v]) => { // loop over context objects
            Object.entries(v).map(([ii, vv]) => { // loop over resource objects
                    const r = vv as resourceClass
                    // TODO https://basarat.gitbook.io/typescript/future-javascript/destructuring
                    obj.push({
                        "cluster": i,
                        "name": r.metadata.name,
                        "namespace": r.metadata.namespace,
                        "kind": r.kind,
                        "apiVersion": r.apiVersion,
                        "labels": r.metadata.labels,
                        "annotations": r.metadata.annotations
                    })
                }
            )
        })
        return obj
    }
}