import type {AnyVariables, Client, OperationResult, TypedDocumentNode} from "@urql/svelte";
import {getContextClient, queryStore} from "@urql/svelte";
import type {tableObject} from "./jsonTable";

// BaseQueryInterface
interface BaseQueryInterface {
    // actual graphql query
    readonly query: TypedDocumentNode<any, AnyVariables>

    // graphql client
    client: Client

    // accepts the query result and coerces data into a tableObject
    transform(resultObj: OperationResult): tableObject

    // issues request to graphql api with specified variables
    executeQuery(variables: any): any
}

// BaseQuery implements BaseQueryInterface
export class BaseQuery implements BaseQueryInterface{
    readonly query: TypedDocumentNode<any, AnyVariables>
    client: Client
    constructor(debug?: boolean) {
        this.client = getContextClient()
        if (debug) {
            this.client.subscribeToDebugTarget(event => {
                if (event.source === 'cacheExchange')
                    return;
                console.log("GQL: ", event);
            });
        }
    }

    executeQuery(variables: any): any {
        return queryStore({
            client: this.client,
            query: this.query,
            variables
        })
    }

    transform(resultObj: OperationResult): tableObject {
        return {}
    }
}