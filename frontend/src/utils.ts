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