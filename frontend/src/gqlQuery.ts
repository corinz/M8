import {
    type AnyVariables,
    type Client,
    type OperationResult,
    type OperationResultStore,
    subscriptionStore,
    type TypedDocumentNode
} from "@urql/svelte";
import {getContextClient, gql, queryStore} from "@urql/svelte";
import type {tableObject} from "./jsonTable";
import {resourceClass} from "./resourceQuery";

// BaseQuery implements BaseQueryInterface
export class BaseQuery {
    readonly query: TypedDocumentNode<any, AnyVariables>
    readonly rootQueryString: string
    readonly bodyQueryString: string
    readonly footerQueryString: string
    readonly contextName: string
    data: any
    transformedData: any
    client: Client
    querySuccess: boolean = false
    queryStore: OperationResultStore<any, any>
    subscriptionStore: OperationResultStore<any, any>
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
        this.data = this.queryStore.subscribe( store => store.data)
        this.transform()
    }

    executeSubscription(variables?: any) {
        if (!this.client){
            // Note: getContextClient() must be called from within a svelte component!
            this.client = getContextClient()
        }
        this.subscriptionStore = subscriptionStore({
            client: this.client,
            query: this.enableTemplating ? this.templateContext() : this.query,
            variables
        })
        this.data = this.subscriptionStore.subscribe( store => store.data)
        this.transform()

    }

    transform() {
        let obj
        // TODO is this necessary?
        Object.entries(this.data).map(([i, v]) => { // loop over context objects
            const r = v as resourceClass
            // TODO https://basarat.gitbook.io/typescript/future-javascript/destructuring
            obj = {
                "cluster": i,
                "uid": r.metadata.uid,
                "eventType": r.eventType,
                "name": r.metadata.name,
                "namespace": r.metadata.namespace,
                "kind": r.kind,
                "apiVersion": r.apiVersion,
                "labels": r.metadata.labels,
                "annotations": r.metadata.annotations
            }
        })

        this.transformedData = obj
    }

    async fetchDataFromStore(){
        this.data = {}
    }
}