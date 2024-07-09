import type {OperationResult} from "@urql/svelte";
import type {tableObject} from "./jsonTable";
import {BaseQuery} from "./gqlQuery";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// resourceClass represents the structure of the graphql resource object
export class resourceClass {
    eventType: string
    apiVersion: string
    kind: string
    metadata: {
        name: string
        namespace: string
        uid: string
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
          uid
        }
      }\n`
    footerQueryString = `}`

    // transform() {
    //     let obj
    //     // TODO is this necessary?
    //     Object.entries(this.data).map(([i, v]) => { // loop over context objects
    //         const r = v as resourceClass
    //         // TODO https://basarat.gitbook.io/typescript/future-javascript/destructuring
    //         obj = {
    //             "cluster": i,
    //             "uid": r.metadata.uid,
    //             "eventType": r.eventType,
    //             "name": r.metadata.name,
    //             "namespace": r.metadata.namespace,
    //             "kind": r.kind,
    //             "apiVersion": r.apiVersion,
    //             "labels": r.metadata.labels,
    //             "annotations": r.metadata.annotations
    //         }
    //     })
    //
    //     this.transformedData = obj
    // }
}

//     async fetchDataFromStore() {
//         const store = this.queryStore ?? this.subscriptionStore
//
//         // only check for fetching if non-subscription query
//         const checkIfFetching = this.queryStore ? true : false
//
//         let fetching, error, data
//         let retries = 0
//
//         store.subscribe(store => {
//             fetching = store.fetching
//             error = store.error
//             data = store.data
//         })
//
//         while (retries < 40) {
//             if (checkIfFetching && fetching) {
//                 console.log("INFO: GraphQL Query Store fetching: ", this.contextName)
//             } else if (error) {
//                 console.log("ERROR: GraphQL Query Store: ", this.contextName)
//                 throw new Error(error)
//             } else if (data) {
//                 console.log("CORIN", data)
//                 this.data = this.transform()
//                 this.querySuccess = true
//                 console.log("SUCCESS: GraphQL Query Store: ", this.contextName)
//                 return
//             }
//
//             if (retries >= 39) {
//                 console.log("INFO: GraphQL Query Store retries exhausted: ", this.contextName)
//                 return
//             }
//
//             retries++
//             await delay(250)
//         }
//     }