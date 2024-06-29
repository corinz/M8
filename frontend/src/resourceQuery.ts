import type {OperationResult} from "@urql/svelte";
import type {tableObject} from "./jsonTable";
import {BaseQuery} from "./gqlQuery";

// resourceClass represents the structure of the graphql resource object
class resourceClass {
    eventType: string
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
    rootQueryString = `subscription Subscription($name: String!) {\n`
    bodyQueryString = `PARAM-PLACEHOLDER: resources(clusterContext: "CONTEXT-PLACEHOLDER", name: $name) {
        eventType
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
        let obj
        Object.entries(resultObj).map(([i, v]) => { // loop over context objects
            const r = v as resourceClass
            // TODO https://basarat.gitbook.io/typescript/future-javascript/destructuring
            obj = {
                "cluster": i,
                "eventType": r.eventType,
                "name": r.metadata.name,
                "namespace": r.metadata.namespace,
                "kind": r.kind,
                "apiVersion": r.apiVersion,
                "labels": r.metadata.labels,
                "annotations": r.metadata.annotations
            }
        })
        return obj
    }
}