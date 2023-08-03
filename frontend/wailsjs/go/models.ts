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
	export class PodAntiAffinity {
	    requiredDuringSchedulingIgnoredDuringExecution?: PodAffinityTerm[];
	    preferredDuringSchedulingIgnoredDuringExecution?: WeightedPodAffinityTerm[];
	
	    static createFrom(source: any = {}) {
	        return new PodAntiAffinity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.requiredDuringSchedulingIgnoredDuringExecution = this.convertValues(source["requiredDuringSchedulingIgnoredDuringExecution"], PodAffinityTerm);
	        this.preferredDuringSchedulingIgnoredDuringExecution = this.convertValues(source["preferredDuringSchedulingIgnoredDuringExecution"], WeightedPodAffinityTerm);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class WeightedPodAffinityTerm {
	    weight: number;
	    podAffinityTerm: PodAffinityTerm;
	
	    static createFrom(source: any = {}) {
	        return new WeightedPodAffinityTerm(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.weight = source["weight"];
	        this.podAffinityTerm = this.convertValues(source["podAffinityTerm"], PodAffinityTerm);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LabelSelectorRequirement {
	    key: string;
	    operator: string;
	    values?: string[];
	
	    static createFrom(source: any = {}) {
	        return new LabelSelectorRequirement(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.key = source["key"];
	        this.operator = source["operator"];
	        this.values = source["values"];
	    }
	}
	export class LabelSelector {
	    matchLabels?: {[key: string]: string};
	    matchExpressions?: LabelSelectorRequirement[];
	
	    static createFrom(source: any = {}) {
	        return new LabelSelector(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.matchLabels = source["matchLabels"];
	        this.matchExpressions = this.convertValues(source["matchExpressions"], LabelSelectorRequirement);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PodAffinityTerm {
	    labelSelector?: LabelSelector;
	    namespaces?: string[];
	    topologyKey: string;
	    namespaceSelector?: LabelSelector;
	
	    static createFrom(source: any = {}) {
	        return new PodAffinityTerm(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.labelSelector = this.convertValues(source["labelSelector"], LabelSelector);
	        this.namespaces = source["namespaces"];
	        this.topologyKey = source["topologyKey"];
	        this.namespaceSelector = this.convertValues(source["namespaceSelector"], LabelSelector);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PodAffinity {
	    requiredDuringSchedulingIgnoredDuringExecution?: PodAffinityTerm[];
	    preferredDuringSchedulingIgnoredDuringExecution?: WeightedPodAffinityTerm[];
	
	    static createFrom(source: any = {}) {
	        return new PodAffinity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.requiredDuringSchedulingIgnoredDuringExecution = this.convertValues(source["requiredDuringSchedulingIgnoredDuringExecution"], PodAffinityTerm);
	        this.preferredDuringSchedulingIgnoredDuringExecution = this.convertValues(source["preferredDuringSchedulingIgnoredDuringExecution"], WeightedPodAffinityTerm);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PreferredSchedulingTerm {
	    weight: number;
	    preference: NodeSelectorTerm;
	
	    static createFrom(source: any = {}) {
	        return new PreferredSchedulingTerm(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.weight = source["weight"];
	        this.preference = this.convertValues(source["preference"], NodeSelectorTerm);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class NodeSelectorRequirement {
	    key: string;
	    operator: string;
	    values?: string[];
	
	    static createFrom(source: any = {}) {
	        return new NodeSelectorRequirement(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.key = source["key"];
	        this.operator = source["operator"];
	        this.values = source["values"];
	    }
	}
	export class NodeSelectorTerm {
	    matchExpressions?: NodeSelectorRequirement[];
	    matchFields?: NodeSelectorRequirement[];
	
	    static createFrom(source: any = {}) {
	        return new NodeSelectorTerm(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.matchExpressions = this.convertValues(source["matchExpressions"], NodeSelectorRequirement);
	        this.matchFields = this.convertValues(source["matchFields"], NodeSelectorRequirement);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class NodeSelector {
	    nodeSelectorTerms: NodeSelectorTerm[];
	
	    static createFrom(source: any = {}) {
	        return new NodeSelector(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.nodeSelectorTerms = this.convertValues(source["nodeSelectorTerms"], NodeSelectorTerm);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class NodeAffinity {
	    requiredDuringSchedulingIgnoredDuringExecution?: NodeSelector;
	    preferredDuringSchedulingIgnoredDuringExecution?: PreferredSchedulingTerm[];
	
	    static createFrom(source: any = {}) {
	        return new NodeAffinity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.requiredDuringSchedulingIgnoredDuringExecution = this.convertValues(source["requiredDuringSchedulingIgnoredDuringExecution"], NodeSelector);
	        this.preferredDuringSchedulingIgnoredDuringExecution = this.convertValues(source["preferredDuringSchedulingIgnoredDuringExecution"], PreferredSchedulingTerm);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Affinity {
	    nodeAffinity?: NodeAffinity;
	    podAffinity?: PodAffinity;
	    podAntiAffinity?: PodAntiAffinity;
	
	    static createFrom(source: any = {}) {
	        return new Affinity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.nodeAffinity = this.convertValues(source["nodeAffinity"], NodeAffinity);
	        this.podAffinity = this.convertValues(source["podAffinity"], PodAffinity);
	        this.podAntiAffinity = this.convertValues(source["podAntiAffinity"], PodAntiAffinity);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Capabilities {
	    add?: string[];
	    drop?: string[];
	
	    static createFrom(source: any = {}) {
	        return new Capabilities(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.add = source["add"];
	        this.drop = source["drop"];
	    }
	}
	export class ClaimSource {
	    resourceClaimName?: string;
	    resourceClaimTemplateName?: string;
	
	    static createFrom(source: any = {}) {
	        return new ClaimSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.resourceClaimName = source["resourceClaimName"];
	        this.resourceClaimTemplateName = source["resourceClaimTemplateName"];
	    }
	}
	export class ConfigMapEnvSource {
	    name?: string;
	    optional?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new ConfigMapEnvSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.optional = source["optional"];
	    }
	}
	export class ConfigMapKeySelector {
	    name?: string;
	    key: string;
	    optional?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new ConfigMapKeySelector(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.key = source["key"];
	        this.optional = source["optional"];
	    }
	}
	export class SeccompProfile {
	    type: string;
	    localhostProfile?: string;
	
	    static createFrom(source: any = {}) {
	        return new SeccompProfile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.localhostProfile = source["localhostProfile"];
	    }
	}
	export class WindowsSecurityContextOptions {
	    gmsaCredentialSpecName?: string;
	    gmsaCredentialSpec?: string;
	    runAsUserName?: string;
	    hostProcess?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new WindowsSecurityContextOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.gmsaCredentialSpecName = source["gmsaCredentialSpecName"];
	        this.gmsaCredentialSpec = source["gmsaCredentialSpec"];
	        this.runAsUserName = source["runAsUserName"];
	        this.hostProcess = source["hostProcess"];
	    }
	}
	export class SELinuxOptions {
	    user?: string;
	    role?: string;
	    type?: string;
	    level?: string;
	
	    static createFrom(source: any = {}) {
	        return new SELinuxOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.user = source["user"];
	        this.role = source["role"];
	        this.type = source["type"];
	        this.level = source["level"];
	    }
	}
	export class SecurityContext {
	    capabilities?: Capabilities;
	    privileged?: boolean;
	    seLinuxOptions?: SELinuxOptions;
	    windowsOptions?: WindowsSecurityContextOptions;
	    runAsUser?: number;
	    runAsGroup?: number;
	    runAsNonRoot?: boolean;
	    readOnlyRootFilesystem?: boolean;
	    allowPrivilegeEscalation?: boolean;
	    procMount?: string;
	    seccompProfile?: SeccompProfile;
	
	    static createFrom(source: any = {}) {
	        return new SecurityContext(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.capabilities = this.convertValues(source["capabilities"], Capabilities);
	        this.privileged = source["privileged"];
	        this.seLinuxOptions = this.convertValues(source["seLinuxOptions"], SELinuxOptions);
	        this.windowsOptions = this.convertValues(source["windowsOptions"], WindowsSecurityContextOptions);
	        this.runAsUser = source["runAsUser"];
	        this.runAsGroup = source["runAsGroup"];
	        this.runAsNonRoot = source["runAsNonRoot"];
	        this.readOnlyRootFilesystem = source["readOnlyRootFilesystem"];
	        this.allowPrivilegeEscalation = source["allowPrivilegeEscalation"];
	        this.procMount = source["procMount"];
	        this.seccompProfile = this.convertValues(source["seccompProfile"], SeccompProfile);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LifecycleHandler {
	    exec?: ExecAction;
	    httpGet?: HTTPGetAction;
	    tcpSocket?: TCPSocketAction;
	
	    static createFrom(source: any = {}) {
	        return new LifecycleHandler(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.exec = this.convertValues(source["exec"], ExecAction);
	        this.httpGet = this.convertValues(source["httpGet"], HTTPGetAction);
	        this.tcpSocket = this.convertValues(source["tcpSocket"], TCPSocketAction);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Lifecycle {
	    postStart?: LifecycleHandler;
	    preStop?: LifecycleHandler;
	
	    static createFrom(source: any = {}) {
	        return new Lifecycle(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.postStart = this.convertValues(source["postStart"], LifecycleHandler);
	        this.preStop = this.convertValues(source["preStop"], LifecycleHandler);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class GRPCAction {
	    port: number;
	    service?: string;
	
	    static createFrom(source: any = {}) {
	        return new GRPCAction(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.port = source["port"];
	        this.service = source["service"];
	    }
	}
	export class TCPSocketAction {
	    // Go type: intstr
	    port: any;
	    host?: string;
	
	    static createFrom(source: any = {}) {
	        return new TCPSocketAction(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.port = this.convertValues(source["port"], null);
	        this.host = source["host"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class HTTPHeader {
	    name: string;
	    value: string;
	
	    static createFrom(source: any = {}) {
	        return new HTTPHeader(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.value = source["value"];
	    }
	}
	export class HTTPGetAction {
	    path?: string;
	    // Go type: intstr
	    port: any;
	    host?: string;
	    scheme?: string;
	    httpHeaders?: HTTPHeader[];
	
	    static createFrom(source: any = {}) {
	        return new HTTPGetAction(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.path = source["path"];
	        this.port = this.convertValues(source["port"], null);
	        this.host = source["host"];
	        this.scheme = source["scheme"];
	        this.httpHeaders = this.convertValues(source["httpHeaders"], HTTPHeader);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ExecAction {
	    command?: string[];
	
	    static createFrom(source: any = {}) {
	        return new ExecAction(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.command = source["command"];
	    }
	}
	export class Probe {
	    exec?: ExecAction;
	    httpGet?: HTTPGetAction;
	    tcpSocket?: TCPSocketAction;
	    // Go type: GRPCAction
	    grpc?: any;
	    initialDelaySeconds?: number;
	    timeoutSeconds?: number;
	    periodSeconds?: number;
	    successThreshold?: number;
	    failureThreshold?: number;
	    terminationGracePeriodSeconds?: number;
	
	    static createFrom(source: any = {}) {
	        return new Probe(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.exec = this.convertValues(source["exec"], ExecAction);
	        this.httpGet = this.convertValues(source["httpGet"], HTTPGetAction);
	        this.tcpSocket = this.convertValues(source["tcpSocket"], TCPSocketAction);
	        this.grpc = this.convertValues(source["grpc"], null);
	        this.initialDelaySeconds = source["initialDelaySeconds"];
	        this.timeoutSeconds = source["timeoutSeconds"];
	        this.periodSeconds = source["periodSeconds"];
	        this.successThreshold = source["successThreshold"];
	        this.failureThreshold = source["failureThreshold"];
	        this.terminationGracePeriodSeconds = source["terminationGracePeriodSeconds"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class VolumeDevice {
	    name: string;
	    devicePath: string;
	
	    static createFrom(source: any = {}) {
	        return new VolumeDevice(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.devicePath = source["devicePath"];
	    }
	}
	export class VolumeMount {
	    name: string;
	    readOnly?: boolean;
	    mountPath: string;
	    subPath?: string;
	    mountPropagation?: string;
	    subPathExpr?: string;
	
	    static createFrom(source: any = {}) {
	        return new VolumeMount(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.readOnly = source["readOnly"];
	        this.mountPath = source["mountPath"];
	        this.subPath = source["subPath"];
	        this.mountPropagation = source["mountPropagation"];
	        this.subPathExpr = source["subPathExpr"];
	    }
	}
	export class ContainerResizePolicy {
	    resourceName: string;
	    restartPolicy: string;
	
	    static createFrom(source: any = {}) {
	        return new ContainerResizePolicy(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.resourceName = source["resourceName"];
	        this.restartPolicy = source["restartPolicy"];
	    }
	}
	export class ResourceClaim {
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new ResourceClaim(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	    }
	}
	export class ResourceRequirements {
	    limits?: {[key: string]: resource.Quantity};
	    requests?: {[key: string]: resource.Quantity};
	    claims?: ResourceClaim[];
	
	    static createFrom(source: any = {}) {
	        return new ResourceRequirements(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.limits = this.convertValues(source["limits"], resource.Quantity, true);
	        this.requests = this.convertValues(source["requests"], resource.Quantity, true);
	        this.claims = this.convertValues(source["claims"], ResourceClaim);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class SecretKeySelector {
	    name?: string;
	    key: string;
	    optional?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new SecretKeySelector(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.key = source["key"];
	        this.optional = source["optional"];
	    }
	}
	export class ResourceFieldSelector {
	    containerName?: string;
	    resource: string;
	    // Go type: resource
	    divisor?: any;
	
	    static createFrom(source: any = {}) {
	        return new ResourceFieldSelector(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.containerName = source["containerName"];
	        this.resource = source["resource"];
	        this.divisor = this.convertValues(source["divisor"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ObjectFieldSelector {
	    apiVersion?: string;
	    fieldPath: string;
	
	    static createFrom(source: any = {}) {
	        return new ObjectFieldSelector(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.apiVersion = source["apiVersion"];
	        this.fieldPath = source["fieldPath"];
	    }
	}
	export class EnvVarSource {
	    fieldRef?: ObjectFieldSelector;
	    resourceFieldRef?: ResourceFieldSelector;
	    configMapKeyRef?: ConfigMapKeySelector;
	    secretKeyRef?: SecretKeySelector;
	
	    static createFrom(source: any = {}) {
	        return new EnvVarSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.fieldRef = this.convertValues(source["fieldRef"], ObjectFieldSelector);
	        this.resourceFieldRef = this.convertValues(source["resourceFieldRef"], ResourceFieldSelector);
	        this.configMapKeyRef = this.convertValues(source["configMapKeyRef"], ConfigMapKeySelector);
	        this.secretKeyRef = this.convertValues(source["secretKeyRef"], SecretKeySelector);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class EnvVar {
	    name: string;
	    value?: string;
	    valueFrom?: EnvVarSource;
	
	    static createFrom(source: any = {}) {
	        return new EnvVar(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.value = source["value"];
	        this.valueFrom = this.convertValues(source["valueFrom"], EnvVarSource);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class SecretEnvSource {
	    name?: string;
	    optional?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new SecretEnvSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.optional = source["optional"];
	    }
	}
	export class EnvFromSource {
	    prefix?: string;
	    configMapRef?: ConfigMapEnvSource;
	    secretRef?: SecretEnvSource;
	
	    static createFrom(source: any = {}) {
	        return new EnvFromSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.prefix = source["prefix"];
	        this.configMapRef = this.convertValues(source["configMapRef"], ConfigMapEnvSource);
	        this.secretRef = this.convertValues(source["secretRef"], SecretEnvSource);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ContainerPort {
	    name?: string;
	    hostPort?: number;
	    containerPort: number;
	    protocol?: string;
	    hostIP?: string;
	
	    static createFrom(source: any = {}) {
	        return new ContainerPort(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.hostPort = source["hostPort"];
	        this.containerPort = source["containerPort"];
	        this.protocol = source["protocol"];
	        this.hostIP = source["hostIP"];
	    }
	}
	export class Container {
	    name: string;
	    image?: string;
	    command?: string[];
	    args?: string[];
	    workingDir?: string;
	    ports?: ContainerPort[];
	    envFrom?: EnvFromSource[];
	    env?: EnvVar[];
	    resources?: ResourceRequirements;
	    resizePolicy?: ContainerResizePolicy[];
	    volumeMounts?: VolumeMount[];
	    volumeDevices?: VolumeDevice[];
	    livenessProbe?: Probe;
	    readinessProbe?: Probe;
	    startupProbe?: Probe;
	    lifecycle?: Lifecycle;
	    terminationMessagePath?: string;
	    terminationMessagePolicy?: string;
	    imagePullPolicy?: string;
	    securityContext?: SecurityContext;
	    stdin?: boolean;
	    stdinOnce?: boolean;
	    tty?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Container(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.image = source["image"];
	        this.command = source["command"];
	        this.args = source["args"];
	        this.workingDir = source["workingDir"];
	        this.ports = this.convertValues(source["ports"], ContainerPort);
	        this.envFrom = this.convertValues(source["envFrom"], EnvFromSource);
	        this.env = this.convertValues(source["env"], EnvVar);
	        this.resources = this.convertValues(source["resources"], ResourceRequirements);
	        this.resizePolicy = this.convertValues(source["resizePolicy"], ContainerResizePolicy);
	        this.volumeMounts = this.convertValues(source["volumeMounts"], VolumeMount);
	        this.volumeDevices = this.convertValues(source["volumeDevices"], VolumeDevice);
	        this.livenessProbe = this.convertValues(source["livenessProbe"], Probe);
	        this.readinessProbe = this.convertValues(source["readinessProbe"], Probe);
	        this.startupProbe = this.convertValues(source["startupProbe"], Probe);
	        this.lifecycle = this.convertValues(source["lifecycle"], Lifecycle);
	        this.terminationMessagePath = source["terminationMessagePath"];
	        this.terminationMessagePolicy = source["terminationMessagePolicy"];
	        this.imagePullPolicy = source["imagePullPolicy"];
	        this.securityContext = this.convertValues(source["securityContext"], SecurityContext);
	        this.stdin = source["stdin"];
	        this.stdinOnce = source["stdinOnce"];
	        this.tty = source["tty"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	export class DeploymentCondition {
	    type: string;
	    status: string;
	    // Go type: Time
	    lastUpdateTime?: any;
	    // Go type: Time
	    lastTransitionTime?: any;
	    reason?: string;
	    message?: string;
	
	    static createFrom(source: any = {}) {
	        return new DeploymentCondition(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.status = source["status"];
	        this.lastUpdateTime = this.convertValues(source["lastUpdateTime"], null);
	        this.lastTransitionTime = this.convertValues(source["lastTransitionTime"], null);
	        this.reason = source["reason"];
	        this.message = source["message"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DeploymentStatus {
	    observedGeneration?: number;
	    replicas?: number;
	    updatedReplicas?: number;
	    readyReplicas?: number;
	    availableReplicas?: number;
	    unavailableReplicas?: number;
	    conditions?: DeploymentCondition[];
	    collisionCount?: number;
	
	    static createFrom(source: any = {}) {
	        return new DeploymentStatus(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.observedGeneration = source["observedGeneration"];
	        this.replicas = source["replicas"];
	        this.updatedReplicas = source["updatedReplicas"];
	        this.readyReplicas = source["readyReplicas"];
	        this.availableReplicas = source["availableReplicas"];
	        this.unavailableReplicas = source["unavailableReplicas"];
	        this.conditions = this.convertValues(source["conditions"], DeploymentCondition);
	        this.collisionCount = source["collisionCount"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class RollingUpdateDeployment {
	    // Go type: intstr
	    maxUnavailable?: any;
	    // Go type: intstr
	    maxSurge?: any;
	
	    static createFrom(source: any = {}) {
	        return new RollingUpdateDeployment(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.maxUnavailable = this.convertValues(source["maxUnavailable"], null);
	        this.maxSurge = this.convertValues(source["maxSurge"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DeploymentStrategy {
	    type?: string;
	    rollingUpdate?: RollingUpdateDeployment;
	
	    static createFrom(source: any = {}) {
	        return new DeploymentStrategy(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.rollingUpdate = this.convertValues(source["rollingUpdate"], RollingUpdateDeployment);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PodResourceClaim {
	    name: string;
	    source?: ClaimSource;
	
	    static createFrom(source: any = {}) {
	        return new PodResourceClaim(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.source = this.convertValues(source["source"], ClaimSource);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PodSchedulingGate {
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new PodSchedulingGate(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	    }
	}
	export class PodOS {
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new PodOS(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	    }
	}
	export class TopologySpreadConstraint {
	    maxSkew: number;
	    topologyKey: string;
	    whenUnsatisfiable: string;
	    labelSelector?: LabelSelector;
	    minDomains?: number;
	    nodeAffinityPolicy?: string;
	    nodeTaintsPolicy?: string;
	    matchLabelKeys?: string[];
	
	    static createFrom(source: any = {}) {
	        return new TopologySpreadConstraint(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.maxSkew = source["maxSkew"];
	        this.topologyKey = source["topologyKey"];
	        this.whenUnsatisfiable = source["whenUnsatisfiable"];
	        this.labelSelector = this.convertValues(source["labelSelector"], LabelSelector);
	        this.minDomains = source["minDomains"];
	        this.nodeAffinityPolicy = source["nodeAffinityPolicy"];
	        this.nodeTaintsPolicy = source["nodeTaintsPolicy"];
	        this.matchLabelKeys = source["matchLabelKeys"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PodReadinessGate {
	    conditionType: string;
	
	    static createFrom(source: any = {}) {
	        return new PodReadinessGate(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.conditionType = source["conditionType"];
	    }
	}
	export class PodDNSConfigOption {
	    name?: string;
	    value?: string;
	
	    static createFrom(source: any = {}) {
	        return new PodDNSConfigOption(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.value = source["value"];
	    }
	}
	export class PodDNSConfig {
	    nameservers?: string[];
	    searches?: string[];
	    options?: PodDNSConfigOption[];
	
	    static createFrom(source: any = {}) {
	        return new PodDNSConfig(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.nameservers = source["nameservers"];
	        this.searches = source["searches"];
	        this.options = this.convertValues(source["options"], PodDNSConfigOption);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class HostAlias {
	    ip?: string;
	    hostnames?: string[];
	
	    static createFrom(source: any = {}) {
	        return new HostAlias(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ip = source["ip"];
	        this.hostnames = source["hostnames"];
	    }
	}
	export class Toleration {
	    key?: string;
	    operator?: string;
	    value?: string;
	    effect?: string;
	    tolerationSeconds?: number;
	
	    static createFrom(source: any = {}) {
	        return new Toleration(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.key = source["key"];
	        this.operator = source["operator"];
	        this.value = source["value"];
	        this.effect = source["effect"];
	        this.tolerationSeconds = source["tolerationSeconds"];
	    }
	}
	export class Sysctl {
	    name: string;
	    value: string;
	
	    static createFrom(source: any = {}) {
	        return new Sysctl(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.value = source["value"];
	    }
	}
	export class PodSecurityContext {
	    seLinuxOptions?: SELinuxOptions;
	    windowsOptions?: WindowsSecurityContextOptions;
	    runAsUser?: number;
	    runAsGroup?: number;
	    runAsNonRoot?: boolean;
	    supplementalGroups?: number[];
	    fsGroup?: number;
	    sysctls?: Sysctl[];
	    fsGroupChangePolicy?: string;
	    seccompProfile?: SeccompProfile;
	
	    static createFrom(source: any = {}) {
	        return new PodSecurityContext(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.seLinuxOptions = this.convertValues(source["seLinuxOptions"], SELinuxOptions);
	        this.windowsOptions = this.convertValues(source["windowsOptions"], WindowsSecurityContextOptions);
	        this.runAsUser = source["runAsUser"];
	        this.runAsGroup = source["runAsGroup"];
	        this.runAsNonRoot = source["runAsNonRoot"];
	        this.supplementalGroups = source["supplementalGroups"];
	        this.fsGroup = source["fsGroup"];
	        this.sysctls = this.convertValues(source["sysctls"], Sysctl);
	        this.fsGroupChangePolicy = source["fsGroupChangePolicy"];
	        this.seccompProfile = this.convertValues(source["seccompProfile"], SeccompProfile);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class EphemeralContainer {
	    name: string;
	    image?: string;
	    command?: string[];
	    args?: string[];
	    workingDir?: string;
	    ports?: ContainerPort[];
	    envFrom?: EnvFromSource[];
	    env?: EnvVar[];
	    resources?: ResourceRequirements;
	    resizePolicy?: ContainerResizePolicy[];
	    volumeMounts?: VolumeMount[];
	    volumeDevices?: VolumeDevice[];
	    livenessProbe?: Probe;
	    readinessProbe?: Probe;
	    startupProbe?: Probe;
	    lifecycle?: Lifecycle;
	    terminationMessagePath?: string;
	    terminationMessagePolicy?: string;
	    imagePullPolicy?: string;
	    securityContext?: SecurityContext;
	    stdin?: boolean;
	    stdinOnce?: boolean;
	    tty?: boolean;
	    targetContainerName?: string;
	
	    static createFrom(source: any = {}) {
	        return new EphemeralContainer(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.image = source["image"];
	        this.command = source["command"];
	        this.args = source["args"];
	        this.workingDir = source["workingDir"];
	        this.ports = this.convertValues(source["ports"], ContainerPort);
	        this.envFrom = this.convertValues(source["envFrom"], EnvFromSource);
	        this.env = this.convertValues(source["env"], EnvVar);
	        this.resources = this.convertValues(source["resources"], ResourceRequirements);
	        this.resizePolicy = this.convertValues(source["resizePolicy"], ContainerResizePolicy);
	        this.volumeMounts = this.convertValues(source["volumeMounts"], VolumeMount);
	        this.volumeDevices = this.convertValues(source["volumeDevices"], VolumeDevice);
	        this.livenessProbe = this.convertValues(source["livenessProbe"], Probe);
	        this.readinessProbe = this.convertValues(source["readinessProbe"], Probe);
	        this.startupProbe = this.convertValues(source["startupProbe"], Probe);
	        this.lifecycle = this.convertValues(source["lifecycle"], Lifecycle);
	        this.terminationMessagePath = source["terminationMessagePath"];
	        this.terminationMessagePolicy = source["terminationMessagePolicy"];
	        this.imagePullPolicy = source["imagePullPolicy"];
	        this.securityContext = this.convertValues(source["securityContext"], SecurityContext);
	        this.stdin = source["stdin"];
	        this.stdinOnce = source["stdinOnce"];
	        this.tty = source["tty"];
	        this.targetContainerName = source["targetContainerName"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class TypedObjectReference {
	    apiGroup?: string;
	    kind: string;
	    name: string;
	    namespace?: string;
	
	    static createFrom(source: any = {}) {
	        return new TypedObjectReference(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.apiGroup = source["apiGroup"];
	        this.kind = source["kind"];
	        this.name = source["name"];
	        this.namespace = source["namespace"];
	    }
	}
	export class TypedLocalObjectReference {
	    apiGroup?: string;
	    kind: string;
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new TypedLocalObjectReference(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.apiGroup = source["apiGroup"];
	        this.kind = source["kind"];
	        this.name = source["name"];
	    }
	}
	export class PersistentVolumeClaimSpec {
	    accessModes?: string[];
	    selector?: LabelSelector;
	    resources?: ResourceRequirements;
	    volumeName?: string;
	    storageClassName?: string;
	    volumeMode?: string;
	    // Go type: TypedLocalObjectReference
	    dataSource?: any;
	    // Go type: TypedObjectReference
	    dataSourceRef?: any;
	
	    static createFrom(source: any = {}) {
	        return new PersistentVolumeClaimSpec(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.accessModes = source["accessModes"];
	        this.selector = this.convertValues(source["selector"], LabelSelector);
	        this.resources = this.convertValues(source["resources"], ResourceRequirements);
	        this.volumeName = source["volumeName"];
	        this.storageClassName = source["storageClassName"];
	        this.volumeMode = source["volumeMode"];
	        this.dataSource = this.convertValues(source["dataSource"], null);
	        this.dataSourceRef = this.convertValues(source["dataSourceRef"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PersistentVolumeClaimTemplate {
	    name?: string;
	    generateName?: string;
	    namespace?: string;
	    selfLink?: string;
	    uid?: string;
	    resourceVersion?: string;
	    generation?: number;
	    // Go type: Time
	    creationTimestamp?: any;
	    // Go type: Time
	    deletionTimestamp?: any;
	    deletionGracePeriodSeconds?: number;
	    labels?: {[key: string]: string};
	    annotations?: {[key: string]: string};
	    ownerReferences?: OwnerReference[];
	    finalizers?: string[];
	    managedFields?: ManagedFieldsEntry[];
	    // Go type: PersistentVolumeClaimSpec
	    spec: any;
	
	    static createFrom(source: any = {}) {
	        return new PersistentVolumeClaimTemplate(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.generateName = source["generateName"];
	        this.namespace = source["namespace"];
	        this.selfLink = source["selfLink"];
	        this.uid = source["uid"];
	        this.resourceVersion = source["resourceVersion"];
	        this.generation = source["generation"];
	        this.creationTimestamp = this.convertValues(source["creationTimestamp"], null);
	        this.deletionTimestamp = this.convertValues(source["deletionTimestamp"], null);
	        this.deletionGracePeriodSeconds = source["deletionGracePeriodSeconds"];
	        this.labels = source["labels"];
	        this.annotations = source["annotations"];
	        this.ownerReferences = this.convertValues(source["ownerReferences"], OwnerReference);
	        this.finalizers = source["finalizers"];
	        this.managedFields = this.convertValues(source["managedFields"], ManagedFieldsEntry);
	        this.spec = this.convertValues(source["spec"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class EphemeralVolumeSource {
	    // Go type: PersistentVolumeClaimTemplate
	    volumeClaimTemplate?: any;
	
	    static createFrom(source: any = {}) {
	        return new EphemeralVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.volumeClaimTemplate = this.convertValues(source["volumeClaimTemplate"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class CSIVolumeSource {
	    driver: string;
	    readOnly?: boolean;
	    fsType?: string;
	    volumeAttributes?: {[key: string]: string};
	    nodePublishSecretRef?: LocalObjectReference;
	
	    static createFrom(source: any = {}) {
	        return new CSIVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.driver = source["driver"];
	        this.readOnly = source["readOnly"];
	        this.fsType = source["fsType"];
	        this.volumeAttributes = source["volumeAttributes"];
	        this.nodePublishSecretRef = this.convertValues(source["nodePublishSecretRef"], LocalObjectReference);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class StorageOSVolumeSource {
	    volumeName?: string;
	    volumeNamespace?: string;
	    fsType?: string;
	    readOnly?: boolean;
	    secretRef?: LocalObjectReference;
	
	    static createFrom(source: any = {}) {
	        return new StorageOSVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.volumeName = source["volumeName"];
	        this.volumeNamespace = source["volumeNamespace"];
	        this.fsType = source["fsType"];
	        this.readOnly = source["readOnly"];
	        this.secretRef = this.convertValues(source["secretRef"], LocalObjectReference);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ScaleIOVolumeSource {
	    gateway: string;
	    system: string;
	    secretRef?: LocalObjectReference;
	    sslEnabled?: boolean;
	    protectionDomain?: string;
	    storagePool?: string;
	    storageMode?: string;
	    volumeName?: string;
	    fsType?: string;
	    readOnly?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new ScaleIOVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.gateway = source["gateway"];
	        this.system = source["system"];
	        this.secretRef = this.convertValues(source["secretRef"], LocalObjectReference);
	        this.sslEnabled = source["sslEnabled"];
	        this.protectionDomain = source["protectionDomain"];
	        this.storagePool = source["storagePool"];
	        this.storageMode = source["storageMode"];
	        this.volumeName = source["volumeName"];
	        this.fsType = source["fsType"];
	        this.readOnly = source["readOnly"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PortworxVolumeSource {
	    volumeID: string;
	    fsType?: string;
	    readOnly?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new PortworxVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.volumeID = source["volumeID"];
	        this.fsType = source["fsType"];
	        this.readOnly = source["readOnly"];
	    }
	}
	export class ServiceAccountTokenProjection {
	    audience?: string;
	    expirationSeconds?: number;
	    path: string;
	
	    static createFrom(source: any = {}) {
	        return new ServiceAccountTokenProjection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.audience = source["audience"];
	        this.expirationSeconds = source["expirationSeconds"];
	        this.path = source["path"];
	    }
	}
	export class ConfigMapProjection {
	    name?: string;
	    items?: KeyToPath[];
	    optional?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new ConfigMapProjection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.items = this.convertValues(source["items"], KeyToPath);
	        this.optional = source["optional"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DownwardAPIProjection {
	    items?: DownwardAPIVolumeFile[];
	
	    static createFrom(source: any = {}) {
	        return new DownwardAPIProjection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.items = this.convertValues(source["items"], DownwardAPIVolumeFile);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class SecretProjection {
	    name?: string;
	    items?: KeyToPath[];
	    optional?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new SecretProjection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.items = this.convertValues(source["items"], KeyToPath);
	        this.optional = source["optional"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class VolumeProjection {
	    // Go type: SecretProjection
	    secret?: any;
	    // Go type: DownwardAPIProjection
	    downwardAPI?: any;
	    // Go type: ConfigMapProjection
	    configMap?: any;
	    // Go type: ServiceAccountTokenProjection
	    serviceAccountToken?: any;
	
	    static createFrom(source: any = {}) {
	        return new VolumeProjection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.secret = this.convertValues(source["secret"], null);
	        this.downwardAPI = this.convertValues(source["downwardAPI"], null);
	        this.configMap = this.convertValues(source["configMap"], null);
	        this.serviceAccountToken = this.convertValues(source["serviceAccountToken"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ProjectedVolumeSource {
	    sources: VolumeProjection[];
	    defaultMode?: number;
	
	    static createFrom(source: any = {}) {
	        return new ProjectedVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.sources = this.convertValues(source["sources"], VolumeProjection);
	        this.defaultMode = source["defaultMode"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PhotonPersistentDiskVolumeSource {
	    pdID: string;
	    fsType?: string;
	
	    static createFrom(source: any = {}) {
	        return new PhotonPersistentDiskVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.pdID = source["pdID"];
	        this.fsType = source["fsType"];
	    }
	}
	export class AzureDiskVolumeSource {
	    diskName: string;
	    diskURI: string;
	    cachingMode?: string;
	    fsType?: string;
	    readOnly?: boolean;
	    kind?: string;
	
	    static createFrom(source: any = {}) {
	        return new AzureDiskVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.diskName = source["diskName"];
	        this.diskURI = source["diskURI"];
	        this.cachingMode = source["cachingMode"];
	        this.fsType = source["fsType"];
	        this.readOnly = source["readOnly"];
	        this.kind = source["kind"];
	    }
	}
	export class QuobyteVolumeSource {
	    registry: string;
	    volume: string;
	    readOnly?: boolean;
	    user?: string;
	    group?: string;
	    tenant?: string;
	
	    static createFrom(source: any = {}) {
	        return new QuobyteVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.registry = source["registry"];
	        this.volume = source["volume"];
	        this.readOnly = source["readOnly"];
	        this.user = source["user"];
	        this.group = source["group"];
	        this.tenant = source["tenant"];
	    }
	}
	export class VsphereVirtualDiskVolumeSource {
	    volumePath: string;
	    fsType?: string;
	    storagePolicyName?: string;
	    storagePolicyID?: string;
	
	    static createFrom(source: any = {}) {
	        return new VsphereVirtualDiskVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.volumePath = source["volumePath"];
	        this.fsType = source["fsType"];
	        this.storagePolicyName = source["storagePolicyName"];
	        this.storagePolicyID = source["storagePolicyID"];
	    }
	}
	export class ConfigMapVolumeSource {
	    name?: string;
	    items?: KeyToPath[];
	    defaultMode?: number;
	    optional?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new ConfigMapVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.items = this.convertValues(source["items"], KeyToPath);
	        this.defaultMode = source["defaultMode"];
	        this.optional = source["optional"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class AzureFileVolumeSource {
	    secretName: string;
	    shareName: string;
	    readOnly?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new AzureFileVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.secretName = source["secretName"];
	        this.shareName = source["shareName"];
	        this.readOnly = source["readOnly"];
	    }
	}
	export class FCVolumeSource {
	    targetWWNs?: string[];
	    lun?: number;
	    fsType?: string;
	    readOnly?: boolean;
	    wwids?: string[];
	
	    static createFrom(source: any = {}) {
	        return new FCVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.targetWWNs = source["targetWWNs"];
	        this.lun = source["lun"];
	        this.fsType = source["fsType"];
	        this.readOnly = source["readOnly"];
	        this.wwids = source["wwids"];
	    }
	}
	export class DownwardAPIVolumeFile {
	    path: string;
	    fieldRef?: ObjectFieldSelector;
	    resourceFieldRef?: ResourceFieldSelector;
	    mode?: number;
	
	    static createFrom(source: any = {}) {
	        return new DownwardAPIVolumeFile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.path = source["path"];
	        this.fieldRef = this.convertValues(source["fieldRef"], ObjectFieldSelector);
	        this.resourceFieldRef = this.convertValues(source["resourceFieldRef"], ResourceFieldSelector);
	        this.mode = source["mode"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DownwardAPIVolumeSource {
	    items?: DownwardAPIVolumeFile[];
	    defaultMode?: number;
	
	    static createFrom(source: any = {}) {
	        return new DownwardAPIVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.items = this.convertValues(source["items"], DownwardAPIVolumeFile);
	        this.defaultMode = source["defaultMode"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class FlockerVolumeSource {
	    datasetName?: string;
	    datasetUUID?: string;
	
	    static createFrom(source: any = {}) {
	        return new FlockerVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.datasetName = source["datasetName"];
	        this.datasetUUID = source["datasetUUID"];
	    }
	}
	export class CephFSVolumeSource {
	    monitors: string[];
	    path?: string;
	    user?: string;
	    secretFile?: string;
	    secretRef?: LocalObjectReference;
	    readOnly?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new CephFSVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.monitors = source["monitors"];
	        this.path = source["path"];
	        this.user = source["user"];
	        this.secretFile = source["secretFile"];
	        this.secretRef = this.convertValues(source["secretRef"], LocalObjectReference);
	        this.readOnly = source["readOnly"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class CinderVolumeSource {
	    volumeID: string;
	    fsType?: string;
	    readOnly?: boolean;
	    secretRef?: LocalObjectReference;
	
	    static createFrom(source: any = {}) {
	        return new CinderVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.volumeID = source["volumeID"];
	        this.fsType = source["fsType"];
	        this.readOnly = source["readOnly"];
	        this.secretRef = this.convertValues(source["secretRef"], LocalObjectReference);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class FlexVolumeSource {
	    driver: string;
	    fsType?: string;
	    secretRef?: LocalObjectReference;
	    readOnly?: boolean;
	    options?: {[key: string]: string};
	
	    static createFrom(source: any = {}) {
	        return new FlexVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.driver = source["driver"];
	        this.fsType = source["fsType"];
	        this.secretRef = this.convertValues(source["secretRef"], LocalObjectReference);
	        this.readOnly = source["readOnly"];
	        this.options = source["options"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class RBDVolumeSource {
	    monitors: string[];
	    image: string;
	    fsType?: string;
	    pool?: string;
	    user?: string;
	    keyring?: string;
	    secretRef?: LocalObjectReference;
	    readOnly?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new RBDVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.monitors = source["monitors"];
	        this.image = source["image"];
	        this.fsType = source["fsType"];
	        this.pool = source["pool"];
	        this.user = source["user"];
	        this.keyring = source["keyring"];
	        this.secretRef = this.convertValues(source["secretRef"], LocalObjectReference);
	        this.readOnly = source["readOnly"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PersistentVolumeClaimVolumeSource {
	    claimName: string;
	    readOnly?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new PersistentVolumeClaimVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.claimName = source["claimName"];
	        this.readOnly = source["readOnly"];
	    }
	}
	export class GlusterfsVolumeSource {
	    endpoints: string;
	    path: string;
	    readOnly?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new GlusterfsVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.endpoints = source["endpoints"];
	        this.path = source["path"];
	        this.readOnly = source["readOnly"];
	    }
	}
	export class LocalObjectReference {
	    name?: string;
	
	    static createFrom(source: any = {}) {
	        return new LocalObjectReference(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	    }
	}
	export class ISCSIVolumeSource {
	    targetPortal: string;
	    iqn: string;
	    lun: number;
	    iscsiInterface?: string;
	    fsType?: string;
	    readOnly?: boolean;
	    portals?: string[];
	    chapAuthDiscovery?: boolean;
	    chapAuthSession?: boolean;
	    secretRef?: LocalObjectReference;
	    initiatorName?: string;
	
	    static createFrom(source: any = {}) {
	        return new ISCSIVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.targetPortal = source["targetPortal"];
	        this.iqn = source["iqn"];
	        this.lun = source["lun"];
	        this.iscsiInterface = source["iscsiInterface"];
	        this.fsType = source["fsType"];
	        this.readOnly = source["readOnly"];
	        this.portals = source["portals"];
	        this.chapAuthDiscovery = source["chapAuthDiscovery"];
	        this.chapAuthSession = source["chapAuthSession"];
	        this.secretRef = this.convertValues(source["secretRef"], LocalObjectReference);
	        this.initiatorName = source["initiatorName"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class NFSVolumeSource {
	    server: string;
	    path: string;
	    readOnly?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new NFSVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.server = source["server"];
	        this.path = source["path"];
	        this.readOnly = source["readOnly"];
	    }
	}
	export class KeyToPath {
	    key: string;
	    path: string;
	    mode?: number;
	
	    static createFrom(source: any = {}) {
	        return new KeyToPath(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.key = source["key"];
	        this.path = source["path"];
	        this.mode = source["mode"];
	    }
	}
	export class SecretVolumeSource {
	    secretName?: string;
	    items?: KeyToPath[];
	    defaultMode?: number;
	    optional?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new SecretVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.secretName = source["secretName"];
	        this.items = this.convertValues(source["items"], KeyToPath);
	        this.defaultMode = source["defaultMode"];
	        this.optional = source["optional"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class GitRepoVolumeSource {
	    repository: string;
	    revision?: string;
	    directory?: string;
	
	    static createFrom(source: any = {}) {
	        return new GitRepoVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.repository = source["repository"];
	        this.revision = source["revision"];
	        this.directory = source["directory"];
	    }
	}
	export class AWSElasticBlockStoreVolumeSource {
	    volumeID: string;
	    fsType?: string;
	    partition?: number;
	    readOnly?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new AWSElasticBlockStoreVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.volumeID = source["volumeID"];
	        this.fsType = source["fsType"];
	        this.partition = source["partition"];
	        this.readOnly = source["readOnly"];
	    }
	}
	export class GCEPersistentDiskVolumeSource {
	    pdName: string;
	    fsType?: string;
	    partition?: number;
	    readOnly?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new GCEPersistentDiskVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.pdName = source["pdName"];
	        this.fsType = source["fsType"];
	        this.partition = source["partition"];
	        this.readOnly = source["readOnly"];
	    }
	}
	export class EmptyDirVolumeSource {
	    medium?: string;
	    // Go type: resource
	    sizeLimit?: any;
	
	    static createFrom(source: any = {}) {
	        return new EmptyDirVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.medium = source["medium"];
	        this.sizeLimit = this.convertValues(source["sizeLimit"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class HostPathVolumeSource {
	    path: string;
	    type?: string;
	
	    static createFrom(source: any = {}) {
	        return new HostPathVolumeSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.path = source["path"];
	        this.type = source["type"];
	    }
	}
	export class Volume {
	    name: string;
	    // Go type: HostPathVolumeSource
	    hostPath?: any;
	    // Go type: EmptyDirVolumeSource
	    emptyDir?: any;
	    // Go type: GCEPersistentDiskVolumeSource
	    gcePersistentDisk?: any;
	    // Go type: AWSElasticBlockStoreVolumeSource
	    awsElasticBlockStore?: any;
	    // Go type: GitRepoVolumeSource
	    gitRepo?: any;
	    // Go type: SecretVolumeSource
	    secret?: any;
	    // Go type: NFSVolumeSource
	    nfs?: any;
	    // Go type: ISCSIVolumeSource
	    iscsi?: any;
	    // Go type: GlusterfsVolumeSource
	    glusterfs?: any;
	    // Go type: PersistentVolumeClaimVolumeSource
	    persistentVolumeClaim?: any;
	    // Go type: RBDVolumeSource
	    rbd?: any;
	    // Go type: FlexVolumeSource
	    flexVolume?: any;
	    // Go type: CinderVolumeSource
	    cinder?: any;
	    // Go type: CephFSVolumeSource
	    cephfs?: any;
	    // Go type: FlockerVolumeSource
	    flocker?: any;
	    // Go type: DownwardAPIVolumeSource
	    downwardAPI?: any;
	    // Go type: FCVolumeSource
	    fc?: any;
	    // Go type: AzureFileVolumeSource
	    azureFile?: any;
	    // Go type: ConfigMapVolumeSource
	    configMap?: any;
	    // Go type: VsphereVirtualDiskVolumeSource
	    vsphereVolume?: any;
	    // Go type: QuobyteVolumeSource
	    quobyte?: any;
	    // Go type: AzureDiskVolumeSource
	    azureDisk?: any;
	    // Go type: PhotonPersistentDiskVolumeSource
	    photonPersistentDisk?: any;
	    // Go type: ProjectedVolumeSource
	    projected?: any;
	    // Go type: PortworxVolumeSource
	    portworxVolume?: any;
	    // Go type: ScaleIOVolumeSource
	    scaleIO?: any;
	    // Go type: StorageOSVolumeSource
	    storageos?: any;
	    // Go type: CSIVolumeSource
	    csi?: any;
	    // Go type: EphemeralVolumeSource
	    ephemeral?: any;
	
	    static createFrom(source: any = {}) {
	        return new Volume(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.hostPath = this.convertValues(source["hostPath"], null);
	        this.emptyDir = this.convertValues(source["emptyDir"], null);
	        this.gcePersistentDisk = this.convertValues(source["gcePersistentDisk"], null);
	        this.awsElasticBlockStore = this.convertValues(source["awsElasticBlockStore"], null);
	        this.gitRepo = this.convertValues(source["gitRepo"], null);
	        this.secret = this.convertValues(source["secret"], null);
	        this.nfs = this.convertValues(source["nfs"], null);
	        this.iscsi = this.convertValues(source["iscsi"], null);
	        this.glusterfs = this.convertValues(source["glusterfs"], null);
	        this.persistentVolumeClaim = this.convertValues(source["persistentVolumeClaim"], null);
	        this.rbd = this.convertValues(source["rbd"], null);
	        this.flexVolume = this.convertValues(source["flexVolume"], null);
	        this.cinder = this.convertValues(source["cinder"], null);
	        this.cephfs = this.convertValues(source["cephfs"], null);
	        this.flocker = this.convertValues(source["flocker"], null);
	        this.downwardAPI = this.convertValues(source["downwardAPI"], null);
	        this.fc = this.convertValues(source["fc"], null);
	        this.azureFile = this.convertValues(source["azureFile"], null);
	        this.configMap = this.convertValues(source["configMap"], null);
	        this.vsphereVolume = this.convertValues(source["vsphereVolume"], null);
	        this.quobyte = this.convertValues(source["quobyte"], null);
	        this.azureDisk = this.convertValues(source["azureDisk"], null);
	        this.photonPersistentDisk = this.convertValues(source["photonPersistentDisk"], null);
	        this.projected = this.convertValues(source["projected"], null);
	        this.portworxVolume = this.convertValues(source["portworxVolume"], null);
	        this.scaleIO = this.convertValues(source["scaleIO"], null);
	        this.storageos = this.convertValues(source["storageos"], null);
	        this.csi = this.convertValues(source["csi"], null);
	        this.ephemeral = this.convertValues(source["ephemeral"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PodSpec {
	    volumes?: Volume[];
	    initContainers?: Container[];
	    containers: Container[];
	    ephemeralContainers?: EphemeralContainer[];
	    restartPolicy?: string;
	    terminationGracePeriodSeconds?: number;
	    activeDeadlineSeconds?: number;
	    dnsPolicy?: string;
	    nodeSelector?: {[key: string]: string};
	    serviceAccountName?: string;
	    serviceAccount?: string;
	    automountServiceAccountToken?: boolean;
	    nodeName?: string;
	    hostNetwork?: boolean;
	    hostPID?: boolean;
	    hostIPC?: boolean;
	    shareProcessNamespace?: boolean;
	    securityContext?: PodSecurityContext;
	    imagePullSecrets?: LocalObjectReference[];
	    hostname?: string;
	    subdomain?: string;
	    affinity?: Affinity;
	    schedulerName?: string;
	    tolerations?: Toleration[];
	    hostAliases?: HostAlias[];
	    priorityClassName?: string;
	    priority?: number;
	    dnsConfig?: PodDNSConfig;
	    readinessGates?: PodReadinessGate[];
	    runtimeClassName?: string;
	    enableServiceLinks?: boolean;
	    preemptionPolicy?: string;
	    overhead?: {[key: string]: resource.Quantity};
	    topologySpreadConstraints?: TopologySpreadConstraint[];
	    setHostnameAsFQDN?: boolean;
	    os?: PodOS;
	    hostUsers?: boolean;
	    schedulingGates?: PodSchedulingGate[];
	    resourceClaims?: PodResourceClaim[];
	
	    static createFrom(source: any = {}) {
	        return new PodSpec(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.volumes = this.convertValues(source["volumes"], Volume);
	        this.initContainers = this.convertValues(source["initContainers"], Container);
	        this.containers = this.convertValues(source["containers"], Container);
	        this.ephemeralContainers = this.convertValues(source["ephemeralContainers"], EphemeralContainer);
	        this.restartPolicy = source["restartPolicy"];
	        this.terminationGracePeriodSeconds = source["terminationGracePeriodSeconds"];
	        this.activeDeadlineSeconds = source["activeDeadlineSeconds"];
	        this.dnsPolicy = source["dnsPolicy"];
	        this.nodeSelector = source["nodeSelector"];
	        this.serviceAccountName = source["serviceAccountName"];
	        this.serviceAccount = source["serviceAccount"];
	        this.automountServiceAccountToken = source["automountServiceAccountToken"];
	        this.nodeName = source["nodeName"];
	        this.hostNetwork = source["hostNetwork"];
	        this.hostPID = source["hostPID"];
	        this.hostIPC = source["hostIPC"];
	        this.shareProcessNamespace = source["shareProcessNamespace"];
	        this.securityContext = this.convertValues(source["securityContext"], PodSecurityContext);
	        this.imagePullSecrets = this.convertValues(source["imagePullSecrets"], LocalObjectReference);
	        this.hostname = source["hostname"];
	        this.subdomain = source["subdomain"];
	        this.affinity = this.convertValues(source["affinity"], Affinity);
	        this.schedulerName = source["schedulerName"];
	        this.tolerations = this.convertValues(source["tolerations"], Toleration);
	        this.hostAliases = this.convertValues(source["hostAliases"], HostAlias);
	        this.priorityClassName = source["priorityClassName"];
	        this.priority = source["priority"];
	        this.dnsConfig = this.convertValues(source["dnsConfig"], PodDNSConfig);
	        this.readinessGates = this.convertValues(source["readinessGates"], PodReadinessGate);
	        this.runtimeClassName = source["runtimeClassName"];
	        this.enableServiceLinks = source["enableServiceLinks"];
	        this.preemptionPolicy = source["preemptionPolicy"];
	        this.overhead = this.convertValues(source["overhead"], resource.Quantity, true);
	        this.topologySpreadConstraints = this.convertValues(source["topologySpreadConstraints"], TopologySpreadConstraint);
	        this.setHostnameAsFQDN = source["setHostnameAsFQDN"];
	        this.os = this.convertValues(source["os"], PodOS);
	        this.hostUsers = source["hostUsers"];
	        this.schedulingGates = this.convertValues(source["schedulingGates"], PodSchedulingGate);
	        this.resourceClaims = this.convertValues(source["resourceClaims"], PodResourceClaim);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PodTemplateSpec {
	    name?: string;
	    generateName?: string;
	    namespace?: string;
	    selfLink?: string;
	    uid?: string;
	    resourceVersion?: string;
	    generation?: number;
	    // Go type: Time
	    creationTimestamp?: any;
	    // Go type: Time
	    deletionTimestamp?: any;
	    deletionGracePeriodSeconds?: number;
	    labels?: {[key: string]: string};
	    annotations?: {[key: string]: string};
	    ownerReferences?: OwnerReference[];
	    finalizers?: string[];
	    managedFields?: ManagedFieldsEntry[];
	    spec?: PodSpec;
	
	    static createFrom(source: any = {}) {
	        return new PodTemplateSpec(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.generateName = source["generateName"];
	        this.namespace = source["namespace"];
	        this.selfLink = source["selfLink"];
	        this.uid = source["uid"];
	        this.resourceVersion = source["resourceVersion"];
	        this.generation = source["generation"];
	        this.creationTimestamp = this.convertValues(source["creationTimestamp"], null);
	        this.deletionTimestamp = this.convertValues(source["deletionTimestamp"], null);
	        this.deletionGracePeriodSeconds = source["deletionGracePeriodSeconds"];
	        this.labels = source["labels"];
	        this.annotations = source["annotations"];
	        this.ownerReferences = this.convertValues(source["ownerReferences"], OwnerReference);
	        this.finalizers = source["finalizers"];
	        this.managedFields = this.convertValues(source["managedFields"], ManagedFieldsEntry);
	        this.spec = this.convertValues(source["spec"], PodSpec);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DeploymentSpec {
	    replicas?: number;
	    selector?: LabelSelector;
	    template: PodTemplateSpec;
	    strategy?: DeploymentStrategy;
	    minReadySeconds?: number;
	    revisionHistoryLimit?: number;
	    paused?: boolean;
	    progressDeadlineSeconds?: number;
	
	    static createFrom(source: any = {}) {
	        return new DeploymentSpec(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.replicas = source["replicas"];
	        this.selector = this.convertValues(source["selector"], LabelSelector);
	        this.template = this.convertValues(source["template"], PodTemplateSpec);
	        this.strategy = this.convertValues(source["strategy"], DeploymentStrategy);
	        this.minReadySeconds = source["minReadySeconds"];
	        this.revisionHistoryLimit = source["revisionHistoryLimit"];
	        this.paused = source["paused"];
	        this.progressDeadlineSeconds = source["progressDeadlineSeconds"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class FieldsV1 {
	
	
	    static createFrom(source: any = {}) {
	        return new FieldsV1(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	
	    }
	}
	export class ManagedFieldsEntry {
	    manager?: string;
	    operation?: string;
	    apiVersion?: string;
	    // Go type: Time
	    time?: any;
	    fieldsType?: string;
	    // Go type: FieldsV1
	    fieldsV1?: any;
	    subresource?: string;
	
	    static createFrom(source: any = {}) {
	        return new ManagedFieldsEntry(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.manager = source["manager"];
	        this.operation = source["operation"];
	        this.apiVersion = source["apiVersion"];
	        this.time = this.convertValues(source["time"], null);
	        this.fieldsType = source["fieldsType"];
	        this.fieldsV1 = this.convertValues(source["fieldsV1"], null);
	        this.subresource = source["subresource"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class OwnerReference {
	    apiVersion: string;
	    kind: string;
	    name: string;
	    uid: string;
	    controller?: boolean;
	    blockOwnerDeletion?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new OwnerReference(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.apiVersion = source["apiVersion"];
	        this.kind = source["kind"];
	        this.name = source["name"];
	        this.uid = source["uid"];
	        this.controller = source["controller"];
	        this.blockOwnerDeletion = source["blockOwnerDeletion"];
	    }
	}
	export class Deployment {
	    kind?: string;
	    apiVersion?: string;
	    name?: string;
	    generateName?: string;
	    namespace?: string;
	    selfLink?: string;
	    uid?: string;
	    resourceVersion?: string;
	    generation?: number;
	    // Go type: Time
	    creationTimestamp?: any;
	    // Go type: Time
	    deletionTimestamp?: any;
	    deletionGracePeriodSeconds?: number;
	    labels?: {[key: string]: string};
	    annotations?: {[key: string]: string};
	    ownerReferences?: OwnerReference[];
	    finalizers?: string[];
	    managedFields?: ManagedFieldsEntry[];
	    spec?: DeploymentSpec;
	    status?: DeploymentStatus;
	
	    static createFrom(source: any = {}) {
	        return new Deployment(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.kind = source["kind"];
	        this.apiVersion = source["apiVersion"];
	        this.name = source["name"];
	        this.generateName = source["generateName"];
	        this.namespace = source["namespace"];
	        this.selfLink = source["selfLink"];
	        this.uid = source["uid"];
	        this.resourceVersion = source["resourceVersion"];
	        this.generation = source["generation"];
	        this.creationTimestamp = this.convertValues(source["creationTimestamp"], null);
	        this.deletionTimestamp = this.convertValues(source["deletionTimestamp"], null);
	        this.deletionGracePeriodSeconds = source["deletionGracePeriodSeconds"];
	        this.labels = source["labels"];
	        this.annotations = source["annotations"];
	        this.ownerReferences = this.convertValues(source["ownerReferences"], OwnerReference);
	        this.finalizers = source["finalizers"];
	        this.managedFields = this.convertValues(source["managedFields"], ManagedFieldsEntry);
	        this.spec = this.convertValues(source["spec"], DeploymentSpec);
	        this.status = this.convertValues(source["status"], DeploymentStatus);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}

