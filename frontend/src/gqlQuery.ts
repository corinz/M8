import type {AnyVariables, Client, OperationResult, TypedDocumentNode} from "@urql/svelte";
import {getContextClient, gql, queryStore} from "@urql/svelte";
import type {tableObject} from "./jsonTable";

// BaseQuery implements BaseQueryInterface
export class BaseQuery {
    readonly query: TypedDocumentNode<any, AnyVariables>
    readonly rootQueryString: string
    readonly bodyQueryString: string
    readonly footerQueryString: string
    readonly client: Client
    contexts: string[]
    enableTemplating: boolean

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

    templateContexts(): TypedDocumentNode<any, AnyVariables> {
        // body query templating
        let templatedBody: string = ``
        for (let context of this.contexts) {
            // convert dashes to underscore for graphql compliance
            let paramName = context.replaceAll("-", "_")
            let firstTemplate  = this.bodyQueryString.replaceAll("PARAM-PLACEHOLDER", paramName)
            let secondTemplate = firstTemplate.replaceAll("CONTEXT-PLACEHOLDER", context)
            templatedBody += secondTemplate
        }

        // TODO: why does this execute twice on load?
        // console.log(this.rootQueryString + templatedBody + this.footerQueryString)
        return gql(this.rootQueryString + templatedBody + this.footerQueryString)
    }

    executeQuery(contexts?: string[], variables?: any): any {
        this.contexts = contexts
        return queryStore({
            client: this.client,
            query: this.enableTemplating ? this.templateContexts() : this.query,
            variables
        })
    }

    transform(resultObj: OperationResult): tableObject {
        return {}
    }
}