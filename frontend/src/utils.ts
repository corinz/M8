// flattens the object by moving children keys to the top level
export function flattenResourceObj(data) {
    if (!data || (Array.isArray(data) && !data.length) ){
        return []
    }
    let obj = []
    data.forEach( entry => {
        const {ObjectMeta, TypeMeta, ...rest } = entry
        obj.push({...ObjectMeta, ...TypeMeta, ...rest })
    })
    return obj
}

export function transform(obj) {
    return {
        // "cluster": id,
        "uid": obj.metadata.uid,
        "eventType": obj.eventType,
        "name": obj.metadata.name,
        "namespace": obj.metadata.namespace,
        "kind": obj.kind,
        "apiVersion": obj.apiVersion,
        "labels": obj.metadata.labels,
        "annotations": obj.metadata.annotations
    }
}

import {writable} from "svelte/store";
export const rowCount = writable(0);
