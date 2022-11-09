/**
 * 深拷贝
 * Example: `deepClone({a: 1, b: {c: 2}}) => 新的 {a: 1, b: {c: 2}}`
 * @param data 源数据
 * @param cache hash 存储，避免循环引用。
 * @return 新数据
 */
export function deepClone (data:any, cache = new WeakMap()):any {
    if (cache.has(data)) {
        return data
    }
    let res:any = null
    if ([Date, RegExp, Set, WeakSet, Map, WeakMap, Error].includes(data.constructor)) {
        res = new data.constructor(data)
    } else if (Array.isArray(data)) {
        data.forEach((item, i) => {
            res[i] = deepClone(item, cache)
        })
    } else if (typeof data === 'object' && data !== null) {
        cache.set(data, 1)
        res = {}
        for (const key of data) {
            if (Object.hasOwnProperty.call(data, key)) {
                res[key] = deepClone(data[key], cache)
            }
        }
    } else {
        res = data
    }
    return res
}

/**
 * 获取对象的指定属性重新生成新对象
 * Example: pick({a:1,b:2,c:3},[a,b]) => 新的 {a: 1, b: 2}`
 * @param data:object 源数据
 * @param props:array 指定属性
 * @return 新对象
 */
export function pick (target:Record<string, any>, props = []) {
    if (!Array.isArray(props) || !props.length) {
        return target
    }
    const obj:Record<string, any> = {}
    props.forEach(key => {
        if (target[key] !== undefined) {
            obj[key] = deepClone(target[key])
        }
    })
    return obj
}
/**
 * 排除对象的指定属性后重新生成新对象
 * Example: pick({a:1,b:2,c:3},[a,b]) => 新的 {c:3}`
 * @param data:object 源数据
 * @param props:array 排除属性
 * @return 新对象
 */
export function omit (target:Record<string, any>, props:Array<string> = []) {
    if (!Array.isArray(props) || !props.length) {
        return target
    }
    return Object.keys(target).reduce((obj:Record<string, any>, key) => {
        if (props.indexOf(key) === -1) {
            obj[key] = deepClone(target[key])
        }
        return obj
    }, {})
}
