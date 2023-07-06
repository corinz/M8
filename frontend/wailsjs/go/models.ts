export namespace v1 {
	
	export class APIResource {
	    name: string;
	    singularName: string;
	    namespaced: boolean;
	    group?: string;
	    version?: string;
	    kind: string;
	    verbs: string[];
	    shortNames?: string[];
	    categories?: string[];
	    storageVersionHash?: string;
	
	    static createFrom(source: any = {}) {
	        return new APIResource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.singularName = source["singularName"];
	        this.namespaced = source["namespaced"];
	        this.group = source["group"];
	        this.version = source["version"];
	        this.kind = source["kind"];
	        this.verbs = source["verbs"];
	        this.shortNames = source["shortNames"];
	        this.categories = source["categories"];
	        this.storageVersionHash = source["storageVersionHash"];
	    }
	}

}

