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
        // root query templating
        let templatedRoot: string = this.rootQueryString
        for (let c of this.contexts) {
            // convert dashes to underscore for graphql compliance
            c = c.replace("-", "_")
            templatedRoot = templatedRoot.replace("CONTEXT-TYPE-PLACEHOLDER", `$${c}: String, CONTEXT-TYPE-PLACEHOLDER`)
        }
        // clean up remaining placeholder
        templatedRoot = templatedRoot.replace("CONTEXT-TYPE-PLACEHOLDER", "")

        // body query templating
        let templatedBody: string = ``
        for (let c of this.contexts) {
            // convert dashes to underscore for graphql compliance
            c = c.replace("-", "_")
            templatedBody += this.bodyQueryString.replaceAll("CONTEXT-PLACEHOLDER", c)
        }

        // TODO: why does this execute twice on load?
        //console.log(templatedRoot + templatedBody + this.footerQueryString)
        return gql(templatedRoot + templatedBody + this.footerQueryString)
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