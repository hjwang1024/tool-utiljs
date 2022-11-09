/**
 * 获取变量类型
 * Example:
 * `getType(1) => 'number'`
 * `getType(async function(){}) => 'asyncfunction'`
 * @param variable 变量
 * @returns
 */
export function getType (variable: any): string {
    return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()
}

// 是否为空对象
export function isEmptyObject (target:any) {
    if (target === null || target === undefined) {
        return true
    }
    return Object.keys(target).length === 0 && target.constructor === Object
}
