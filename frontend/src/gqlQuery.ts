import type {AnyVariables, Client, OperationResult, OperationResultStore, TypedDocumentNode} from "@urql/svelte";
import {getContextClient, gql, queryStore} from "@urql/svelte";
import type {tableObject} from "./jsonTable";

// BaseQuery implements BaseQueryInterface
export class BaseQuery {
    readonly query: TypedDocumentNode<any, AnyVariables>
    readonly rootQueryString: string
    readonly bodyQueryString: string
    readonly footerQueryString: string
    readonly contextName: string
    client: Client
    queryIssued: boolean = false
    queryStore: OperationResultStore<any, any>
    enableTemplating: boolean

    constructor(contextName: string, debug?: boolean) {
        this.contextName = contextName
        if (debug) {
            this.client.subscribeToDebugTarget(event => {
                if (event.source === 'cacheExchange')
                    return;
                console.log("GQL: ", event);
            });
        }
    }

    templateContext(): TypedDocumentNode<any, AnyVariables> {
        // body query templating
        let templatedBody: string = ``
            // convert dashes to underscore for graphql compliance
            let paramName = this.contextName.replaceAll("-", "_")
            let firstTemplate  = this.bodyQueryString.replaceAll("PARAM-PLACEHOLDER", paramName)
            let secondTemplate = firstTemplate.replaceAll("CONTEXT-PLACEHOLDER", this.contextName)
            templatedBody += secondTemplate

        // console.log(this.rootQueryString + templatedBody + this.footerQueryString)
        return gql(this.rootQueryString + templatedBody + this.footerQueryString)
    }

    executeQuery(variables?: any) {
        if (!this.client){
            // Note: getContextClient() must be called from within a svelte component!
            this.client = getContextClient()
        }
        this.queryStore = queryStore({
            client: this.client,
            query: this.enableTemplating ? this.templateContext() : this.query,
            variables
        })
    }

    transform(resultObj: OperationResult): tableObject {
        return {}
    }
}