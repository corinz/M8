import type {AnyVariables, OperationResult, OperationResultStore, TypedDocumentNode} from "@urql/svelte";
import {Client, getContextClient, gql, queryStore} from "@urql/svelte";

// TODO move to table component, describe what is required of table here to work with table logic
interface tableObject {
    // TODO
}

class resourceObject {
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

// TODO move to gqlQuery.ts
interface gqlQueryInterface {
    readonly query: TypedDocumentNode<any, AnyVariables>
    client: Client

    transform(object: OperationResult): tableObject
    executeQuery(variables: any): any
}

export class GqlResourceQuery implements gqlQueryInterface {
    client: Client
    query: TypedDocumentNode<any, AnyVariables> = gql`query RootQuery($name: String) {
        resources(name: $name) {
            kind
            apiVersion
            metadata {
                namespace
                name
                labels
                annotations
        }}}`

    constructor() {
        this.client = getContextClient()
    }

    transform(resultObj: OperationResult): tableObject {
        let obj = resultObj["resources"]
        return Object.entries(obj).map(([i, v]) => {
            console.log(v)
            const vv = v as resourceObject
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

    executeQuery(variables: any) {
        return queryStore({
            client: this.client,
            query: this.query,
            variables
        })
    }
}